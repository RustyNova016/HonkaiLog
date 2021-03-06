<?php
function update_currency_count($dbh, $idcap, $idcurrency, $quantity, $libchange)
{
    $SQLrequest = "INSERT INTO currency_count (id_captain, id_currency, quantity, libchange) VALUES (".$idcap.", ".$idcurrency.", ".$quantity.", '".$libchange."');";

    echo $SQLrequest;
    $sth = $dbh->prepare($SQLrequest);
    if ($sth->execute()) {
        $id = $dbh->lastInsertId();
        echo "Insert of id: " . $id;
    } else {
        $id = -1;
        echo "Error";
    }
    return $id;
}
