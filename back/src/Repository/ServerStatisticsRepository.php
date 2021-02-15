<?php

namespace App\Repository;

use App\Document\Server;
use App\Document\ServerStatistics;
use App\Document\User;
use Doctrine\ODM\MongoDB\DocumentManager;

/**
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ServerStatisticsRepository extends InjectableRepository
{
    public function __construct(DocumentManager $dm)
    {
        parent::__construct($dm, ServerStatistics::class);
    }

    /**
     * @param Server $server
     * @param int $interval microseconds interval need to be higher then granularity of stats worker (5min)
     * @param int|null $limit
     * @return array
     */
    public function findForServerAndInterval(Server $server, int $interval, ?int $limit = null)
    {
        //\MongoDB\BSON\UTCDateTime
//        aggregate([
//          {
//            $addFields: {"date2": {$toDate: {$multiply: [{$floor: {$divide: [{$subtract: [{$add: [{$toLong: "$date"}, $interval]}, 1]}, $interval]}}, $interval]}}}
//          },
//          {
//            $match: {"server": {$eq: new DBRef("Server", "3efe599029e9372d940642928d3133ab")}}
//          },
//          {
//            $group: {
//              _id: {"date2": "$date2"},
//              "avg(playersOnline)": {$avg: "$playersOnline"}
//            }
//          },
//          {
//            $project: {"ceil(avg(playersOnline))": {$ceil: "$avg(playersOnline)"}, "date2": "$_id.date2", "_id": 0}
//          }
//        ])
        $ab = $this->createAggregationBuilder();

        $ab
            ->addFields()
                ->field("date2")
                    ->expression(["\$toDate" => ["\$multiply" => [["\$floor" => ["\$divide" => [["\$subtract" => [["\$add" => [["\$toLong" => "\$date"], $interval]], 1]], $interval]]], $interval]]]);
        $ab
            ->match()
                ->field('server')
                    ->references($server);
        $ab
            ->group()
                ->field("id")
                    ->expression(["date2" => "\$date2"])
                ->field("avg(playersOnline)")
                    ->expression(["\$avg" => "\$playersOnline"]);
        $ab
            ->sort("_id.date2", "DESC");
        $ab
            ->project()
                ->field('playersOnline')
                    ->expression(
                        ['$ceil' => "\$avg(playersOnline)"]
                    )
                ->field('date')
                    ->expression("\$_id.date2")
                ->field('_id')
                    ->expression(0);

        if ($limit !== null) {
            $ab->limit($limit);
        }

        return $ab->execute()->toArray();
    }
}
//["\$toDate" =>["\$multiply" =>[["\$floor" =>["\$divide" =>[["\$subtract" =>[["\$add" =>[["\$toLong" =>"\$date"], $interval]], 1]], $interval]], $interval]]]]
//["\$toDate" =>["\$multiply" =>["\$floor" =>["\$divide" =>["\$subtract" =>["\$add" =>[["\$toLong" =>"\$date"], $interval]],1, $interval]]],$interval]]
