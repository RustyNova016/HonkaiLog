<?php
include "models/date_function.php";

class bp{
    private $dbh;
    private $bp_info;
    private $total_days;
    private $days_left;

    public function __construct($myDbh){
        // Database requests
        $this->dbh = $myDbh;
        $this->bp_info = $this->request_bp();
        $this->total_days = diff_whole_days($this->$bp_info[0]["date_start"], $this->$bp_info[0]["date_end"]);
        $date = new DateTime();
        $this->days_left = diff_whole_days($date->format('Y-m-d H:i:s'), $this->$bp_info[0]["date_end"]);

        var_dump(bp::$total_days);
        var_dump(bp::$days_left);
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



        $sth = bp::$dbh->prepare($SQLrequest);
        $sth->execute(["id_user" => $_SESSION["iduser"]]);
        $fetchall = $sth->fetchall();
        return $fetchall;
    }
}