<?php
function update_currency_count($dbh, $idcap, $idcurrency, $quantity, $libchange)
{
    $SQLrequest = "INSERT INTO currency_count (id_user, id_currency, quantity, libchange) VALUES (".$idcap.", ".$idcurrency.", ".$quantity.", '".$libchange."');";

    //echo $SQLrequest;
    $sth = $dbh->prepare($SQLrequest);
    $outp = [$sth->execute()];

    if ($outp[0]) {
        $outp[1] = $dbh->lastInsertId();
    }
    return $outp;
}
