<?php


namespace App\Utils;


class EntityDiffer
{
    /**
     * @param array $before
     * @param array $after
     *
     * @return array[]
     */
    public static function getDiff(array $before, array $after)
    {
        $from = self::array_diff_assoc_recursive($before,$after);
        $to = self::array_diff_assoc_recursive($after,$before);

        return [
            'from' => $from,
            'to' => $to
        ];
    }

    /**
     * @param $array1
     * @param $array2
     *
     * @return array
     */
    private static function array_diff_assoc_recursive($array1, $array2)
    {
        $difference = [];

        foreach ($array1 as $key => $value) {
            if (is_array($value)) {
                if (!isset($array2[$key]) || !is_array($array2[$key])) {
                    $difference[$key] = $value;
                } else {
                    $new_diff = self::array_diff_assoc_recursive($value, $array2[$key]);
                    if (!empty($new_diff)) {
                        $difference[$key] = $new_diff;
                    }
                }
            } elseif (!array_key_exists($key, $array2) || $array2[$key] !== $value) {
                $difference[$key] = $value;
            }
        }

        return $difference;
    }
}
