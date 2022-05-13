<?php
    
    
    class database {
        private PDO $dbh;
        
        public function __construct($dbh) {
            $this->dbh = $dbh;
        }
        
        /**
         * @return PDO
         */
        public function getDbh(): PDO {
            return $this->dbh;
        }
        
        /**
         * @param PDO $dbh
         */
        public function setDbh(PDO $dbh): void {
            $this->dbh = $dbh;
        }
        
        /** Select from the database
         *
         * @param string $SQL_request
         * @param array  $values
         * @param bool   $debug
         * @param bool   $output_only
         *
         * @return array [$fetchall, $sth, $success]
         */
        public function select(string $SQL_request, array $values, bool $debug = false, bool $output_only = true): array {
            $result = $this->query($SQL_request, $values, $debug);
            $sth = $result[0];
            $success = $result[1];
            $fetchall = $sth->fetchall();
            
            if ($debug) {
                var_dump($fetchall);
            }
            
            if ($output_only) {
                return $fetchall;
            } else {
                return [$fetchall, $sth, $success];
            }
        }
        
        /** Execute a SQL query
         *
         * @param       $SQL_request
         * @param       $values
         * @param false $debug
         *
         * @return array [$sth, $success]
         */
        public function query($SQL_request, $values, $debug = false) {
            if ($debug) {
                var_dump($SQL_request);
                var_dump($values);
            }
            
            $sth = $this->dbh->prepare($SQL_request);
            $success = $sth->execute($values);
            return [$sth, $success];
        }
        
        /** Select an unique value from the database
         *
         * @param string $SQL_request
         * @param array  $values
         * @param bool   $debug
         * @param bool   $output_only
         *
         * @return array [$fetchall, $sth, $success]
         */
        public function select_unique(string $SQL_request, array $values, bool $debug = false, bool $output_only = true) {
            $result = $this->query($SQL_request, $values, $debug);
            $sth = $result[0];
            $success = $result[1];
            $fetchall = $sth->fetchall()[0];
            
            if ($debug) {
                var_dump($fetchall);
            }
            
            if ($output_only) {
                return $fetchall;
            } else {
                return [$fetchall, $sth, $success];
            }
        }
        
        
        public function add_user(user $user, string $password){
            // SQL Request
            $request = "INSERT INTO user (name , password, level)
                        VALUES (:name, SHA1(:password), :level);";
    
            // Values to insert
            $values = [
                ":name" => $user->get_username(),
                ":password" => $password,
                ":level" => $user->get_user_level()
            ];
    
            // Execute the request
            $result = $this->query($request, $values, false);
            if ($result[1]) {
                //info_message("Successfully logged new " . $this->name . " count");
            }
        }
    
    
        public function log_material_count(material_log $mat_log) {
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
        }
    }