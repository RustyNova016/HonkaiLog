<?php
    /**
     * @var \PDO   $dbh
     * @var string $action
     */

    require_once "models/material/material_database.php";

    $material_DB = new material_database($dbh);

    switch ($action) {
        case "explore":
            include "controllers/material/explore.php";
            break;

        case "item":
            include "controllers/material/item.php";
            break;
    }

