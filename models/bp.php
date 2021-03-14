<?php
include "models/date_function.php";

class bp{
    private $dbh;
    private $bp_season_info;
    private $bp_progress;
    private $total_days;
    private $days_left;
    private $lv_max_F;
    private $total_bp_needed;
    private $current_bp;

    public function __construct($myDbh){
        // Database requests
        $this->dbh = $myDbh;
        $this->bp_season_info = $this->request_current_bp_season()[0];
        $this->bp_progress = $this->request_current_bp_progress()[0];

        // Time
        $this->total_days = diff_whole_days($this->bp_progress[0]["date_start"], $this->bp_progress[0]["date_end"]);
        $date = new DateTime();
        $this->days_left = diff_whole_days($date->format('Y-m-d H:i:s'), $this->bp_progress[0]["date_end"]);

        // XP counts
        $this->lv_max_F = $this->bp_progress[0]["lv_max_F"]; //TODO: This-> ou bp:: ??
        $this->total_bp_needed = $this->lv_max_F * 1000;
        $this->current_bp = $this->bp_progress[0]["xp_count"];
    }


    /** Get the last entry of the current BP season progress
     * @return array
     */
    private function request_current_bp_progress(){
        $SQLrequest = "SELECT xp_count    
                       FROM bp_season_progress 
                       WHERE id_user = :id_user 
                           AND id_season = :id_season
                       ORDER BY time_stamp DESC
                       LIMIT 1;";

        $values = [
            "id_user" => $_SESSION["iduser"],
            "id_season" => $this->bp_season_info["id"]
        ];

        $sth = $this->dbh->prepare($SQLrequest);
        $sth->execute($values);
        $fetchall = $sth->fetchall();
        return $fetchall;
    }
    private function request_current_bp_season(){
        $SQLrequest = "SELECT id, date_start, date_end, lv_max_F, 
                           DATEDIFF(DATE_SUB(bp_season.date_end, INTERVAL 4 HOUR), DATE_SUB(bp_season.date_start, INTERVAL 4 HOUR)) AS days    
                       FROM bp_season7
                       WHERE bp_season.date_end > DATE_ADD(CURRENT_TIMESTAMP(), INTERVAL 4 HOUR)
                       LIMIT 1;";

        $sth = $this->dbh->prepare($SQLrequest);
        $sth->execute();
        $fetchall = $sth->fetchall();
        return $fetchall;
    }

    public function get_xp_left(){
        return $this->total_bp_needed - $this->current_bp;
    }

    /** Get the BP/Day count needed to finish at the start of the season
     * @return float|int
     */
    public function get_bp_per_day(){
        return $this->total_bp_needed / $this->total_days;
    }

    /** Get the BP/Day count needed to finish at the current state
     * @return float|int
     */
    public function get_bp_per_day_current(){
        return $this->get_xp_left() / $this->days_left;
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
}