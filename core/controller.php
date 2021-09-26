<?php
    
    class controller {
        private array $vars = array();
        
        /** Display the view
         *
         * @param string $filename
         */
        protected function render(string $filename) {
            extract($this->vars);
            
            require ROOT . 'views/' . get_class($this) . "/" . $filename . '.php';
        }
        
        /** Put data in vars
         *
         * @param array $d
         */
        protected function set(array $d) {
            $this->vars = array_merge($this->vars, $d);
        }
    }