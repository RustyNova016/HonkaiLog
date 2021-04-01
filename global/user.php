<?php
    
    
    class user {
        private string $username;
        private int $id_user;
        private int $user_level;
        private $db;
        private bool $logged_in;
        
        public function __construct($db, $username) {
            $this->db = $db;
            $this->username = $username;
            $this->logged_in = false;
        }
    
        public function login($password) {
            $SQL_request = "SELECT id_user, level
                            FROM user
                            WHERE name = :username
                              AND password = SHA1(:password);";
            
            $values = [
                ":username" => $this->username,
                ":password" => $password
            ];
            
            $result = $this->db->select($SQL_request, $values)[0];
            $this->id_user = $result["id_user"];
            $this->user_level = $result["level"];
            
            $this->logged_in = true;
        }
        
        /**
         * @return int
         */
        public function get_id_user(): int {
            return $this->id_user;
        }
    
        /**
         * @return string
         */
        public function get_username(): string {
            return $this->username;
        }
        
        /**
         * @return int
         */
        public function get_user_level(): int {
            return $this->user_level;
        }
    
        /**
         * @return bool
         */
        public function isLogged_in(): bool {
            return $this->logged_in;
        }
    
        /**
         * @param database $db
         */
        public function setDb(database $db): void {
            $this->db = $db;
        }
    
        public function unset_db() {
            $this->db = null;
        }
    }