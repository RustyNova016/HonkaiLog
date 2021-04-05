<?php
    
    class material_db {
        private static $dbh;
        
        public function __construct($myDbh) {
            material_db::$dbh = $myDbh;
        }
        
        
        /**
         * @return array
         */
        public function get_material_types(): array {
            $SQLrequest = "SELECT *
                       FROM material_type
                       ORDER BY display_order;"; //TODO: Honkai timezone
            
            $sth = material_db::$dbh->prepare($SQLrequest);
            $sth->execute();
            $result = $sth->fetchall();
            return $result;
        }
        
    }