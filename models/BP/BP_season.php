<?php
    
    /**
     * Class BP_season
     */
    class BP_season {
        private int $id;
        private DateTime $date_start;
        private DateTime $date_end;
        private int $total_days;
        private int $level_max_vanguard;
        private int $level_max_knight;
        private int $level_max_paladin;

        /**
         * BP_season constructor.
         *
         * @param database $db
         * @param int      $id
         */
        public function __construct(database $db) {
            $this->query_info($db);
        }
        
        function query_info(database $db) {
            // SQL Request
            $request = "SELECT bp_season.*,
                            DATE_ADD(date_start, INTERVAL :reset_hour HOUR) AS date_start_user,
                            DATE_ADD(date_end, INTERVAL :reset_hour HOUR) AS date_end_user,
                            DATEDIFF(
                                DATE_ADD(date_end, INTERVAL :reset_hour HOUR),
                                DATE_ADD(date_start, INTERVAL :reset_hour HOUR)
                                ) AS total_days
                        FROM bp_season
                        WHERE bp_season.date_end > :last_reset
                        LIMIT 1;
                        ";
            
            // Values to insert
            $user = unserialize($_SESSION["user"]);
            $values = [
                ":last_reset" => last_reset()->format('Y-m-d H:i:s'),
                ":reset_hour" => $user->get_reset_hour()
            ];
            
            // Execute the request
            $result = $db->select_unique($request, $values, false, true);
            
            $this->id = $result["id"];
            $this->date_start = new DateTime($result["date_start_user"]);
            $this->date_end = new DateTime($result["date_end_user"]);
            $this->total_days = $result["total_days"];
            $this->level_max_vanguard = $result["level_max_vanguard"];
            $this->level_max_knight = $result["level_max_knight"];
            $this->level_max_paladin = $result["level_max_paladin"];
        }
        
        /**
         * @return int
         */
        public function get_id(): int {
            return $this->id;
        }
        
        /** Get the number of days left before the end of the BP season
         *
         * @return int
         */
        public function get_day_left(): int {
            $today_date = new DateTime();
            return intval(
                diff_whole_days(
                    $today_date->format('Y-m-d H:i:s'),
                    $this->date_end
                )
            );
        }
        
        
        /**
         * @return DateTime
         */
        public function get_date_end(): DateTime {
            return $this->date_end;
        }
        
        /**
         * @return DateTime
         */
        public function get_date_start(): DateTime {
            return $this->date_start;
        }
        
        /**
         * @return int
         */
        public function get_level_max_knight(): int {
            return $this->level_max_knight;
        }
        
        /**
         * @return int
         */
        public function get_level_max_paladin(): int {
            return $this->level_max_paladin;
        }
        
        /**
         * @return int
         */
        public function get_level_max_vanguard(): int {
            return $this->level_max_vanguard;
        }
        
        /**
         * @return int
         */
        public function get_total_days(): int {
            return $this->total_days;
        }
    }