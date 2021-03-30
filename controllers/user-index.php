<?php
include "models/get_user_list.php";

include "models/id-user.php";
if (!empty($_POST)){
    if (!empty($_POST)){
		var_dump($_POST);
        $user = id_user($dbh, $_POST["login"],$_POST["mdp"])[0];
		var_dump($user);
		$_SESSION["iduser"] = $user["id_user"];
		var_dump($_SESSION);
		$_SESSION["username"] = $user["name"];
		
		$_SESSION["userlevel"] = $user["level"];

    }
}

$captains = get_user_list($dbh);

include "vue/user-index.php";
?>