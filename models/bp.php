<?php
include "models/date_function.php";

class bp{
    private $dbh;
    private $bp_season_info;
    private $bp_info;
    private $total_days;
    private $days_left;
    private $lv_max_F;
    private $total_bp_needed;
    private $current_bp;

    public function __construct($myDbh){
        // Database requests
        $this->dbh = $myDbh;
        $this->bp_season_info = $this->request_current_bp_season();
        $this->bp_info = $this->request_bp();

        // Time
        $this->total_days = diff_whole_days($this->bp_info[0]["date_start"], $this->bp_info[0]["date_end"]);
        $date = new DateTime();
        $this->days_left = diff_whole_days($date->format('Y-m-d H:i:s'), $this->bp_info[0]["date_end"]);

        // XP counts
        $this->lv_max_F = $this->bp_info[0]["lv_max_F"]; //TODO: This-> ou bp:: ??
        $this->total_bp_needed = $this->lv_max_F * 1000;
        $this->current_bp = $this->bp_info[0]["xp_count"];
    }

    private function request_bp(){
        $SQLrequest = "SELECT xp_count, lv_max_F, duration, date_start, date_end, 
                           DATEDIFF(DATE_SUB(bp_season.date_end, INTERVAL 4 HOUR), DATE_SUB(bp_season.date_start, INTERVAL 4 HOUR)) AS days    
                       FROM bp_season_progress 
                       INNER JOIN bp_season ON bp_season_progress.id_season = bp_season.id
                       WHERE id_user = :id_user 
                           AND bp_season.date_end > DATE_ADD(CURRENT_TIMESTAMP(), INTERVAL 4 HOUR)
                       ORDER BY time_stamp DESC
                       LIMIT 1;";



        $sth = $this->dbh->prepare($SQLrequest);
        $sth->execute(["id_user" => $_SESSION["iduser"]]);
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