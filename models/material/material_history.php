<?php
    require_once "models/material/material_log.php";
    require_once "models/other_functions.php";
    require_once "models/Exceptions/EmptyResultException.php";
    
    /**
     * Class material_history
     */
    class material_history {
        private array $log_list;
        private int $net_gains;
        private int $net_loss;
        private time_frame $time_frame;
        
        /**
         * material_history constructor.
         *
         * @param Database_core   $db
         * @param time_frame $time_frame
         * @param int        $id_material
         *
         * @throws Exception
         */
        public function __construct(Database_core $db, time_frame $time_frame) {
            $this->time_frame = $time_frame;
            $this->log_list = [];
        }
        
        
        /**
         * @param Database_core $db
         * @param int      $id_material
         *
         * @throws Exception
         */
        function query_material_logs(Database_core $db, int $id_material): void {
            // SQL Request
            // First, we get one value before the time frame for reference
            $request_value_before = "SELECT id_log
                                     FROM material_count
                                     WHERE id_user = :id_user
                                         AND id_material = :id_material
                                         AND time_stamp < :date_start
                                     ORDER BY time_stamp DESC
                                     LIMIT 1;";
            
            $request_values_in_time_frame = "SELECT id_log
                                             FROM material_count
                                             WHERE id_user = :id_user
                                                 AND id_material = :id_material
                                                 AND time_stamp > :date_start
                                             ORDER BY time_stamp;";
            
            // Values to insert
            $user = unserialize($_SESSION["user"]);
            $values = [
                ":id_user" => $user->get_id_user(),
                ":id_material" => strval($id_material),
                ":date_start" => datetime_to_SQL_time($this->time_frame->get_date_start())
            ];
            
            // Execute the request
            $result = $db->select($request_value_before, $values, false, true);
            $result_in_range = $db->select($request_values_in_time_frame, $values, false, true);
            
            $result = array_merge_recursive($result, $result_in_range);
            
            if (empty($result)) {
                throw new EmptyResultException("");
            }
            
            foreach ($result as $log) {
                $matz_log = new material_log($log["id_log"]);
                $matz_log->query_info($db);
                array_push($this->log_list, $matz_log);
            }
        }
        
        /**
         * @return float|int
         */
        public function get_average_change(): float|int {
            if ($this->time_frame->getNbrDay() > 1) {
                $overall_change_average = round($this->get_overall_change() / $this->time_frame->getNbrDay(), 2);
            } else {
                $overall_change_average = -1;
            }
            return $overall_change_average;
        }
        
        /**
         * @return int
         */
        public function get_overall_change(): int {
            return $this->get_current_count() - $this->get_oldest_count();
        }
        
        /**
         * @return int
         */
        public function get_current_count(): int {
            return $this->get_latest_log()->get_quantity();
        }
        
        /**
         * @return material_log
         */
        public function get_latest_log(): material_log {
            try {
                return end($this->log_list);
            } catch (TypeError) {
                throw new EmptyLogsException();
            }
            
        }
        
        /**
         * @return int
         */
        public function get_oldest_count(): int {
            return $this->get_oldest_log()->get_quantity();
        }
        
        /**
         * @return material_log
         */
        public function get_oldest_log(): material_log {
            return $this->log_list[0];
        }
        
        /**
         * @return float|int
         */
        public function get_average_gain(): float|int {
            if ($this->time_frame->get_show_average()) {
                $gain_average = round($this->getNetGains() / $this->time_frame->getNbrDay(), 2);
            } else {
                $gain_average = -1;
            }
            //var_dump($gain_average);
            return $gain_average;
        }
        
        /**
         * @return int
         */
        public function getNetGains(): int {
            if (empty($this->net_gains)) {
                $this->gain_loss();
            }
            return $this->net_gains;
        }
        
        
        /** Calculate gains and losses
         *
         */
        private function gain_loss(): void {
            $this->net_gains = 0;
            $this->net_loss = 0;
            $old_amount = $this->get_oldest_count();
            
            /** @var material_log $log */
            foreach ($this->log_list as $log) {
                $amount = $log->get_quantity();
                $diff = $amount - $old_amount;
                
                if ($diff > 0) {
                    $this->net_gains += $diff;
                } else if ($diff < 0) {
                    $this->net_loss += $diff;
                }
                
                $old_amount = $amount;
            }
        }
        
        /**
         * @return float|int
         */
        public function get_average_loss(): float|int {
            if ($this->time_frame->getNbrDay() > 1) {
                $gain_loss = round($this->getNetLoss() / $this->time_frame->getNbrDay(), 2);
            } else {
                $gain_loss = -1;
            }
            //var_dump($gain_average);
            return $gain_loss;
        }
        
        /**
         * @return int
         */
        public function getNetLoss(): int {
            if (empty($this->net_loss)) {
                $this->gain_loss();
            }
            return $this->net_loss;
        }
        
        /**
         * @return time_frame
         */
        public function get_time_frame(): time_frame {
            return $this->time_frame;
        }
    }