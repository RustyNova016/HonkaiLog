<?php
include "models/date_function.php";

class bp{
    private static $dbh;
    public static $bp_info;
    public static $total_days;
    public static $days_left;

    public function __construct($myDbh){
        bp::$dbh = $myDbh;
        bp::$bp_info = $this->request_bp();
        bp::$total_days = diff_whole_days(bp::$bp_info[0]["date_start"], bp::$bp_info[0]["date_end"]);
        $date = new DateTime();
        bp::$days_left = diff_whole_days($date->format('Y-m-d H:i:s'), bp::$bp_info[0]["date_end"]);

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
                       ORDER BY time_stamp;";



        $sth = bp::$dbh->prepare($SQLrequest);
        $sth->execute(["id_user" => $_SESSION["iduser"]]);
        $fetchall = $sth->fetchall();
        return $fetchall;
    }
}