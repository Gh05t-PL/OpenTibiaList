<?php

namespace App\DataFixtures;

use App\Document\User;
use Doctrine\Bundle\MongoDBBundle\Fixture\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

/**
 * Class UserFixtures
 * @package App\DataFixtures
 */
class UserFixtures extends Fixture
{
    /**
     * @var UserPasswordEncoderInterface
     */
    private $passwordEncoder;

    public function __construct(UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->passwordEncoder = $passwordEncoder;
    }

    /**
     * @param ObjectManager $manager
     */
    public function load(ObjectManager $manager)
    {
        $user = new User();
        $user
            ->setIsActive(true)
            ->setUpdatedAt((new \DateTime())->add(\DateInterval::createFromDateString('+ 30 days')))
            ->setCreatedAt(new \DateTime())
            ->setCountry('GB')
            ->setName('Dredox')
            ->setUsername('Dredox')
            ->setPassword($this->passwordEncoder->encodePassword(
                $user,
                'test')
            )
            ->setEmail('test@mail.com')
            ->setRoles([
                'ROLE_USER',
                'ROLE_PREMIUM_USER',
            ]);

        $manager->persist($user);
        $manager->flush();
    }
}
