<?php
    
    
    class material_history {
        private $date_start;
        private $date_end;
        private $timestamps;
        private $net_gains;
        private $net_loss;
        private time_frame $time_frame;
        
        public function __construct($timestamps, $time_frame) {
            $this->timestamps = $timestamps;
            $this->time_frame = $time_frame;
        }
        
        
        public function get_current_count(): int {
            return $this->get_latest_timestamp()["quantity"];
        }
        
        public function get_oldest_count() {
            return $this->get_oldest_timestamp()["quantity"];
        }
        
        public function get_oldest_timestamp() {
            return $this->timestamps[0];
        }
        
        public function get_latest_timestamp() {
            return end($this->timestamps);
        }
        
        public function get_average_change() {
            if ($this->time_frame->getNbrDay() > 1) {
                $overall_change_average = round($this->get_overall_change() / $this->time_frame->getNbrDay(), 2);
            } else {
                $overall_change_average = -1;
            }
            //var_dump($overall_change_average);
            return $overall_change_average;
        }
        
        public function get_average_gain() {
            if ($this->time_frame->getNbrDay() > 1) {
                $gain_average = round($this->getNetGains() / $this->time_frame->getNbrDay(), 2);
            } else {
                $gain_average = -1;
            }
            //var_dump($gain_average);
            return $gain_average;
        }
        
        public function get_average_loss() {
            if ($this->time_frame->getNbrDay() > 1) {
                $gain_loss = round($this->getNetLoss() / $this->time_frame->getNbrDay(), 2);
            } else {
                $gain_loss = -1;
            }
            //var_dump($gain_average);
            return $gain_loss;
        }
        
        public function get_overall_change() {
            return $this->get_current_count() - $this->get_oldest_count();
        }
        
        /** Calculate gains and losses
         *
         */
        private function gain_loss() {
            $this->net_gains = 0;
            $this->net_loss = 0;
            $old_amount = $this->timestamps[0]["quantity"];
            for ($i = 1; $i < count($this->timestamps); $i++) {
                $amount = $this->timestamps[$i]["quantity"];
                $diff = $amount - $old_amount;
                
                if ($diff > 0) {
                    $this->net_gains += $diff;
                } elseif ($diff < 0) {
                    $this->net_loss += $diff;
                }
                
                $old_amount = $amount;
            }
        }
        
        /**
         * @return DateTime
         */
        public function getDateEnd(): DateTime {
            return $this->date_end;
        }
        
        /**
         * @return int
         */
        public function getNetGains(): int {
            if (empty($this->net_gains)) {
                $this->gain_loss();
            }
            return $this->net_gains;
        }
        
        /**
         * @return int
         */
        public function getNetLoss(): int {
            if (empty($this->net_loss)) {
                $this->gain_loss();
            }
            return $this->net_loss;
        }
        
        /**
         * @return mixed
         */
        public function getTimeFrame() {
            return $this->time_frame;
        }
    }