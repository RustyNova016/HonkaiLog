<?php
    
    
    class database {
        private PDO $dbh;
        
        public function __construct($dbh) {
            $this->dbh = $dbh;
        }
        
        /** Select from the database
         *
         * @param string $SQL_request
         * @param array $values
         * @param bool $debug
         * @param bool $output_only
         *
         * @return array [$fetchall, $sth, $success]
         */
        public function select(string $SQL_request, array $values, bool $debug = false, bool $output_only = true): array {
            $result = $this->query($SQL_request, $values, $debug);
            $sth = $result[0];
            $success = $result[1];
            $fetchall = $sth->fetchall();
            
            if($debug){
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
         * @param $SQL_request
         * @param $values
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
         * @param array $values
         * @param bool $debug
         * @param bool $output_only
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
    }