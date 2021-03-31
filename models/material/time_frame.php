<?php


class time_frame {
    private $SQL;
    private $name;
    private $nbr_day;
    private $whole_day;
    private $card_start;
    private $card_title;

    public function __construct($new_SQL, $new_name, $new_nbr_day, $new_whole_day, $new_card_start, $new_card_title){
        $this->SQL = $new_SQL;
        $this->name = $new_name;
        $this->nbr_day = $new_nbr_day;
        $this->whole_day = $new_whole_day;
        $this->card_start = $new_card_start;
        $this->card_title = $new_card_title;
    }

    /**
     * @return mixed
     */
    public function getSQL()
    {
        return $this->SQL;
    }

    /**
     * @return mixed
     */
    public function getWholeDay()
    {
        return $this->whole_day;
    }

    /**
     * @return mixed
     */
    public function getNbrDay()
    {
        return $this->nbr_day;
    }

    /**
     * @return mixed
     */
    public function getCardTitle()
    {
        return $this->card_title;
    }

    /**
     * @return mixed
     */
    public function getCardStart()
    {
        return $this->card_start;
    }
}