<?php


namespace App\Exceptions;


use App\Utils\ApiResponse;

interface ApiableException
{
    public function getResponse(): ApiResponse;
}