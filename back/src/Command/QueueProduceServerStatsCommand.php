<?php

namespace App\Command;

use App\Document\Server;
use App\Message\ServerInfoMessage;
use App\Repository\ServerRepository;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Messenger\MessageBusInterface;

// */5 * * * * /usr/local/bin/php /var/www/html/symfony/bin/console queue:produce:server_stats
/**
 * Class QueueProduceServerStats
 * @package App\Command
 *
 *
 */
class QueueProduceServerStatsCommand extends Command
{
    /**
     * @inheritdoc
     */
    protected static $defaultName = 'queue:produce:server_stats';

    /**
     * @var MessageBusInterface
     */
    private $messageBus;
    /**
     * @var ServerRepository
     */
    private $serverRepository;

    public function __construct(
        MessageBusInterface $messageBus,
        ServerRepository $serverRepository
    )
    {
        parent::__construct(null);

        $this->messageBus = $messageBus;
        $this->serverRepository = $serverRepository;
    }

    protected function configure()
    {
        $this
            ->setDescription('Command for producing messages for each server to be later queried by workers')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        /**
         * @var integer $index
         * @var Server $item
         */
        foreach ($this->serverRepository->findAll() as $index => $item) {
            $this->messageBus->dispatch(
                new ServerInfoMessage($item->getIp(), $item->getPort(), $item->getId())
            );
        }

        $io->success('Servers has been put on queue.');

        return Command::SUCCESS;
    }
}

