<?php
    require_once "models/material/material.php";
    
    class material_type {
        private int $display_order;
        private bool $display_type;
        private int $id;
        private bool $init;
        private array $list_of_id_material;
        private array $list_of_material;
        private string $name;
        private int $parent_id;
        
        public function __construct(database $db, $id) {
            $this->id = $id;
            $this->init = false;
            $this->list_of_material = [];
            
            $this->query_info($db);
        }
        
        /** Get all the information from the database
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
            $this->display_type = $result["display_type"];
            $this->parent_id = $result["id_subtype"];
            
            $this->init = true;
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
        public function get_id(): int {
            return $this->id;
        }
        
        /**
         * @return array
         */
        public function get_list_of_id_material(): array {
            return $this->list_of_id_material;
        }
        
        /**
         * @return array
         */
        public function get_list_of_material(): array {
            return $this->list_of_material;
        }
        
        /**
         * @param $id
         *
         * @return mixed
         */
        public function get_material_with_id($id) {
            return $this->list_of_material[$id];
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
        public function get_parent_id(): int {
            return $this->parent_id;
        }
        
        /**
         * @return bool
         */
        public function is_display_type(): bool {
            return $this->display_type;
        }
        
        /**
         * @return bool
         */
        public function is_init(): bool {
            return $this->init;
        }
        
        /** Fill the $material_list parameter with the material from the database
         *
         * @param database $db
         * @param array    $material_history_time_frame
         *
         * @throws Exception
         */
        public function query_material_list(database $db, array $material_history_time_frame) {
            $request = "SELECT id_material
                        FROM material
                        WHERE id_material_type = :id_material_type
                        ORDER BY display_order";
            
            $values = [
                ":id_material_type" => $this->id
            ];
            
            $result = $db->select($request, $values, false);
            
            if (!empty($result)) {
                foreach ($result as $material_item) {
                    $new_id_material = $material_item["id_material"];
                    $this->list_of_id_material[$new_id_material] = $new_id_material;
                    
                    $material_item1 = new material($new_id_material, $db, $material_history_time_frame);
                    $this->list_of_material[$material_item1->get_id_material()] = $material_item1;
                }
            }
        }
    }