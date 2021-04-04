<?php
    require_once "models/date_function.php";
    require_once "models/info_message.php";
    
    /**
     * Class material
     */
    class material {
        private int $id;
        private string $name;
        private array $history;
        private array $time_frame_list;
        
        /**
         * material constructor.
         *
         * @param $id
         * @param $db
         * @param $time_frames
         */
        public function __construct($id, $db, $time_frames) {
            $this->id = $id;
            
            $this->history = [];
            
            $this->query_info($db);
            $this->set_time_frame_list($time_frames);
            $this->query_material_histories($db);
        }
        
        /**
         * @return int
         */
        public function getCurrentCount(): int {
            return $this->history[0]->get_current_count();
        }
        
        /**
         * @return array
         */
        public function getHistory(): array {
            return $this->history;
        }
        
        /**
         * @return int
         */
        public function getId(): int {
            return $this->id;
        }
        
        /**
         * @return string
         */
        public function getName(): string {
            return $this->name;
        }
        
        /**
         * @return array
         */
        public function get_time_frame_list(): array {
            return $this->time_frame_list;
        }
        
        /**
         * @param array $time_frame_list
         */
        public function set_time_frame_list(array $time_frame_list): void {
            $this->time_frame_list = $time_frame_list;
        }
        
        /** Log a currency count to the database
         *
         * @param database $db
         * @param int      $quantity
         * @param string   $lib_change
         */
        public function log_material_count(database $db, int $quantity, string $lib_change) {
            // SQL Request
            $request = "INSERT INTO material_count (id_user,  id_material , quantity, libchange)
                        VALUES (:id_user, :id_material, :quantity, :libchange);";
            
            // Values to insert
            $user = unserialize($_SESSION["user"]);
            $values = [
                ":id_user" => $user->get_id_user(),
                ":id_material" => strval($this->id),
                ":quantity" => $quantity,
                ":libchange" => $lib_change//,
                //":time_stamp" => $time_stamp
            ];
            
            // Execute the request
            $result = $db->query($request, $values, false);
            if ($result[1]) {
                info_message("Successfully logged " . $this->name . " new count");
            }
            
            // And reload
            $this->query_material_histories($db);
        }
        
        /** Get the info about the current material
         *
         * @param database $db
         */
        public function query_info(database $db): void  {
            // SQL Request
            $request = "SELECT *
                        FROM material
                        WHERE id_material = :id_material";
            
            // Values to insert
            $values = [
                ":id_material" => $this->id
            ];
            
            // Execute the request
            $result = $db->select_unique($request, $values, false, true);
            
            $this->name = $result["name"];
        }
        
        public function query_material_histories($db) {
            $this->history = [];
            foreach ($this->time_frame_list as $time_frame) {
                array_push($this->history, new material_history($db, $time_frame, $this->id));
            }
        }
    
        /**
         * @param database   $db
         * @param time_frame $timestamp
         * @param int        $recursion_depth
         *
         * @throws Exception
         */
        public function query_material_history(database $db, time_frame $timestamp, $recursion_depth = 0) {
            // Wholeday:
            // 0: We take exactly $date time before
            // 1: We take take the whole day
            
            if (get_class($db) == "database") {
                $dbh = $db->getDbh();
            } else {
                $dbh = $db;
            }
            
            $user = unserialize($_SESSION["user"]);
            
            if (!$timestamp->use_calendar_day()) {
                // We get all the logs of the materials that are after [Actual time] - [Timespan to remove]
                
                $SQLrequest = "SELECT quantity, time_stamp
                           FROM material_count
                           WHERE id_user = :id_user
                                AND id_material = :id_material
                                AND time_stamp  > DATE_SUB(:next_reset, INTERVAL " . $timestamp->getSQL() . ")
                           ORDER BY time_stamp -- without wholeday";
                
                $values = [
                    ":id_user" => $user->get_id_user(),
                    ":id_material" => strval($this->id),
                    ":next_reset" => last_reset()->format('Y-m-d H:i:s')
                ];
            } else {
                // We get all the logs of the materials that are after ([Actual time] - [Timespan to remove]) [Honkai reset time]
                
                //
                
                
                $SQLrequest = "SELECT quantity, time_stamp
                           FROM material_count
                           WHERE id_user = :id_user
                                AND id_material = :id_material
                                AND time_stamp > DATE_SUB(:next_reset, INTERVAL " . $timestamp->getSQL() . ")
                           ORDER BY time_stamp -- with wholeday";
                
                // DATE_SUB(time_stamp, INTERVAL 4 HOUR) < ((GETDATE() - time) +4 h)
                
                $values = [
                    ":id_user" => $user->get_id_user(),
                    ":id_material" => $this->id,
                    ":next_reset" => last_reset()->format('Y-m-d H:i:s')
                ];
                
                
            }
            
            //var_dump($SQLrequest);
            //var_dump($values);
            
            $sth = $dbh->prepare($SQLrequest);
            $exe = $sth->execute($values);
            $result_in_range = $sth->fetchall();
            //var_dump($result_in_range);
            
            
            // Now, we take one value before the time range
            if (!empty($result_in_range)) {
                $SQLrequest = "SELECT quantity, time_stamp
                           FROM material_count
                           WHERE id_user = :id_user
                             AND id_material = :id_mat
                             AND time_stamp < :last_timestamp
                           ORDER BY time_stamp DESC
                           LIMIT 1;";
                
                $values = [
                    ":id_user" => $user->get_id_user(),
                    ":id_mat" => $this->id,
                    ":last_timestamp" => $result_in_range[0]["time_stamp"]
                ];
                
            } else {
                $SQLrequest = "SELECT quantity, time_stamp
                                FROM material_count
                                WHERE id_user = :id_user
                                  AND id_material = :id_mat
                                  AND time_stamp < NOW()
                                ORDER BY time_stamp DESC
                                LIMIT 1;";
                
                $values = [
                    ":id_user" => $user->get_id_user(),
                    ":id_mat" => $this->id
                ];
            }
            
            $sth = $dbh->prepare($SQLrequest);
            $exe = $sth->execute($values);
            $result = $sth->fetchall();
            
            $result = array_merge_recursive($result, $result_in_range);
            
            if (empty($result)) {
                if ($recursion_depth < 1) {
                    $this->log_material_count($db, 0, "Init");
                    $this->query_material_history($db, $timestamp, $recursion_depth + 1);
                } else {
                    echo "<pre>";
                    echo "Recursion limit";
                    echo "</pre>";
                }
            } else {
                array_push($this->history, new material_history($result, $timestamp));
            }
        }
    }