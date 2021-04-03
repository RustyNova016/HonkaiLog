<?php
    /**
     * @param $earlier
     * @param $later
     *
     * @return string
     * @throws Exception
     */
    function diff_whole_days($earlier, $later): string {
        $future = new DateTime($later); //Future date.
        $timefromdb = new DateTime($earlier);
        $timeleft = $future->diff($timefromdb);
        return $timeleft->format('%a');
    }
    
    /**
     * @return DateTime|false
     * @throws Exception
     */
    function next_reset(): DateTime|bool {
        $now = new DateTime();
        $now_time = new DateTime($now->format('H:i:s'));
        $reset_time = new DateTime("04:00:00");
    
        $user = unserialize($_SESSION["user"]);
        
        
        $next_reset = $now->setTime($user->get_reset_hour(), 0, 0);
        
        if ($now_time > $reset_time) {
            $next_reset = $next_reset->modify('+1 day');
        }
        
        return $next_reset;
    }
    
    /**
     * @return DateTime|false
     * @throws Exception
     */
    function last_reset(): DateTime|bool {
        return next_reset()->modify('-1 day');
    }
    
    
    /**
     * @return string
     * @throws Exception
     */
    function last_reset_SQL(): string {
        return last_reset()->format('Y-m-d H:i:s');
    }
    
    /**
     * @return string
     * @throws Exception
     */
    function next_reset_SQL(): string {
        return next_reset()->format('Y-m-d H:i:s');
    }
    
    