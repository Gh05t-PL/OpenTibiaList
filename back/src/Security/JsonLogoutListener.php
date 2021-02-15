<?php


namespace App\Security;


use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Http\Logout\LogoutSuccessHandlerInterface;

/**
 * Class JsonLogoutListener
 * @package App\Security
 */
class JsonLogoutListener implements LogoutSuccessHandlerInterface
{
    /**
     * @param Request $request
     * @return Response
     */
    public function onLogoutSuccess(Request $request)
    {
        return new Response(
            '',
            Response::HTTP_NO_CONTENT
        );
    }
}
