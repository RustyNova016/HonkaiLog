<?php
include "models/bp.php";

$bp_levels = new bp($dbh);

var_dump($bp_levels);

//$bp_levels->analyse_bp();

include "vue/bp-index.php";