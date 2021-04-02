<?php
    
    
    class material_type {
        private int $id;
        private string $name;
        private int $display_order;
        private int $parent_id;
        private bool $init;
        
        public function __construct(database $db, $id) {
            $this->id = $id;
            $this->init = false;
            
            $this->query_info($db);
        }
        
        /** Get all the information from the databased
         *
         * @param database $db
         */
        public function query_info(database $db) {
            $SQL_Request = "SELECT *
                           FROM material_type
                           WHERE id_material_type = :id_material_type";
            
            $values = [
                ":id_material_type" => $this->id
            ];
            
            $result = $db->select($SQL_Request, $values)[0];
            
            $this->name = $result["name"];
            $this->display_order = $result["display_order"];
            $this->parent_id = $result["id_subtype"];
            
            $this->init = true;
        }
        
        /**
         * @return bool
         */
        public function is_init(): bool {
            return $this->init;
        }
        
        /**
         * @return int
         */
        public function get_id(): int {
            return $this->id;
        }
        
        /**
         * @return string
         */
        public function get_name(): string {
            return $this->name;
        }
        
        /**
         * @return int
         */
        public function get_display_order(): int {
            return $this->display_order;
        }
        
        /**
         * @return int
         */
        public function get_parent_id(): int {
            return $this->parent_id;
        }
    }