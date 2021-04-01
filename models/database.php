<?php
    
    
    class database {
        private PDO $dbh;
    
        public function __construct($dbh) {
            $this->dbh = $dbh;
        }
    
        public function query($SQL_request, $values, $debug = false) {
            if ($debug){
                var_dump($SQL_request);
                var_dump($values);
            }
            
            $sth = $this->dbh->prepare($SQL_request);
            $success = $sth->execute($values);
            return [$sth, $success];
        }
    
        public function select(string $SQL_request, array $values=[], bool $debug=false, bool $output_only=true) {
            $result = $this->query($SQL_request, $values, $debug);
            $sth = $result[0];
            $success = $result[1];
            $fetchall = $sth->fetchall();
            
            if ($debug){
                var_dump($fetchall);
            }
            
            if ($output_only){
                return $fetchall;
            } else {
                return [$fetchall, $sth, $result];
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