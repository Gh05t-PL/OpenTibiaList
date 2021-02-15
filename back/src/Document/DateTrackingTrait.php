<?php


namespace App\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;

/**
 * Trait DateTrackingTrait with `createdAt` and `updatedAt` fields
 * @package App\Document
 */
trait DateTrackingTrait
{
    /**
     * @var ?\DateTime
     * @MongoDB\Field(type="date", nullable=true)
     */
    private $createdAt;

    /**
     * @var ?\DateTime
     * @MongoDB\Field(type="date", nullable=true)
     */
    private $updatedAt;


    /**
     * @return ?\DateTime
     */
    public function getCreatedAt(): ?\DateTime
    {
        return $this->createdAt;
    }

    /**
     * @param ?\DateTime $createdAt
     * @return DateTrackingTrait
     * @return DateTrackingTrait
     */
    public function setCreatedAt(?\DateTime $createdAt)
    {
        $this->createdAt = $createdAt;
        return $this;
    }

    /**
     * @return ?\DateTime
     */
    public function getUpdatedAt(): ?\DateTime
    {
        return $this->updatedAt;
    }

    /**
     * @param ?\DateTime $updatedAt
     * @return DateTrackingTrait
     * @return DateTrackingTrait
     */
    public function setUpdatedAt(?\DateTime $updatedAt)
    {
        $this->updatedAt = $updatedAt;
        return $this;
    }
}
