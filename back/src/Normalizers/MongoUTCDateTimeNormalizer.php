<?php

namespace App\Normalizers;

use Doctrine\ORM\EntityManagerInterface;
use MongoDB\BSON\UTCDateTime;
use Symfony\Component\Serializer\Exception\BadMethodCallException;
use Symfony\Component\Serializer\Exception\ExceptionInterface;
use Symfony\Component\Serializer\Exception\ExtraAttributesException;
use Symfony\Component\Serializer\Exception\InvalidArgumentException;
use Symfony\Component\Serializer\Exception\LogicException;
use Symfony\Component\Serializer\Exception\RuntimeException;
use Symfony\Component\Serializer\Exception\UnexpectedValueException;
use Symfony\Component\Serializer\Normalizer\CacheableSupportsMethodInterface;
use Symfony\Component\Serializer\Normalizer\DateTimeNormalizer;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

/**
 * Class MongoUTCDateTimeNormalizer
 * @package App\Normalizers
 */
class MongoUTCDateTimeNormalizer implements NormalizerInterface, CacheableSupportsMethodInterface
{
    /**
     * @var ObjectNormalizer
     */
    private $normalizer;
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    /**
     * MongoUTCDateTimeNormalizer constructor.
     * @param DateTimeNormalizer $normalizer
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(DateTimeNormalizer $normalizer, EntityManagerInterface $entityManager)
    {
        $this->normalizer = $normalizer;
        $this->entityManager = $entityManager;
    }

    /**
     * @inheritDoc
     */
    public function normalize($object, string $format = null, array $context = [])
    {
//        return $object->toDateTime();
        return $this->normalizer->normalize($object->toDateTime());
    }

    /**
     * @inheritDoc
     */
    public function supportsNormalization($data, string $format = null)
    {
        return $data instanceof UTCDateTime;
    }

    /**
     * @inheritDoc
     */
    public function hasCacheableSupportsMethod(): bool
    {
        return false;
    }
}
