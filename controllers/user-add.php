<?php
//echo "<pre>";
//print_r($_POST);
//echo "</pre>";

include "models/add_user.php";
if (!empty($_POST)){
    if (!empty($_POST)){
		var_dump($_POST);
        add_user($dbh, $_POST["name"],$_POST["level"],$_POST["password"]);
    }
}

include "vue/user-add.php"
?>