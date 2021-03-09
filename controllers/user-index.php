<?php
include "models/get_user_list.php";

if (!empty($params[2])){
    $_SESSION["iduser"] = $params[2];
}

$captains = get_user_list($dbh);

include "vue/user-index.php";
?>