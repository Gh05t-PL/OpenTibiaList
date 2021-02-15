<?php

namespace App\Repository;

use App\Document\Server;
use App\Document\User;
use Doctrine\ODM\MongoDB\DocumentManager;

/**
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRepository extends InjectableRepository
{
    public function __construct(DocumentManager $dm)
    {
        parent::__construct($dm, User::class);
    }
}
