<?php
    if (empty($_POST["action"])){
        $action = "add";
    } else {
        $action = "add_info";
    }
    include "controllers/user-index.php"
?>