<?php
include "models/bp.php";

$bp_levels = new bp($dbh);

echo "<pre>";
echo "Days left: ".$bp_levels->getDaysLeft()."<br>";
echo "Total BP: ".$bp_levels->getTotalBpNeeded()."<br>";
echo "Current BP: ".$bp_levels->getCurrentBp()."<br>";
echo "BP/Day: ".$bp_levels->get_bp_per_day()."<br>";
echo "BP/Day left: ".$bp_levels->get_bp_per_day_current()."<br>";
echo "</pre>";

if (!empty($_POST["bp_level"])){
    $bp_levels->update_bp($_POST["bp_level"], $_POST["bp_xp"]);
}

include "vue/bp-index.php";