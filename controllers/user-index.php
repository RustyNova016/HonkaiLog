<?php
include "models/get_user.php";

if (!empty($params[2])){
    $_SESSION["iduser"] = $params[2];
}

$captains = get_user($dbh);

include "vue/user-index.php";
?>