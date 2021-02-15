<?php


namespace App\Constraints;

use Symfony\Component\Validator\Constraints as Assert;

class TestConstraint
{
    public static function getConstraint()
    {
        return new Assert\Collection([
            'allowExtraFields' => false,
            'allowMissingFields' => false,
            'fields' => [
                'test' => [
                    new Assert\Choice([
                        'choices' => ['A','B']
                    ])
                ]
            ]
        ]);
    }
}
