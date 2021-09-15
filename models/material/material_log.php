<?php
    
    
    /**
     * Class material_log
     */
    class material_log {
        private int $id_log;
        private string|null $libchange;
        private int $quantity;
        private DateTime $time_stamp;
    
        /**
         * material_log constructor.
         *
         * @param int $id_log
         *
         */
        public function __construct(int $id_log) {
            $this->id_log = $id_log;
        }
        
        /**
         * @param Database_core $db
         *
         * @throws Exception
         */
        function query_info(Database_core $db) {
            // SQL Request
            $request = "SELECT *
                        FROM material_count
                        WHERE id_log = :id_log";
            
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
                throw new Exception($error_str . "<br>" . $e);
            }
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
         * @param int $quantity
         */
        public function set_quantity(int $quantity): void {
            $this->quantity = $quantity;
        }
    
        /**
         * @param DateTime $time_stamp
         */
        public function set_time_stamp(DateTime $time_stamp): void {
            $this->time_stamp = $time_stamp;
        }
    }