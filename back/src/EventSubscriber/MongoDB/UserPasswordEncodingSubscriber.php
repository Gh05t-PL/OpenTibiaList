<?php


namespace App\EventSubscriber\MongoDB;


use App\Document\User;
use Doctrine\Common\EventSubscriber;
use Doctrine\ODM\MongoDB\DocumentManager;
use Doctrine\ODM\MongoDB\Event\LifecycleEventArgs;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

/**
 * Class UserPasswordEncodingSubscriber
 * @package App\EventSubscriber\MongoDB
 */
class UserPasswordEncodingSubscriber implements EventSubscriber
{
    /**
     * @var UserPasswordEncoderInterface
     */
    private $passwordEncoder;

    public function __construct(
        UserPasswordEncoderInterface $passwordEncoder,
        DocumentManager $documentManager
    )
    {
        $this->passwordEncoder = $passwordEncoder;
        $this->documentManager = $documentManager;
    }

    /**
     * @return string[]
     */
    public function getSubscribedEvents()
    {
        return [
            'preUpdate',
            'prePersist',
        ];
    }

    /**
     * @param LifecycleEventArgs $args
     */
    public function preUpdate(LifecycleEventArgs $args) {
        $this->encodePassword($args);
    }

    /**
     * @param LifecycleEventArgs $args
     */
    public function prePersist(LifecycleEventArgs $args) {
        $this->encodePassword($args);
    }

    /**
     * @param LifecycleEventArgs $args
     */
    private function encodePassword(LifecycleEventArgs $args)
    {
        $userDoc = $args->getDocument();
        if ( !$userDoc instanceof User) {
            return;
        }

        $userDoc->setPassword($this->passwordEncoder->encodePassword(
            $userDoc,
            $userDoc->getPlainPassword()
        ));
    }
}
