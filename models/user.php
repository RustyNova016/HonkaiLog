<?php
    
    
    class user {
        private string $username;
        private int $id_user;
        private int $user_level;
        private database $db;
        private bool $loged_in;
        
        public function __construct($db, $username) {
            $this->db = $db;
            $this->username = $username;
            $this->loged_in = false;
        }
    
        public function login($password) {
            $SQL_request = "SELECT id_user, level
                            FROM user
                            WHERE name = :username
                              AND mot_de_passe = SHA1(:password);";
            
            $values = [
                ":username" => $this->username,
                ":password" => $password
            ];
            
            $result = $this->db->select($SQL_request, $values);
            $this->id_user = $result["id_user"];
            $this->user_level = $result["level"];
            
            $this->loged_in = true;
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
    }