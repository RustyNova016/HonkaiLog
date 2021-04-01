<?php
function diff_whole_days($earlier, $later){
    $future = new DateTime($later); //Future date.
    $timefromdb = new DateTime($earlier);
    $timeleft = $future->diff($timefromdb);
    return $timeleft->format('%a');
}

function next_reset(){
    $now = new DateTime("2021-04-01 04:00:01.000000");
    $now_time = new DateTime($now->format('H:i:s'));
    $reset_time = new DateTime("04:00:00");
    
    $next_reset = $now->setTime(4, 0, 0);
    
    if ($now_time > $reset_time){
        $next_reset = $next_reset->modify('+1 day');
    }
    
    return $next_reset;
}

function last_reset(){
    return next_reset()->modify('-1 day');
}