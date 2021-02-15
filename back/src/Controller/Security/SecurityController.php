<?php

namespace App\Controller\Security;

use App\Document\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;

/**
 * Class SecurityController
 * @package App\Controller\Security
 */
class SecurityController extends AbstractController
{
    /**
     *
     */
    const LOGIN_ROUTE_NAME = 'security_login';
    /**
     * @var Security
     */
    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    /**
     * @Route(
     *     "/api/v1/security/login",
     *     name=SecurityController::LOGIN_ROUTE_NAME,
     *     methods={"POST"}
     * )
     */
    public function login()
    {
        return new Response('');
    }

    /**
     * @Route("/api/v1/security/logout")
     */
    public function logout()
    {
        return new Response('');
    }

    /**
     * @Route(
     *     "/api/v1/security/register",
     *     methods={"POST"}
     * )
     */
    public function register()
    {
        return new Response('');
    }

    /**
     * @Route(
     *     "/api/v1/security/isLoggedIn",
     *     methods={"GET"}
     * )
     */
    public function isLoggedIn()
    {
        /** @var User $user */
        $user = $this->security->getUser();

        if ( $user === null ) {
            return new JsonResponse(
                [],
                Response::HTTP_UNAUTHORIZED
            );
        }

        $userData = [
            'name' => $user->getName(),
            'email' => $user->getEmail(),
            'country' => $user->getCountry(),
            'id' => $user->getId(),
        ];

        return new JsonResponse(
            $userData,
            Response::HTTP_OK
        );
    }
}
