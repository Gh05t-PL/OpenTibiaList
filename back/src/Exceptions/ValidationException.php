<?php


namespace App\Exceptions;


use App\Utils\ApiResponse;
use App\Utils\ViolationHelper;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Validator\ConstraintViolationListInterface;

class ValidationException extends \Exception implements ApiableException
{
    /**
     * @var ConstraintViolationListInterface
     */
    private $violations;

    /**
     * ValidationException constructor.
     * @param ConstraintViolationListInterface $violations
     * @param string $message
     * @param int $code
     */
    public function __construct(ConstraintViolationListInterface $violations, $message = "", $code = 0)
    {
        parent::__construct($message, $code);
        $this->violations = $violations;
    }

    /**
     * @return array
     */
    public function getNormalizedViolations()
    {
        return ViolationHelper::normalizeViolations($this->violations);
    }

    /**
     * @return ApiResponse
     */
    public function getResponse(): ApiResponse
    {
        return new ApiResponse(
            null,
            Response::HTTP_UNPROCESSABLE_ENTITY,
            $this->getNormalizedViolations()
        );
    }
}
