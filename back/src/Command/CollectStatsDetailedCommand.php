<?php

namespace App\Command;

use App\Document\Server;
use App\Enum\StatisticsKeys;
use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Component\Cache\Adapter\AdapterInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

/**
 * Class CollectStatsDetailedCommand
 * @package App\Command
 */
class CollectStatsDetailedCommand extends Command
{
    /**
     * @var string
     */
    protected static $defaultName = 'collect:stats:detailed';
    /**
     * @var AdapterInterface
     */
    private $adapter;
    /**
     * @var \App\Repository\ServerRepository|\Doctrine\Persistence\ObjectRepository
     */
    private $serverRepo;

    /**
     * CollectStatsDetailedCommand constructor.
     * @param string|null $name
     * @param AdapterInterface $adapter
     * @param DocumentManager $documentManager
     */
    public function __construct(string $name = null, AdapterInterface $adapter, DocumentManager $documentManager)
    {
        $this->adapter = $adapter;
        $this->serverRepo = $documentManager->getRepository(Server::class);
        parent::__construct($name);
    }

    /**
     * @inheritDoc
     */
    protected function configure()
    {
        $this
            ->setDescription('Collects detailed stats to redis cache')
            ->addArgument('arg1', InputArgument::OPTIONAL, 'Argument description')
            ->addOption('option1', null, InputOption::VALUE_NONE, 'Option description')
        ;
    }

    /**
     * @inheritDoc
     */
    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $dateTime = (new \DateTime())->format('d.m.Y H:i:00');

        /** @var Server[] $servers */
        $servers = $this->serverRepo->findAll();

        $data = [
            'allCount' => count($servers),
            'onlineCount' => 0,
            'avgUptime' => 0,
            'playersOnline' => 0,
            'collectionDate' => $dateTime,
        ];

        foreach ($servers as $index => $server) {
            $data['onlineCount'] += $server->isOnline();
            $data['avgUptime'] += $server->getUptime();
            if ($server->isOnline()) {
                $data['playersOnline'] += $server->getPlayers()->getOnline();
            }
        }

        $data['avgUptime'] = ceil(($data['avgUptime'] / $data['allCount']) * 100) / 100;

        $item = $this->adapter->getItem(StatisticsKeys::SERVER_DETAILED_STATS);
        $item->set($data);
        $item->expiresAfter(new \DateInterval('PT15M'));
        $this->adapter->save($item);

        return Command::SUCCESS;
    }
}
