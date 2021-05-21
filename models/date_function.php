<?php
    /**
     * @param string|DateTime $earlier
     * @param string|DateTime $later
     *
     * @return string
     * @throws Exception
     */
    function diff_whole_days(string|DateTime $earlier, string|DateTime $later): string {
        
        
        if (gettype($earlier) == "string"){
            $earlier = new DateTime($earlier);
        }
        
        if (gettype($later) == "string"){
            $later = new DateTime($later); //Future date.
        }
        
        $timeleft = $later->diff($earlier);
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
    
    /**
     * @param DateTime $date_time
     *
     * @return string
     */
    function datetime_to_SQL_time(DateTime $date_time): string {
        return $date_time->format('Y-m-d H:i:s');
    }
    
    function get_last_monday_date() : DateTime{
        return strtotime("last Monday");
    }