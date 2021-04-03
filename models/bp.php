<?php
    include "models/date_function.php";
    require_once "models/BP/BP_season.php";
    
    /**
     * Class bp
     */
    class bp {
        private PDO $dbh;
        private database $db;
        private array $bp_season_info;
        private $bp_progress_now;
        private $bp_progress_yesterday;
        private $total_days;
        private $days_left;
        private int $lv_max_F;
        private int $total_bp_needed;
        private $current_bp;
        
        /**
         * bp constructor.
         *
         * @param $myDbh
         */
        public function __construct($db) {
            if (get_class($db) == "database") {
                $this->dbh = $db->getDbh();
            } else {
                $this->dbh = $db;
            }
            
            // Database requests
            $this->request_current_bp_season();
            $this->bp_progress_now = $this->request_current_bp_progress()[0];
            $this->bp_progress_yesterday = $this->request_bp_progress_yesterday()[0];
            
            // Time
            $this->total_days = diff_whole_days($this->bp_season_info["date_start"], $this->bp_season_info["date_end"]);
            $date = new DateTime();
            $this->days_left = diff_whole_days($date->format('Y-m-d H:i:s'), $this->bp_season_info["date_end"]);
            
            // XP counts
            $this->lv_max_F = $this->bp_season_info["level_max_vanguard"];
            $this->total_bp_needed = $this->lv_max_F * 1000;
            $this->current_bp = $this->bp_progress_now["xp_count"];
            
        }
        
        /** Get the current BP season
         *
         */
        private function request_current_bp_season() {
            $request = "SELECT bp_season.*,
                            DATE_ADD(date_start, INTERVAL :reset_hour HOUR) AS date_start_user,
                            DATE_ADD(date_end, INTERVAL :reset_hour HOUR) AS date_end_user,
                            DATEDIFF(
                                DATE_ADD(date_end, INTERVAL :reset_hour HOUR),
                                DATE_ADD(date_start, INTERVAL :reset_hour HOUR)
                                ) AS days
                        FROM bp_season
                        WHERE bp_season.date_end > :last_reset
                        LIMIT 1;
                        ";
            
            
            $user = unserialize($_SESSION["user"]);
            $values = [
                ":last_reset" => last_reset()->format('Y-m-d H:i:s'),
                ":reset_hour" => $user->get_reset_hour()
            ];
            
            $this->bp_season_info = $this->db->select_unique($request, $values);
        }
        
        /** Get the last entry of the current BP season progress
         *
         * @return array
         */
        private function request_current_bp_progress() {
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
        
        /** Get the last entry before today
         *
         * @return array
         */
        private function request_bp_progress_yesterday() {
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
         *
         * @param database $db
         * @param int      $bp_level
         * @param int      $bp_xp
         */
        public function insert_bp_log(database $db, int $bp_level, int $bp_xp) {
            $request = "INSERT INTO `bp_season_progress` (`id`, `id_season`, `id_user`, `xp_count`, `time_stamp`)
                        VALUES (NULL, :id_season, :id_user, :xp_count, CURRENT_TIMESTAMP());";
            
            
            $user = unserialize($_SESSION["user"]);
            $bp_total = ($bp_level * 1000) + $bp_xp;
            $values = [
                ":id_season" => $this->bp_season_info["id"],
                ":id_user" => $user->get_id_user(),
                ":xp_count" => $bp_total
            ];
            
            $result = $db->query($request, $values);
            
            if ($result){
                info_message("Succesfully logged current BP count.");
            } else {
                info_message("An error happened", "warning");
            }
            
            $this->reload_current_bp_progress();
        }
        
        /** Recount the current progress
         */
        public function reload_current_bp_progress() {
            $this->bp_progress_now = $this->request_current_bp_progress()[0];
            $this->current_bp = $this->bp_progress_now["xp_count"];
        }
        
        /** Get the BP/Day count needed to finish at the start of the season
         *
         * @return float|int
         */
        public function get_bp_per_day() {
            return ceil($this->total_bp_needed / $this->total_days);
        }
        
        /** Get the BP/Day count needed to finish at the current state
         *
         * @return float|int
         */
        public function get_bp_per_day_current() {
            return ceil($this->get_xp_left() / $this->days_left);
        }
        
        /**
         * @return float|int|mixed
         */
        public function get_xp_left() {
            return $this->total_bp_needed - $this->current_bp;
        }
        
        /**
         * @return string
         */
        public function getDaysLeft(): string {
            return $this->days_left;
        }
        
        /**
         * @return float|int
         */
        public function getTotalBpNeeded() {
            return $this->total_bp_needed;
        }
        
        /**
         * @return float|int|mixed
         */
        public function getBPXP() {
            return $this->current_bp - ($this->getBPLevel() * 1000);
        }
        
        /**
         * @return false|float
         */
        public function getBPLevel() {
            return floor($this->get_current_bp() / 1000);
        }
        
        /**
         * @return mixed
         */
        public function get_current_bp() {
            return $this->current_bp;
        }
        
        /**
         * @return mixed
         */
        public function get_today_bp() {
            return $this->bp_progress_now["xp_count"] - $this->bp_progress_yesterday["xp_count"];
        }
        
        /** Get all of today's entries
         *
         * @return array
         */
        private function request_bp_progress_today() {
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
    }