<?php


class bp
{
    private static $dbh;

    public function __construct($myDbh){
        material::$dbh = $myDbh;
    }
}