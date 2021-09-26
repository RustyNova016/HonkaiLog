<?php
    
    class URL_Tools {
        /** Return the path part of a URL
         *
         * @param string $inp
         * @return string
         */
        public static function get_path(string $inp) : string {
            if (strpos($inp, "?") !== false) {
                return explode("?", $inp)[0];
            } else {
                return $inp;
            }
        }
    
        /** Return the GET part of a URL
         *
         * @param string $inp
         * @return string|bool
         */
        public static function get_data(string $inp) : string | bool {
            if (strpos($inp, "?") !== false) {
                return explode("?", $inp)[1];
            } else {
                return false;
            }
        }
    }