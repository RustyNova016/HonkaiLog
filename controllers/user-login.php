<?php
if (empty($_POST["action"])){
    $action = "login";
} else {
    $action = "login_info";
}
include "controllers/user-index.php";