<?php


class material {
    private int $id;
    private string $name;
    private array $history;
    private int $current_count;

    public function __construct($new_id, $new_name, $new_history){
        $this->id = $new_id;
        $this->name = $new_name;
        $this->new_history = $new_history;

        $this->current_count = $this->history[0]->get_current_count();
    }

}