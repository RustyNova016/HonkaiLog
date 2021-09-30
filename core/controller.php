<?php
    
    use JetBrains\PhpStorm\NoReturn;
    
    class controller {
        protected string $layout = "default";
        protected string $redirect_location;
        private array $vars = array();
        
        public function __construct() {
            // Redirect check
            if (isset($this->redirect_location)) {
                $this->redirect($this->redirect_location);
            }
        }
        
        /** Redirect somewhere
         *
         * @param string $location
         */
        #[NoReturn] protected function redirect(string $location): void {
            header("Location: $location"); //TODO: URL Manipulation check
            die();
        }
        
        /** Display the view
         *
         * @param string $filename
         */
        protected function render(string $filename): void {
            // We send the data to the view
            extract($this->vars);
            
            // Start the buffer
            ob_start();
            
            require ROOT . 'views/' . get_class($this) . "/" . $filename . '.php';
            
            // Get the buffer
            $content_for_layout = ob_get_clean();
            
            // if no layout
            if ($this->layout == false) {
                echo $content_for_layout;
            } else {
                require ROOT . 'views/layouts/' . $this->layout . '.php';
            }
        }
        
        /** Put data in vars
         *
         * @param array $d
         */
        protected function set(array $d): void {
            $this->vars = array_merge($this->vars, $d);
        }
    }