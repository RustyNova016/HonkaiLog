<?php
    
    class controller {
        private array $vars = array();
        protected string $layout = "default";
        
        /** Display the view
         *
         * @param string $filename
         */
        protected function render(string $filename) {
            // We send the data to the view
            extract($this->vars);
            
            // Start the buffer
            ob_start();
            
            require ROOT . 'views/' . get_class($this) . "/" . $filename . '.php';
            
            // Get the buffer
            $content_for_layout = ob_get_clean();
            
            // if no layout
            if($this->layout == false){
                echo $content_for_layout;
            } else {
                require ROOT.'views/layouts/'.$this->layout.'.php';
            }
        }
        
        /** Put data in vars
         *
         * @param array $d
         */
        protected function set(array $d) {
            $this->vars = array_merge($this->vars, $d);
        }
    }