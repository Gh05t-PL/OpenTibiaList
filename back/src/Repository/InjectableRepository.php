<?php


namespace App\Repository;


use Doctrine\ODM\MongoDB\DocumentManager;
use Doctrine\ODM\MongoDB\Repository\DocumentRepository;

/**
 * Class InjectableRepository
 * @package App\Repository
 */
abstract class InjectableRepository extends DocumentRepository
{
    /**
     * @var
     */
    protected $class;

    public function __construct(DocumentManager $dm, string $className)
    {
        $uow = $dm->getUnitOfWork();
        $classMetaData = $dm->getClassMetadata($className);
        parent::__construct($dm, $uow, $classMetaData);
    }
}
