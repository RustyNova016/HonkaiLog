<?php
    
    
    class time_frame {
        private $SQL;
        private $card_start;
        private $card_title;
        /** Datetime of the start of timeframe
         *
         * @var DateTime
         */
        private DateTime $date_start;
        private $name;
        private int $nbr_day;
        private $use_calendar_day;
        private bool $show_average;
        
        /**
         * time_frame constructor.
         *
         * @param     $new_SQL
         * @param     $name
         * @param int $nbr_day
         * @param     $use_calendar_day
         * @param     $new_card_start
         * @param     $new_card_title
         *
         * @throws Exception
         */
        public function __construct($new_SQL, $name, int $nbr_day, $use_calendar_day,
                                    $new_card_start, $new_card_title, $time_array) {
            $this->SQL = $new_SQL;
            $this->name = $name;
            $this->nbr_day = $nbr_day;
            $this->use_calendar_day = $use_calendar_day;
            $this->card_start = $new_card_start;
            $this->card_title = $new_card_title;
            
            if ($this->use_calendar_day) {
                $this->date_start = next_reset()->modify('-' . $this->nbr_day . ' day');
            } else {
                $now = new DateTime();
                $this->date_start = $now->modify('-' . $this->nbr_day . ' day');
            }
    
            $date_start = $time_array["date_start"];
            if (isset($date_start)){
                $this->date_start = $date_start;
                $this->nbr_day = intval(diff_whole_days($date_start, new DateTime())) + 1;
            }
    
            $show_average = $time_array["show_average"];
    
            if (isset($show_average)) {
                $this->show_average = $show_average;
            } else {
                $this->show_average = true;
            }
        }
        
        /**
         * @return mixed
         */
        public function getCardStart() {
            return $this->card_start;
        }
        
        /**
         * @return mixed
         */
        public function getCardTitle() {
            return $this->card_title;
        }
        
        /**
         * @return mixed
         */
        public function getNbrDay() {
            return $this->nbr_day;
        }
        
        /**
         * @return mixed
         */
        public function getSQL() {
            return $this->SQL;
        }
        
        /**
         * @return DateTime|bool
         */
        public function get_date_start(): DateTime|bool {
            return $this->date_start;
        }
        
        /**
         * @return mixed
         */
        public function use_calendar_day() {
            return $this->use_calendar_day;
        }
    
        /**
         * @return bool|mixed
         */
        public function get_show_average(): mixed {
            return $this->show_average;
        }
    }