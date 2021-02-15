<?php


namespace App\Utils;


class ApiHelper
{
    public static function prepareResponse(bool $success, $data, $errors = null)
    {
        return [
            'success' => $success,
            'data' => $data,
            'errors' => $errors
        ];
    }
}