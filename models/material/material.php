<?php
    require_once "models/date_function.php";
    require_once "models/info_message.php";
    
    /**
     * Class material
     */
    class material {
        private array $history;
        private int $id_material;
        private string $name;
        private array $time_frame_list;
        
        /**
         * material constructor.
         *
         * @param $id
         * @param $db
         * @param $time_frames
         *
         * @throws Exception
         */
        public function __construct($id, $db, $time_frames) {
            $this->id_material = $id;
            
            $this->history = [];
            
            $this->query_info($db);
            $this->set_time_frame_list($time_frames);
            $this->query_material_histories($db);
        }
        
        /** Get the info about the current material
         *
         * @param database $db
         */
        public function query_info(database $db): void {
            // SQL Request
            $request = "SELECT *
                        FROM material
                        WHERE id_material = :id_material";
            
            // Values to insert
            $values = [
                ":id_material" => $this->id_material
            ];
            
            // Execute the request
            $result = $db->select_unique($request, $values, false, true);
            
            $this->name = $result["name"];
        }
        
        /**
         * @param array $time_frame_list
         */
        public function set_time_frame_list(array $time_frame_list): void {
            $this->time_frame_list = $time_frame_list;
        }
        
        /**
         * @param database $db
         *
         * @throws Exception
         */
        public function query_material_histories(database $db): void {
            $this->history = [];
            foreach ($this->time_frame_list as $time_frame) {
                array_push($this->history, new material_history($db, $time_frame, $this->id_material));
            }
        }
        
        /**
         * @return int
         */
        public function get_current_count(): int {
            return $this->history[0]->get_current_count();
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
        public function get_id_material(): int {
            return $this->id_material;
        }
        
        /**
         * @return string
         */
        public function get_name(): string {
            return $this->name;
        }
        
        /** Log a currency count to the database
         *
         * @param database $db
         * @param int      $quantity
         * @param string   $lib_change
         *
         * @throws Exception
         */
        public function log_material_count(database $db, int $quantity, string $lib_change) {
            // SQL Request
            $request = "INSERT INTO material_count (id_user,  id_material , quantity, libchange)
                        VALUES (:id_user, :id_material, :quantity, :libchange);";
            
            // Values to insert
            $user = unserialize($_SESSION["user"]);
            $values = [
                ":id_user" => $user->get_id_user(),
                ":id_material" => strval($this->id_material),
                ":quantity" => $quantity,
                ":libchange" => $lib_change//,
                //":time_stamp" => $time_stamp
            ];
            
            // Execute the request
            $result = $db->query($request, $values, false);
            if ($result[1]) {
                info_message("Successfully logged new " . $this->name . " count");
            }
            
            // And reload
            $this->query_material_histories($db);
        }
    }