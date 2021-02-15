<?php


namespace App\Controller\API;


use App\Enum\PvPTypes;
use App\Repository\ServerRepository;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

/**
 * Class DashboardController
 * @package App\Controller\API
 *
 * @Route("/api/v1")
 */
class DashboardController extends AbstractController
{
    /**
     *
     */
    const DEFAULT_OFFSET = 0;
    /**
     *
     */
    const DEFAULT_LIMIT = 10;

    /**
     * @Route(
     *     "/profile/servers",
     *     methods={"GET"}
     * )
     * @IsGranted("IS_AUTHENTICATED_REMEMBERED")
     *
     * @param Request $request
     * @param ServerRepository $repository
     * @param NormalizerInterface $normalizer
     *
     * @return JsonResponse
     *
     * @throws \Doctrine\ODM\MongoDB\MongoDBException
     * @throws \Symfony\Component\Serializer\Exception\ExceptionInterface
     */
    public function serverList(Request $request, ServerRepository $repository, NormalizerInterface $normalizer)
    {
        $offset = (int)($request->query->get('offset') ?? self::DEFAULT_OFFSET);
        $limit = (int)($request->query->get('limit') ?? self::DEFAULT_LIMIT);

        $data = $normalizer->normalize(
            $repository->findLimitedOwnerServers(
                $this->getUser(),
                [
                    'online' => 'DESC',
                    'players.online' => 'DESC'
                ],
                $offset,
                $limit
            ),
            null,
            [
                AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($item) { return $item->getId(); }
            ]
        );

        $data = array_map(function ($item, $idx) use ($offset) {
            return [
                'id' => $item['id'],
                'ordinal' => $idx + 1 + $offset,
                'name' => $item['name'],
                'ip' => $item['ip'],
                'port' => $item['port'],
                'online' => $item['online'],
                'players' => $item['players'],
                'uptime' => $item['uptime'],
                'pvpType' => PvPTypes::PVP_LOOKUP_TABLE[$item['pvpType']],
                'protocolVersion' => $item['protocolVersion'],
            ];
        }, $data, array_keys($data));

        return new JsonResponse(
            [
                'success' => true,
                'data' => [
                    'start' => $offset,
                    'limit' => $limit,
                    'rows' => $data,
                    'size' => $repository->countOwnerServers($this->getUser())
                ],
                'errors' => null
            ]
        );
    }
}
