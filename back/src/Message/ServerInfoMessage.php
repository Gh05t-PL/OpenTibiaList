<?php


namespace App\Message;


class ServerInfoMessage
{
    /**
     * @var string
     */
    private $host;
    /**
     * @var string
     */
    private $port;
    /**
     * @var string
     */
    private $id;

    public function __construct(
        string $host,
        string $port,
        string $id
    )
    {
        $this->host = $host;
        $this->port = $port;
        $this->id = $id;
    }

    /**
     * @return string
     */
    public function getHost(): string
    {
        return $this->host;
    }

    /**
     * @return string
     */
    public function getPort(): string
    {
        return $this->port;
    }

    /**
     * @return string
     */
    public function getId(): string
    {
        return $this->id;
    }


}
