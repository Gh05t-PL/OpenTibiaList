<?php

namespace App\Repository;

use App\Document\Server;
use App\Document\User;
use Doctrine\ODM\MongoDB\DocumentManager;

/**
 * @method Server|null find($id, $lockMode = null, $lockVersion = null)
 * @method Server|null findOneBy(array $criteria, array $orderBy = null)
 * @method Server[]    findAll()
 * @method Server[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ServerRepository extends InjectableRepository
{
    public function __construct(DocumentManager $dm)
    {
        parent::__construct($dm, Server::class);
    }

    /**
     * @param array $sortColumn
     * @param int $offset
     * @param int $limit
     *
     * @return Server[]|array
     *
     * @throws \Doctrine\ODM\MongoDB\MongoDBException
     */
    public function findLimitedServers(array $sortColumn, int $offset, int $limit)
    {
        $qb = $this->createQueryBuilder()
            ->sort($sortColumn)
            ->limit($limit)
            ->skip($offset);

        return $qb->getQuery()->execute()->toArray();
    }

    /**
     * @return int
     *
     * @throws \Doctrine\ODM\MongoDB\MongoDBException
     */
    public function countServers()
    {
        $qb = $this->createQueryBuilder();


        return $qb->count()->getQuery()->execute();
    }

    /**
     * @param User $user
     * @param array $sortColumn
     * @param int $offset
     * @param int $limit
     *
     * @return Server[]|array
     *
     * @throws \Doctrine\ODM\MongoDB\MongoDBException
     */
    public function findLimitedOwnerServers(User $user, array $sortColumn, int $offset, int $limit)
    {
        $qb = $this->createQueryBuilder()
            ->field('owner')->equals($user)
            ->sort($sortColumn)
            ->limit($limit)
            ->skip($offset);

        return $qb->getQuery()->execute()->toArray();
    }

    /**
     * @param User $user
     * @return int
     *
     * @throws \Doctrine\ODM\MongoDB\MongoDBException
     */
    public function countOwnerServers(User $user)
    {
        $qb = $this->createQueryBuilder();
        $qb
            ->field('owner')->equals($user);
        
        return $qb->count()->getQuery()->execute();
    }
}
