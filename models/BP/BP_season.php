<?php
    
    /**
     * Class BP_season
     */
    class BP_season {
        private string $bp_type;
        private DateTime $date_end;
        private DateTime $date_start;
        private int $id;
        private int $level_max;
        private int $total_days;
        
        /**
         * BP_season constructor.
         *
         * @param database $db
         * @param string   $bp_type
         */
        public function __construct(database $db, string $bp_type) {
            $this->bp_type = $bp_type;
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
            $this->level_max = $result["level_max_" . $this->bp_type];
        }
        
        /**
         * @return string
         */
        public function get_bp_type(): string {
            return $this->bp_type;
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
        
        /** Get the number of days left before the end of the BP season
         *
         * @return int
         * @throws Exception
         */
        public function get_day_left(): int {
            $today_date = new DateTime();
            return intval(
                diff_whole_days(
                    $today_date->format('Y-m-d H:i:s'),
                    $this->date_end->format('Y-m-d H:i:s')
                )
            );
        }
        
        /**
         * @return int
         */
        public function get_id(): int {
            return $this->id;
        }
        
        /**
         * @return int
         */
        public function get_level_max(): int {
            return $this->level_max;
        }
        
        /**
         * @return int
         */
        public function get_total_bp_needed(): int {
            return $this->convert_lv_xp_to_xp($this->level_max);
        }
        
        /**
         * @param int $level
         * @param int $xp
         *
         * @return int
         */
        public function convert_lv_xp_to_xp(int $level = 0, int $xp = 0): int {
            return ($level * 1000) + $xp;
        }
        
        /**
         * @return int
         */
        public function get_total_days(): int {
            return $this->total_days;
        }
    }