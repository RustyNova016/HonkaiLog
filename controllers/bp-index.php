<?php
    include "models/bp.php";
    
    $bp_levels = new bp($db);
    
    if (!empty($_POST["bp_level"])) {
        $bp_levels->insert_bp_log($db, $_POST["bp_level"], $_POST["bp_xp"]);
    }

//echo "<pre>";
//echo "Days left: ".$bp_levels->getDaysLeft()."<br>";
//echo "Total BP: ".$bp_levels->getTotalBpNeeded()."<br>";
//echo "Current BP: ".$bp_levels->get_current_bp()."<br>";
//echo "BP/Day: ".$bp_levels->get_bp_per_day()."<br>";
//echo "BP/Day left: ".$bp_levels->get_bp_per_day_current()."<br>";
//echo "</pre>";
    
    
    include "vue/bp-index.php";