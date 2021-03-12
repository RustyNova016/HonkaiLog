<?php


class bp{
    private static $dbh;

    public function __construct($myDbh){
        bp::$dbh = $myDbh;
    }

    private function request_bp(){
        $SQLrequest = "SELECT xp_count, lv_max_F, duration, date_end    
                       FROM bp_season_progress 
                       INNER JOIN bp_season ON bp_season_progress.id_season = bp_season.id
                       WHERE id_user = :id_user 
                       	AND bp_season.date_end > DATE_ADD(CURRENT_TIMESTAMP(), INTERVAL 4 HOUR)
                       ORDER BY time_stamp;";

        $sth = bp::$dbh->prepare($SQLrequest);
        $sth->execute([$_SESSION["iduser"]]);
        return $sth->fetchall();
    }
}