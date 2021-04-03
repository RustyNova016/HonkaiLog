<?php
include "models/date_function.php";

class bp{
    private $dbh;
    private $bp_season_info;
    private $bp_progress_now;
    private $bp_progress_yesterday;
    private $total_days;
    private $days_left;
    private $lv_max_F;
    private $total_bp_needed;
    private $current_bp;

    public function __construct($myDbh){
        // Database requests
        $this->dbh = $myDbh;
        $this->bp_season_info = $this->request_current_bp_season()[0];
        $this->bp_progress_now = $this->request_current_bp_progress()[0];
        $this->bp_progress_yesterday = $this->request_bp_progress_yesterday()[0];

        // Time
        $this->total_days = diff_whole_days($this->bp_season_info["date_start"], $this->bp_season_info["date_end"]);
        $date = new DateTime();
        $this->days_left = diff_whole_days($date->format('Y-m-d H:i:s'), $this->bp_season_info["date_end"]);

        // XP counts
        $this->lv_max_F = $this->bp_season_info["lv_max_F"]; //TODO: This-> ou bp:: ??
        $this->total_bp_needed = $this->lv_max_F * 1000;
        $this->current_bp = $this->bp_progress_now["xp_count"];

    }


    /** Get the last entry of the current BP season progress
     * @return array
     */
    private function request_current_bp_progress(){
        $user = unserialize($_SESSION["user"]);
        
        $SQLrequest = "SELECT xp_count    
                       FROM bp_season_progress 
                       WHERE id_user = :id_user 
                           AND id_season = :id_season
                       ORDER BY time_stamp DESC
                       LIMIT 1;";

        $values = [
            "id_user" => $user->get_id_user(),
            "id_season" => $this->bp_season_info["id"]
        ];

        $sth = $this->dbh->prepare($SQLrequest);
        $sth->execute($values);
        $fetchall = $sth->fetchall();
        return $fetchall;
    }


    /** Get the current BP season
     * @return array
     */
    private function request_current_bp_season(){
        $SQLrequest = "SELECT id, date_start, date_end, lv_max_F, 
                           DATEDIFF(DATE_SUB(bp_season.date_end, INTERVAL 4 HOUR), DATE_SUB(bp_season.date_start, INTERVAL 4 HOUR)) AS days    
                       FROM bp_season
                       WHERE bp_season.date_end > :last_reset
                       LIMIT 1;";

        $values = [
            ":last_reset" => last_reset()->format('Y-m-d H:i:s')
        ];
        
        $sth = $this->dbh->prepare($SQLrequest);
        $sth->execute($values);
        $fetchall = $sth->fetchall();
        return $fetchall;
    }


    /** Get all of today's entries
     * @return array
     */
    private function request_bp_progress_today(){
        $user = unserialize($_SESSION["user"]);
        
        $SQLrequest = "SELECT xp_count    
                       FROM bp_season_progress 
                       WHERE id_user = :id_user 
                           AND id_season = :id_season
                           AND DATE_SUB(time_stamp, INTERVAL 4 HOUR) > DATE_ADD(DATE_SUB(CURRENT_DATE(), INTERVAL 1 DAY), INTERVAL 4 HOUR) 
                       ORDER BY time_stamp DESC;";

        $values = [
            "id_user" => $user->get_id_user(),
            "id_season" => $this->bp_season_info["id"]
        ];

        $sth = $this->dbh->prepare($SQLrequest);
        $sth->execute($values);
        $fetchall = $sth->fetchall();
        return $fetchall;
    }

    /** Get the last entry before today
     * @return array
     */
    private function request_bp_progress_yesterday(){
        $user = unserialize($_SESSION["user"]);
        
        $SQLrequest = "SELECT xp_count    
                       FROM bp_season_progress 
                       WHERE id_user = :id_user 
                           AND id_season = :id_season
                           AND DATE_SUB(time_stamp, INTERVAL 4 HOUR) < DATE_ADD(CURRENT_DATE(), INTERVAL 4 HOUR) 
                       ORDER BY time_stamp DESC
                       LIMIT 1;";
        
        $values = [
            "id_user" => $user->get_id_user(),
            "id_season" => $this->bp_season_info["id"]
        ];

        $sth = $this->dbh->prepare($SQLrequest);
        $sth->execute($values);
        $fetchall = $sth->fetchall();
        return $fetchall;
    }

    /** Log the current bp count into the database
     * @param $bp_level
     * @param $bp_xp
     */
    public function update_bp($bp_level, $bp_xp){
        $user = unserialize($_SESSION["user"]);
        
        $bp_total = ($bp_level * 1000) + $bp_xp;
        $SQLrequest = " INSERT INTO `bp_season_progress` (`id`, `id_season`, `id_user`, `xp_count`, `time_stamp`) 
                        VALUES (NULL, :id_season, :id_user, :xp_count, CURRENT_TIMESTAMP());";

        $values = [
            ":id_season" => $this->bp_season_info["id"],
            ":id_user" => $user->get_id_user(),
            ":xp_count" => $bp_total
        ];

        $sth = $this->dbh->prepare($SQLrequest);
        $sth->execute($values);

        $this->reload_current_bp_progress();
    }


    /** Recount the current progress
     */
    public function reload_current_bp_progress(){
        $this->bp_progress_now = $this->request_current_bp_progress()[0];
        $this->current_bp = $this->bp_progress_now["xp_count"];
    }

    public function get_xp_left(){
        return $this->total_bp_needed - $this->current_bp;
    }

    /** Get the BP/Day count needed to finish at the start of the season
     * @return float|int
     */
    public function get_bp_per_day(){
        return ceil($this->total_bp_needed / $this->total_days);
    }

    /** Get the BP/Day count needed to finish at the current state
     * @return float|int
     */
    public function get_bp_per_day_current(){
        return ceil($this->get_xp_left() / $this->days_left);
    }

    /**
     * @return string
     */
    public function getDaysLeft(): string
    {
        return $this->days_left;
    }

    /**
     * @return mixed
     */
    public function getCurrentBp()
    {
        return $this->current_bp;
    }

    /**
     * @return float|int
     */
    public function getTotalBpNeeded()
    {
        return $this->total_bp_needed;
    }

    public function getBPLevel(){
        return floor($this->getCurrentBp()/1000);
    }

    public function getBPXP(){
        return $this->current_bp - ($this->getBPLevel() * 1000);
    }

    public function get_today_bp(){
        return $this->bp_progress_now["xp_count"] - $this->bp_progress_yesterday["xp_count"];
    }
}