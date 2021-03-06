<?php
    function get_currencies($dbh)
    {
        $SQLrequest = "SELECT * FROM currency";


        //echo $SQLrequest;

        $sth = $dbh->prepare($SQLrequest);
        $sth->execute();
        $result = $sth->fetchall();
        return $result;
    }