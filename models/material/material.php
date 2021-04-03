<?php
    require_once  "models/date_function.php";
    
    /**
     * Class material
     */
    class material{
        private int $id;
        private string $name;
        private array $history;
        private array $time_frame_list;
    
        /**
         * material constructor.
         *
         * @param $id
         */
        public function __construct($id, $db, $time_frames) {
            $this->id = $id;
            
            $this->history = [];
            
            $this->query_info($db);
            $this->set_time_frame_list($time_frames);
            $this->query_material_histories($db);
        }

    
        /**
         * @param $db
         */
        public function query_info(database $db) {
            $request = "SELECT *
                        FROM material
                        WHERE id_material = :id_material";
    
            $values = [
                ":id_material" => $this->id
            ];
    
            $result = $db->select_unique($request, $values, false, true);
            
            $this->name = $result["name"];
        }
        
        /**
         * @return int
         */
        public function getCurrentCount(): int {
            return $this->history[0]->get_current_count();
        }
    
        public function query_material_histories($db) {
            $this->history = [];
            foreach ($this->time_frame_list as $time){
                $this->query_material_history($db, $time);
            }
        }
    
        /**
         * @param $dbh
         * @param time_frame $timestamp
         * @param int $recursion_depth
         */
        public function query_material_history($db, time_frame $timestamp, $recursion_depth = 0) {
            // Wholeday:
            // 0: We take exactly $date time before
            // 1: We take take the whole day
            
            if (get_class($db) == "database") {
                $dbh = $db->getDbh();
            } else {
                $dbh = $db;
            }
            
            $user = unserialize($_SESSION["user"]);
            
            if (!$timestamp->getWholeDay()) {
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
                $SQLrequest = "SELECT quantity, time_stamp FROM material_count WHERE id_user = :id_user AND id_material = :id_mat AND time_stamp < NOW() ORDER BY time_stamp DESC LIMIT 1;";
                
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
                    $this->log_material_count($dbh, 0, "Init");
                    $this->query_material_history($dbh, $timestamp, $recursion_depth + 1);
                } else {
                    echo "<pre>";
                    echo "Recursion limit";
                    echo "</pre>";
                }
            } else {
                array_push($this->history, new material_history($result, $timestamp));
            }
            
            //var_dump($result);
            
            //var_dump($result);
            
            
            //var_dump($this->name);
            //var_dump($this->history);
        }
    
        /** Log a currency count to the database
         *
         * @param $dbh
         * @param $quantity
         * @param $lib_change
         * @param string $time_stamp
         *
         * @return array
         */
        public function log_material_count($dbh, $quantity, $lib_change, $time_stamp = "CURRENT_TIMESTAMP()"): array {
            $user = unserialize($_SESSION["user"]);
            
            $SQLrequest = "INSERT INTO material_count (id_user,  id_material , quantity, libchange)
                        VALUES (:id_user, :id_material, :quantity, :libchange);";
            
            $values = [
                ":id_user" => $user->get_id_user(),
                ":id_material" => strval($this->id),
                ":quantity" => $quantity,
                ":libchange" => $lib_change//,
                //":time_stamp" => $time_stamp
            ];
            
            //var_dump($SQLrequest);
            //var_dump($values);
            
            $sth = $dbh->prepare($SQLrequest);
            $outp = [$sth->execute($values)];
            
            $this->query_material_histories($dbh);
            
            return $outp;
        }
        
        /**
         * @return string
         */
        public function getName(): string {
            return $this->name;
        }
        
        /**
         * @return int
         */
        public function getId(): int {
            return $this->id;
        }
    
        /**
         * @param array $time_frame_list
         */
        public function set_time_frame_list(array $time_frame_list): void {
            $this->time_frame_list = $time_frame_list;
        }
    
        /**
         * @return array
         */
        public function get_time_frame_list(): array {
            return $this->time_frame_list;
        }
        
        /**
         * @return array
         */
        public function getHistory(): array {
            return $this->history;
        }
    }