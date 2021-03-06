<?php
    
    
    class user {
        private string $username;
        private int $id_user;
        private int $user_level;
        private int $reset_hour;
        private bool $logged_in;
        
        public function __construct(string $username, int $level=-1) {
            $this->username = $username;
            $this->user_level = $level;
            $this->logged_in = false;
        }
        
        public function login($db, $password) {
            $request = "SELECT id_user, level, reset_hour
                            FROM user
                            WHERE name = :username
                                AND password = SHA1(:password);";
            
            $values = [
                ":username" => $this->username,
                ":password" => $password
            ];
            
            $result = $db->select_unique($request, $values);
            
            if (empty($result)){
                return false;
            } else {
                $this->id_user = $result["id_user"];
                $this->user_level = $result["level"];
                $this->reset_hour = $result["reset_hour"];
    
                return true;
            }
        }

        public function __toString(){
            return $this->username;
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
         * @return int
         */
        public function get_reset_hour(): int {
            return $this->reset_hour;
        }
    }