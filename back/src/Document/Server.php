<?php

namespace App\Document;

use App\Repository\ServerRepository;
use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;


/**
 * @MongoDB\Document(repositoryClass=ServerRepository::class, collection="Server")
 */
class Server
{
    use DateTrackingTrait;

    /**
     * @var string
     * @MongoDB\Id(strategy="UUID")
     */
    private $id;

    /**
     * @var string
     * @MongoDB\Field(type="string")
     */
    private $name;

    /**
     * @var string
     * @MongoDB\Field(type="string")
     */
    private $ip;

    /**
     * @var string
     * @MongoDB\Field(type="string")
     */
    private $port;

    /**
     * @var bool
     * @MongoDB\Field(type="bool")
     */
    private $online;

    /**
     * @var ServerPlayers
     * @MongoDB\EmbedOne(targetDocument=ServerPlayers::class)
     */
    private $players;

    /**
     * @var float
     * @MongoDB\Field(type="float")
     */
    private $uptime;

    /**
     * @var int
     * @MongoDB\Field(type="int")
     */
    private $pvpType;

    /**
     * @var string
     * @MongoDB\Field(type="string")
     */
    private $protocolVersion;

    /**
     * @var User|null
     * @MongoDB\ReferenceOne(targetDocument=User::class, inversedBy="servers")
     */
    private $owner;

    /**
     * @var bool|null
     * @MongoDB\Field(type="bool")
     */
    private $hasWebsite;

    /**
     * @var bool
     * @MongoDB\Field(type="bool")
     */
    private $isActive;

    /**
     * @var bool
     * @MongoDB\ReferenceOne(targetDocument=ServerStatistics::class, inversedBy="server")
     */
    private $statistics;


    /**
     * @return string
     */
    public function getId(): string
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @param string $name
     * @return Server
     */
    public function setName(string $name): Server
    {
        $this->name = $name;
        return $this;
    }

    /**
     * @return string
     */
    public function getIp(): string
    {
        return $this->ip;
    }

    /**
     * @param string $ip
     * @return Server
     */
    public function setIp(string $ip): Server
    {
        $this->ip = $ip;
        return $this;
    }

    /**
     * @return string
     */
    public function getPort(): string
    {
        return $this->port;
    }

    /**
     * @param string $port
     * @return Server
     */
    public function setPort(string $port): Server
    {
        $this->port = $port;
        return $this;
    }

    /**
     * @return bool
     */
    public function isOnline(): bool
    {
        return $this->online;
    }

    /**
     * @param bool $online
     * @return Server
     */
    public function setOnline(bool $online): Server
    {
        $this->online = $online;
        return $this;
    }

    /**
     * @return ServerPlayers
     */
    public function getPlayers(): ServerPlayers
    {
        return $this->players;
    }

    /**
     * @param ServerPlayers $players
     * @return Server
     */
    public function setPlayers(ServerPlayers $players): Server
    {
        $this->players = $players;
        return $this;
    }

    /**
     * @return float
     */
    public function getUptime(): float
    {
        return $this->uptime;
    }

    /**
     * @param float $uptime
     * @return Server
     */
    public function setUptime(float $uptime): Server
    {
        $this->uptime = $uptime;
        return $this;
    }

    /**
     * @return int
     */
    public function getPvpType(): int
    {
        return $this->pvpType;
    }

    /**
     * @param int $pvpType
     * @return Server
     */
    public function setPvpType(int $pvpType): Server
    {
        $this->pvpType = $pvpType;
        return $this;
    }

    /**
     * @return string
     */
    public function getProtocolVersion(): string
    {
        return $this->protocolVersion;
    }

    /**
     * @param string $protocolVersion
     * @return Server
     */
    public function setProtocolVersion(string $protocolVersion): Server
    {
        $this->protocolVersion = $protocolVersion;
        return $this;
    }

    /**
     * @return User
     */
    public function getOwner(): ?User
    {
        return $this->owner;
    }

    /**
     * @param User|null $owner
     * @return Server
     */
    public function setOwner(?User $owner): Server
    {
        $this->owner = $owner;
        return $this;
    }

    /**
     * @return bool
     */
    public function hasWebsite(): ?bool
    {
        return $this->hasWebsite;
    }

    /**
     * @param bool $hasWebsite
     * @return Server
     */
    public function setHasWebsite(?bool $hasWebsite): Server
    {
        $this->hasWebsite = $hasWebsite;
        return $this;
    }


    /**
     * @return bool
     */
    public function isActive(): bool
    {
        return $this->isActive;
    }

    /**
     * @param bool $isActive
     * @return Server
     */
    public function setIsActive(bool $isActive): Server
    {
        $this->isActive = $isActive;
        return $this;
    }
}
