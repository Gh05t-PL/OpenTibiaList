<?php


namespace App\Enum;


/**
 * Class PvPTypes
 * @package App\Enum
 */
class PvPTypes
{
    /**
     *
     */
    const NON_PVP = 0;
    /**
     *
     */
    const PVP = 1;
    /**
     *
     */
    const PVP_ENFORCED = 2;

    /**
     *
     */
    const PVP_LOOKUP_TABLE = [
        self::NON_PVP => "Non-PvP",
        self::PVP => "PvP",
        self::PVP_ENFORCED => "PvPe",
    ];
}
