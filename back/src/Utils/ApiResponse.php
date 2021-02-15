<?php


namespace App\Utils;


use Symfony\Component\HttpFoundation\JsonResponse;


class ApiResponse extends JsonResponse
{
    /**
     * ApiResponse constructor.
     * @param $data
     * @param bool $success
     * @param null $errors
     * @param int $status
     * @param array $headers
     * @param bool $json
     */
    public function __construct($data, int $status = 200, $errors = null, array $headers = [], bool $json = false)
    {
        parent::__construct(
            ApiHelper::prepareResponse(
                $status >= 200 && $status <= 300,
                $data,
                $errors
            ),
            $status,
            $headers,
            $json
        );
    }
}
