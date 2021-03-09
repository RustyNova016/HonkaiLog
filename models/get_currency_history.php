<?php
function get_currency_history($dbh, $idcap, $idcurrency, $date)
{
    $SQLrequest = "SELECT quantity, time_stamp FROM currency_count WHERE id_captain = ".$idcap." AND id_currency=".$idcurrency;

    if ($date != "TODAY") {
        $SQLrequest .= " AND time_stamp  > DATE_SUB(NOW(), INTERVAL ". $date .")";
    } else {
        $SQLrequest .= " AND DATE_SUB(time_stamp, INTERVAL 4 HOUR) > DATE_ADD(NOW(), INTERVAL 1 DAY)";
    }

    $SQLrequest .= " ORDER BY time_stamp;";

    $sth = $dbh->prepare($SQLrequest);
    $exe = $sth->execute();
    $result_in_range = $sth->fetchall();

    //echo $SQLrequest." - ".$exe."<br>";

    if (!empty($result_in_range)){
        $SQLrequest = "SELECT quantity, time_stamp FROM currency_count WHERE id_captain = ".$idcap." AND id_currency=".$idcurrency." AND time_stamp < '".$result_in_range[0]["time_stamp"]."' ORDER BY time_stamp DESC LIMIT 1;";
    } else {
        $SQLrequest = "SELECT quantity, time_stamp FROM currency_count WHERE id_captain = ".$idcap." AND id_currency=".$idcurrency." AND time_stamp < NOW() ORDER BY time_stamp DESC LIMIT 1;";
    }

    $sth = $dbh->prepare($SQLrequest);
    $exe = $sth->execute();
    $result = $sth->fetchall();

    //array_push($result, );

    //echo $SQLrequest." - ".$exe."<br>";

    //var_dump($result);
    //var_dump($result_in_range);
    $result = array_merge_recursive($result, $result_in_range);
    //var_dump($result);

    return $result;
}