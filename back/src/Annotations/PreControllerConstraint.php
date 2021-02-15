<?php


namespace App\Annotations;

/**
 * Class PreControllerConstraint
 * @package App\Annotations
 * @Annotation
 * @Target({"METHOD"})
 */
class PreControllerConstraint
{
    /**
     * use body to validate json in request content
     */
    const BODY = 'body';
    /**
     * use queryparameter whole array
     */
    const QUERY = 'query';
    /**
     * use post whole array
     */
    const POST = 'post';

    /**
     * @var string FQCN with method
     * @Required
     */
    public $constraintMethod;
    /**
     * @var string where constraint should take place ['query', 'post', 'body']
     * @Required
     */
    public $where;

    public function __construct(array $values)
    {
        $this->constraintMethod = $values['constraintMethod'];
        $this->where = $values['where'];
    }
}
