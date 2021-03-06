<?php
function history_analysis($history){
    $overall_change = $history[array_key_last($history)]["quantity"] - $history[0]["quantity"];

    $old_amount = $history[0]["quantity"];
    $gain = 0;
    $loses = 0;
    for ($i=1; $i < count($history); $i++) {
        $amount = $history[$i]["quantity"];
        $diff = $amount - $old_amount;

        if ($diff > 0){
            $gain += $diff;
        } elseif ($diff < 0){
            $loses += $diff;
        }

        $old_amount = $amount;
    }

    return [
        "overall_change" => $overall_change,
        "gain" => $gain,
        "loses" => $loses
    ];
}