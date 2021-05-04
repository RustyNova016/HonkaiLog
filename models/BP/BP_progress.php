<?php
    require_once "models/BP/BP_season.php";
    require_once "models/date_function.php";
    
    /**
     * Class BP_progress
     */
    class BP_progress {
        private array $history;
        private array $seasons;
        private array $yesterday_log;
        
        /**
         * BP_progress constructor.
         *
         * @param database $db
         *
         * @throws Exception
         */
        public function __construct(database $db) {
            $this->seasons = [
                "vanguard" => new BP_season($db, "vanguard"),
                "knight" => new BP_season($db, "knight"),
                "paladin" => new BP_season($db, "paladin"),
            ];
            $this->query_history($db);
            $this->query_bp_progress_yesterday($db);
        }
        
        /** Get the history of BP
         *
         * @param database $db
         *
         * @throws Exception
         */
        function query_history(database $db) {
            // SQL Request
            $request = "SELECT *
                        FROM bp_season_progress
                        WHERE id_season = :id_season
                            AND id_user = :id_user
                            AND time_stamp > :last_reset
                        ORDER BY time_stamp DESC;";
            
            // Values to insert
            $user = unserialize($_SESSION["user"]);
            $values = [
                ":id_season" => $this->seasons["vanguard"]->get_id(),
                ":id_user" => $user->get_id_user(),
                ":last_reset" => last_reset_SQL()
            ];
            
            // Execute the request
            $this->history = $db->select($request, $values, false, true);
        }
        
        /**
         * @param database $db
         *
         * @throws Exception
         */
        function query_bp_progress_yesterday(database $db,) {
            // SQL Request
            $request = "SELECT *
                        FROM bp_season_progress
                        WHERE id_user = :id_user
                            AND id_season = :id_season
                            AND time_stamp < :last_reset
                        ORDER BY time_stamp DESC
                        LIMIT 1;";
            
            // Values to insert
            $user = unserialize($_SESSION["user"]);
            $values = [
                ":id_user" => $user->get_id_user(),
                ":id_season" => $this->seasons["vanguard"]->get_id(),
                ":last_reset" => last_reset_SQL()
            ];
            
            // Execute the request
            $result = $db->select_unique($request, $values, false, true);
            array_push($this->history, $result);
            $this->yesterday_log = $result;
        }
        
        /** Convert from [levels + XP] to [XP points]
         *
         * @param int $level
         * @param int $xp
         *
         * @return int
         */
        public function convert_lv_xp_to_xp(int $level = 0, int $xp = 0): int {
            return ($level * 1000) + $xp;
        }
        
        /** Get the BP/Day count needed to finish at the current state
         *
         * @param string $bp_type
         *
         * @return float|int
         * @throws Exception
         * @throws Exception
         */
        public function get_bp_per_day_current(string $bp_type) {
            return ceil($this->get_xp_left($bp_type) / $this->seasons[0]->get_day_left());
        }
        
        /** Get the number XP points left to get for the BP type
         *
         * @param string $bp_type
         *
         * @return float|int|mixed
         */
        public function get_xp_left(string $bp_type) {
            return $this->seasons[$bp_type]->get_total_bp_needed() - $this->get_current_bp();
        }
        
        /** Get the current BP count of the user
         *
         * @return int
         */
        public function get_current_bp(): int {
            return $this->get_latest_log()["xp_count"];
        }
        
        public function get_latest_log() {
            return $this->history[0];
        }
        
        public function get_bp_per_day_left($bp_type) {
            return ceil($this->get_xp_left($bp_type) / $this->seasons[$bp_type]->get_day_left());
        }
        
        /**
         * @return int
         */
        public function get_current_bp_xp(): int {
            return $this->get_current_bp() - ($this->get_current_bp_level() * 1000);
        }
        
        /**
         * @return int
         */
        public function get_current_bp_level(): int {
            return floor($this->get_current_bp() / 1000);
        }
        
        /**
         * @return array
         */
        public function get_history(): array {
            return $this->history;
        }
        
        /**
         * @return int
         */
        public function get_today_bp(): int {
            return $this->get_latest_log()["xp_count"] - $this->yesterday_log["xp_count"];
        }
        
        /** Log the current bp count into the database
         *
         * @param database $db
         * @param int      $bp_level
         * @param int      $bp_xp
         *
         * @throws Exception
         */
        public function insert_bp_log(database $db, int $bp_level, int $bp_xp) {
            $request = "INSERT INTO `bp_season_progress` (`id`, `id_season`, `id_user`, `xp_count`, `time_stamp`)
                        VALUES (NULL, :id_season, :id_user, :xp_count, CURRENT_TIMESTAMP());";
            
            
            $user = unserialize($_SESSION["user"]);
            $bp_total = ($bp_level * 1000) + $bp_xp;
            $values = [
                ":id_season" => $this->seasons["vanguard"]->get_id(),
                ":id_user" => $user->get_id_user(),
                ":xp_count" => $bp_total
            ];
            
            $result = $db->query($request, $values);
            
            if ($result) {
                info_message("Succesfully logged current BP count.");
            } else {
                info_message("An error happened", "warning");
            }
            
            $this->query_history($db);
        }
    }