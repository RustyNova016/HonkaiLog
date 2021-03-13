<?php
function diff_whole_days($earlier, $later){
    $future = new DateTime($later); //Future date.
    $timefromdb = new DateTime($earlier);
    $timeleft = $future->diff($timefromdb);
    return $timeleft->format('%a');
}