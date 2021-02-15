<?php


namespace App\Security;


use App\Controller\Security\SecurityController;
use App\Document\User;
use App\Repository\UserRepository;
use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Guard\AbstractGuardAuthenticator;

/**
 * Class JsonAuthenticator
 * @package App\Security
 */
class JsonAuthenticator extends AbstractGuardAuthenticator
{

    /**
     * @var UserRepository
     */
    private $userRepo;
    /**
     * @var UrlGeneratorInterface
     */
    private $urlGenerator;
    /**
     * @var Security
     */
    private $security;
    /**
     * @var UserPasswordEncoderInterface
     */
    private $passwordEncoder;

    public function __construct(
        DocumentManager $documentManager,
        Security $security,
        UrlGeneratorInterface $urlGenerator,
        UserPasswordEncoderInterface $passwordEncoder
    )
    {
        $this->userRepo = $documentManager->getRepository(User::class);
        $this->urlGenerator = $urlGenerator;
        $this->security = $security;
        $this->passwordEncoder = $passwordEncoder;
    }

    /**
     * @param Request $request
     * @param AuthenticationException|null $authException
     * @return bool|Response
     */
    public function start(Request $request, AuthenticationException $authException = null)
    {
        return new Response('', Response::HTTP_FORBIDDEN);
    }

    /**
     * @param Request $request
     * @return bool
     */
    public function supports(Request $request)
    {
        return !$this->security->getUser()
            && SecurityController::LOGIN_ROUTE_NAME === $request->attributes->get('_route')
            && $request->isMethod('POST');
    }

    /**
     * @param Request $request
     * @return array|mixed
     */
    public function getCredentials(Request $request)
    {
        $req = json_decode($request->getContent(), true);

        return [
            'username' => $req['email'],
            'password' => $req['password'],
        ];
    }

    /**
     * @param mixed $credentials
     * @param UserProviderInterface $userProvider
     * @return UserInterface|null
     */
    public function getUser($credentials, UserProviderInterface $userProvider)
    {
        return $userProvider->loadUserByUsername($credentials['username']);
    }

    /**
     * @param mixed $credentials
     * @param UserInterface $user
     * @return bool
     */
    public function checkCredentials($credentials, UserInterface $user)
    {
        return $this->passwordEncoder->isPasswordValid(
            $user,
            $credentials['password']
        );
    }

    /**
     * @param Request $request
     * @param AuthenticationException $exception
     * @return JsonResponse|Response|null
     */
    public function onAuthenticationFailure(Request $request, AuthenticationException $exception)
    {
        return new JsonResponse(
            [],
            Response::HTTP_UNAUTHORIZED
        );
    }

    /**
     * @param Request $request
     * @param TokenInterface $token
     * @param string $providerKey
     * @return JsonResponse|Response|null
     */
    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $providerKey)
    {
        /** @var User $user */
        $user = $this->security->getUser();

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

    /**
     * @return bool
     */
    public function supportsRememberMe()
    {
        return true;
    }
}
