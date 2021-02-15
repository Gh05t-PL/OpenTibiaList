<?php

namespace App\Command;

use App\Document\Server;
use App\Document\ServerPlayers;
use App\Document\User;
use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

/**
 * Class LoadServersCommand
 * @package App\Command
 */
class LoadServersCommand extends Command
{
    /**
     * @var string|null The default command name
     */
    protected static $defaultName = 'load:servers';
    /**
     * @var string
     */
    private $kernelDir;
    /**
     * @var DocumentManager
     */
    private $documentManager;

    public function __construct(
        string $kernelDir,
        DocumentManager $documentManager
    )
    {
        parent::__construct(null);
        $this->kernelDir = $kernelDir;
        $this->documentManager = $documentManager;
    }

    protected function configure()
    {
        $this
            ->setDescription('Command for loading scrapped servers [DEV]')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $this->documentManager->getDocumentCollection(Server::class)->deleteMany([]);
        $data = json_decode(file_get_contents(
            $this->kernelDir . '/SERVERS'
        ));
        $date = new \DateTime();

        foreach ($data as $index => $server) {
            $serverDocument = new Server();

            $serverDocument
                ->setCreatedAt($date)
                ->setHasWebsite(null)
                ->setIp($server->ip)
                ->setIsActive(true)
                ->setName($server->name)
                ->setOnline(false)
                ->setOwner(
                    rand(1,16) > 15 ?
                        $this->documentManager->find(User::class, '8f8de9874e5439c1a0114a353aa7c7f6')
                        : null
                )
                ->setPlayers(new ServerPlayers())
                ->setPort($server->port)
                ->setProtocolVersion($server->protocolVersion)
                ->setPvpType($server->pvpType ?? 0)
                ->setUpdatedAt(null)
                ->setUptime(0);

            $this->documentManager->persist($serverDocument);

            if ($index % 100 == 0) {
                $this->documentManager->flush();
            }
        }
        $this->documentManager->flush();

        $io->success('You have imported '. count($data) .' servers');

        return Command::SUCCESS;
    }
}
