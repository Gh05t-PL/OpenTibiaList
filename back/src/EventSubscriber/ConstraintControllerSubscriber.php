<?php

namespace App\EventSubscriber;

use App\Annotations\PreControllerConstraint;
use App\Exceptions\ValidationException;
use Doctrine\Common\Annotations\CachedReader;
use Doctrine\Common\Annotations\Reader;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ControllerEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Validator\Constraints\Json;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Validator\ValidatorInterface;

/**
 * Class ConstraintControllerSubscriber
 * @package App\EventSubscriber
 */
class ConstraintControllerSubscriber implements EventSubscriberInterface
{
    /**
     * @var CachedReader
     */
    private $reader;
    /**
     * @var Security
     */
    private $security;
    /**
     * @var ValidatorInterface
     */
    private $validator;

    public function __construct(Reader $annotationReader, Security $security, ValidatorInterface $validator)
    {
        $this->reader = $annotationReader;
        $this->security = $security;
        $this->validator = $validator;
    }

    /**
     * @param ControllerEvent $event
     * @throws \ReflectionException
     */
    public function onKernelController(ControllerEvent $event)
    {
        if (!$event->isMasterRequest()) {
            return;
        }

        [$controller, $method] = $event->getController();
        $request = $event->getRequest();

        /** @var PreControllerConstraint $annotation */
        $annotation = $this->reader->getMethodAnnotation(
            new \ReflectionMethod($controller, $method),
            PreControllerConstraint::class
        );

        if ($annotation === null) {
            return;
        }

        $method = new \ReflectionMethod($annotation->constraintMethod);

        $constraintViolations = null;
        switch ($annotation->where) {
            case 'query':
                $constraintViolations = $this->validator->validate(
                    $request->query->all(),
                    $method->invoke(null)
                );
                break;
            case 'post':
                $constraintViolations = $this->validator->validate(
                    $request->request->all(),
                    $method->invoke(null)
                );
                break;
            case 'body':
                $constraintViolations = $this->validator->validate(
                    $request->getContent(),
                    [new Json(), new NotBlank(['message'=>"Body shouldn't be empty json"])]
                );
                if ($constraintViolations->count() > 0) {
                    break;
                }

                $constraintViolations = $this->validator->validate(
                    json_decode($request->getContent(), true),
                    [$method->invoke(null)]
                );
                break;
        }

        if ($constraintViolations->count() > 0) {
            throw new ValidationException($constraintViolations);
        }
//        dd(new \ReflectionMethod($annotation->constraintMethod));
//        dd($this->security->getToken());
    }

    /**
     * @return array|string[]
     */
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::CONTROLLER => 'onKernelController',
        ];
    }
}
