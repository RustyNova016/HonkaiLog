<?php
    
    
    class EmptyLogsException extends Exception {
        public function __construct($message = "Empty logs", $code = 0, Throwable $previous = null) {
            parent::__construct($message, $code, $previous);
        }
    }