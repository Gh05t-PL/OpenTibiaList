<?php

namespace App\Controller\API;

use App\Annotations\PreControllerConstraint;
use App\Document\Server;
use App\Document\ServerStatistics;
use App\Document\User;
use App\Enum\PvPTypes;
use App\Repository\ServerRepository;
use App\Repository\ServerStatisticsRepository;
use Doctrine\ODM\MongoDB\DocumentManager;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Validator\Constraints\Date;

/**
 * Class ServerListController
 * @package App\Controller\API
 *
 * @Route("/api/v1/servers")
 */
class ServersController extends AbstractController
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
     * @var ServerRepository
     */
    private $repository;
    /**
     * @var NormalizerInterface
     */
    private $normalizer;
    /**
     * @var ServerStatisticsRepository
     */
    private $statisticsRepository;

    public function __construct(
        ServerRepository $repository,
        NormalizerInterface $normalizer,
        ServerStatisticsRepository $statisticsRepository
    )
    {
        $this->repository = $repository;
        $this->normalizer = $normalizer;
        $this->statisticsRepository = $statisticsRepository;
    }

    /**
     * @Route("/", methods={"GET"})
     *
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws \Doctrine\ODM\MongoDB\MongoDBException
     * @throws \Symfony\Component\Serializer\Exception\ExceptionInterface
     */
    public function fetch(
        Request $request
    )
    {
        $offset = (int)($request->query->get('offset') ?? self::DEFAULT_OFFSET);
        $limit = (int)($request->query->get('limit') ?? self::DEFAULT_LIMIT);

        $data = $this->normalizer->normalize(
            $this->repository->findLimitedServers(
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
                    'size' => $this->repository->countServers()
                ],
                'errors' => null
            ]
        );
    }

    /**
     * @Route("/{id}", methods={"GET"})
     *
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws \Doctrine\ODM\MongoDB\MongoDBException
     * @throws \Symfony\Component\Serializer\Exception\ExceptionInterface
     */
    public function fetchOne(
        string $id,
        Request $request
    )
    {
        $data = $this->normalizer->normalize(
            $this->repository->find($id),
            null,
            [
                AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($item) { return $item->getId(); }
            ]
        );

        return new JsonResponse(
            [
                'success' => true,
                'data' => $data,
                'errors' => null
            ]
        );
    }

    /**
     * @Route("/{id}/statistics", methods={"GET"})
     *
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws \Doctrine\ODM\MongoDB\MongoDBException
     * @throws \Symfony\Component\Serializer\Exception\ExceptionInterface
     */
    public function fetchOneStatistics(
        string $id,
        Request $request
    )
    {
        $interval = $request->query->get('interval');
        $limit = $request->query->get('limit');

        $data = $this->normalizer->normalize(
            $this->statisticsRepository->findForServerAndInterval(
                $this->repository->find($id),
                $interval,
                $limit
            )
        );

        return new JsonResponse(
            [
                'success' => true,
                'data' => $data,
                'errors' => null
            ]
        );
    }
}
