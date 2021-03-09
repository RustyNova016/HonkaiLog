<?php
//echo "<pre>";
//print_r($_POST);
//echo "</pre>";

include "models/add_user.php";
if (!empty($_POST)){
    if (!empty($_POST)){
        add_user($dbh, $_POST["name"]);
    }
}

include "vue/user-add.php"
?>