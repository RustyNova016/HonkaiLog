<?php
    
    
    /**
     * Class material_log
     */
    class material_log {
        private int $id_log;
        private int $quantity;
        private string|null $libchange;
        private DateTime $time_stamp;
    
        /**
         * material_log constructor.
         *
         * @param $db
         * @param $id_log
         *
         * @throws Exception
         */
        public function __construct($db, $id_log) {
            $this->id_log = $id_log;
            $this->query_info($db);
        }
    
        /**
         * @return int
         */
        public function get_quantity(): int {
            return $this->quantity;
        }
        
        /**
         * @return DateTime
         */
        public function get_time_stamp(): DateTime {
            return $this->time_stamp;
        }
        
        /**
         * @return string
         */
        public function get_time_stamp_SQL(): string {
            return $this->time_stamp->format('Y-m-d H:i:s');
        }
    
    
        /**
         * @param database $db
         *
         * @throws Exception
         */
        function query_info(database $db) {
            // SQL Request
            $request = "SELECT *
                        FROM material_count
                        WHERE id = :id_log";
            
            // Values to insert
            $values = [
                ":id_log" => $this->id_log
            ];
            
            // Execute the request
            $result = $db->select_unique($request, $values, false, true);
            
            $this->quantity = $result["quantity"];
            $this->libchange = $result["libchange"];
            try {
                $this->time_stamp = new DateTime($result["time_stamp"]);
            } catch (Exception $e) {
                $error_str = "Couldn't convert '" . $result["time_stamp"] . "' to DateTime. Is this a real date?";
                info_message($error_str, "danger");
                throw new Exception($error_str."<br>".$e);
            }
        }
    }