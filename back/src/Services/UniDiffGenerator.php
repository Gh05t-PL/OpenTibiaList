<?php


namespace App\Services;


class UniDiffGenerator
{
    /**
     * @param string $previous
     * @param string $current
     * @return string UniDiff
     */
    public function generate(string $previous, string $current)
    {
        return $this->getHeader() . str_replace(
            "\n\\ No newline at end of file",
            '',
            \xdiff_string_diff($previous, $current, 3, true)
        );
    }

    /**
     * @return string
     */
    private function getHeader()
    {
        return <<<HEAD
--- previous.description	2020-10-24 06:26:23.609518321 +0200
+++ current.description	2020-10-24 06:26:22.785532615 +0200

HEAD;
    }
}
