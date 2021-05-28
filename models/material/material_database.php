<?php


    class material_database extends database {
        public function __construct($dbh) {
            parent::__construct($dbh);
        }

        /**
         * @param int $item_id
         *
         * @return array
         * @throws \EmptyResultException
         */
        public function request_item_id(int $item_id): array {
            $request = "SELECT *
                        FROM material
                        WHERE id_material = :id_material";

            $values = [
                ":id_material" => $item_id
            ];

            $result = $this->select_unique($request, $values);

            if (empty($result)) {
                throw new EmptyResultException("The item searched could not be found");
            }

            return $result;
        }

        /**
         * @param int $item_id
         * @param int $id_user
         *
         * @return array
         * @throws \EmptyResultException
         */
        public function request_item_logs(int $item_id, int $id_user): array {
            $request = "SELECT *
                        FROM material_count
                        WHERE id_material = :id_material
                            AND id_user = :id_user";

            $values = [
                ":id_material" => $item_id,
                ":id_user" => $id_user
            ];

            $result = $this->select($request, $values);

            if (empty($result)) {
                throw new EmptyResultException("No log for id_material:$item_id could not be found");
            }

            return $result;
        }
    }