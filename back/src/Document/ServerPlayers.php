<?php


namespace App\Document;


use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;

/**
 * Class ServerPlayers
 * @package App\Document
 *
 * @MongoDB\EmbeddedDocument()
 */
class ServerPlayers
{
    /**
     * @var int
     * @MongoDB\Field(type="int")
     */
    private $online = 0;
    /**
     * @var int
     * @MongoDB\Field(type="int")
     */
    private $peak = 0;
    /**
     * @var int
     * @MongoDB\Field(type="int")
     */
    private $max = 0;

    /**
     * @return int
     */
    public function getOnline(): int
    {
        return $this->online;
    }

    /**
     * @param int $online
     * @return ServerPlayers
     */
    public function setOnline(int $online): ServerPlayers
    {
        $this->online = $online;
        return $this;
    }

    /**
     * @return int
     */
    public function getPeak(): int
    {
        return $this->peak;
    }

    /**
     * @param int $peak
     * @return ServerPlayers
     */
    public function setPeak(int $peak): ServerPlayers
    {
        $this->peak = $peak;
        return $this;
    }

    /**
     * @return int
     */
    public function getMax(): int
    {
        return $this->max;
    }

    /**
     * @param int $max
     * @return ServerPlayers
     */
    public function setMax(int $max): ServerPlayers
    {
        $this->max = $max;
        return $this;
    }
}
