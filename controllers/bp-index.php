<?php
    require_once "models/BP/BP_progress.php";

    var_dump("This page is completly broken and require serious rework. Just ignore it for now");
    
    /**
     * @var database $db
     */
    
    $bp_db = new BP_progress($db);
    
    if (!empty($_POST["bp_level"])) {
        $bp_db->insert_bp_log($db, $_POST["bp_level"], $_POST["bp_xp"]);
    }
    
    include "vue/bp-index.php";