<?php
    
    
    class time_frame {
        private $SQL;
        private $name;
        private int $nbr_day;
        private $use_calendar_day;
        private $card_start;
        private $card_title;
        /** Datetime of the start of timeframe
         *
         * @var DateTime
         */
        private DateTime $date_start;
    
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
                                    $new_card_start, $new_card_title) {
            $this->SQL = $new_SQL;
            $this->name = $name;
            $this->nbr_day = $nbr_day;
            $this->use_calendar_day = $use_calendar_day;
            $this->card_start = $new_card_start;
            $this->card_title = $new_card_title;
            
            if ($this->use_calendar_day){
                $this->date_start = next_reset()->modify('-' . $this->nbr_day . ' day');
            } else {
                $now = new DateTime();
                $this->date_start = $now->modify('-' . $this->nbr_day . ' day');
            }
            
        }
        
        /**
         * @return mixed
         */
        public function getSQL() {
            return $this->SQL;
        }
        
        /**
         * @return mixed
         */
        public function use_calendar_day() {
            return $this->use_calendar_day;
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
        public function getCardTitle() {
            return $this->card_title;
        }
        
        /**
         * @return mixed
         */
        public function getCardStart() {
            return $this->card_start;
        }
    
        /**
         * @return DateTime
         */
        public function get_date_start(): DateTime|bool {
            return $this->date_start;
        }
    }