<?php


class material_history
{
    private DateTime $date_start;
    private DateTime $date_end;
    private array $timestamps;
    private int $net_gains;
    private int $net_loss;

    public function __construct($timestamps){
        $this->timestamps = $timestamps;
    }


    public function get_current_count(){
        return $this->get_oldest_timestamp()["quantity"];
    }

    public function get_oldest_count(){
        return $this->get_oldest_timestamp()["quantity"];
    }

    public function get_oldest_timestamp(){
        return $this->timestamps[0];
    }

    public function get_latest_timestamp(){
        return end($this->timestamps);
    }

    public function get_overall_change(){
        return $this->get_current_count() - $this->get_oldest_count();
    }

    /** Calculate gains and losses
     *
     */
    private function gain_loss(){
        $this->net_gains = 0;
        $this->net_loss = 0;
        for ($i=1; $i < count($this->timestamps); $i++) {
            $amount = $this->timestamps[$i]["quantity"];
            $diff = $amount - $this->get_oldest_count();

            if ($diff > 0){
                $this->net_gains += $diff;
            } elseif ($diff < 0){
                $this->net_loss += $diff;
            }

            $old_amount = $amount;
        }
    }

    /**
     * @return DateTime
     */
    public function getDateEnd(): DateTime
    {
        return $this->date_end;
    }

    /**
     * @return int
     */
    public function getNetGains(): int
    {
        return $this->net_gains;
    }

    /**
     * @return int
     */
    public function getNetLoss(): int
    {
        return $this->net_loss;
    }
}