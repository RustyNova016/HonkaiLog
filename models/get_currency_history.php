<?php
function get_currency_history($dbh, $idcap, $idcurrency, $date)
{
    $SQLrequest = "SELECT quantity, time_stamp FROM currency_count WHERE id_captain  =".$idcap." AND id_currency=".$idcurrency;

    if ($date != "TODAY") {
        $SQLrequest .= " AND time_stamp > DATE_SUB(NOW(), INTERVAL " . $date . ")";
    } else {
        $SQLrequest .= " AND time_stamp > CURDATE()";
    }

    $SQLrequest .= " ORDER BY time_stamp;";

    $sth = $dbh->prepare($SQLrequest);
    $exe = $sth->execute();
    $result = $sth->fetchall();

    //echo $SQLrequest." - ".$exe."<br>";

    return $result;
    //TODO: Also grab one value before the limit
}