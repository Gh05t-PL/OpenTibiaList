<?php

namespace App\Document;

use App\Repository\ServerStatisticsRepository;
use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;


/**
 * @MongoDB\Document(repositoryClass=ServerStatisticsRepository::class, collection="ServerStatistics")
 */
class ServerStatistics
{
    /**
     * @var string
     * @MongoDB\Id(strategy="UUID")
     */
    private $id;

    /**
     * @var Server
     * @MongoDB\ReferenceOne(targetDocument=Server::class, mappedBy="statistics")
     */
    private $server;

    /**
     * @var int
     * @MongoDB\Field(type="int")
     */
    private $playersOnline;

    /**
     * @var \DateTime
     * @MongoDB\Field(type="date")
     */
    private $date;

    /**
     * @return string
     */
    public function getId(): string
    {
        return $this->id;
    }

    /**
     * @return Server
     */
    public function getServer(): Server
    {
        return $this->server;
    }

    /**
     * @param Server $server
     * @return ServerStatistics
     */
    public function setServer(Server $server): ServerStatistics
    {
        $this->server = $server;
        return $this;
    }

    /**
     * @return int
     */
    public function getPlayersOnline(): int
    {
        return $this->playersOnline;
    }

    /**
     * @param int $playersOnline
     * @return ServerStatistics
     */
    public function setPlayersOnline(int $playersOnline): ServerStatistics
    {
        $this->playersOnline = $playersOnline;
        return $this;
    }

    /**
     * @return \DateTime
     */
    public function getDate(): \DateTime
    {
        return $this->date;
    }

    /**
     * @param \DateTime $date
     * @return ServerStatistics
     */
    public function setDate(\DateTime $date): ServerStatistics
    {
        $this->date = $date;
        return $this;
    }


}
