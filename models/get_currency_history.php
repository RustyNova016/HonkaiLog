<?php
function get_currency_history($dbh, $idcap, $idcurrency, $date)
{
        $SQLrequest = "SELECT quantity, time_stamp FROM currency_count WHERE time_stamp > DATE_SUB(NOW(), INTERVAL ".$date.") AND id_captain  =".$idcap." AND id_currency=".$idcurrency." ORDER BY time_stamp;";


        //echo $SQLrequest;

        $sth = $dbh->prepare($SQLrequest);
        $sth->execute();
        $result = $sth->fetchall();
        return $result;
}