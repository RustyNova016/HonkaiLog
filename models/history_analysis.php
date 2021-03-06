<?php
function history_analysis($timespan){
    $history = $timespan["history_data"];
    $current_quantity = $history[array_key_last($history)]["quantity"];
    if ($current_quantity == Null){
        $current_quantity = 0;
    }

    $overall_change = $current_quantity - $history[0]["quantity"];


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

    if ($timespan["nbr_day"] > 1){
        $overall_change_average = round($overall_change / $timespan["nbr_day"], 2);
    } else {
        $overall_change_average = -1;
    }

    if ($overall_change < 0){
        $bg = "text-white bg-danger";
    } elseif ($overall_change == 0){
        $bg = "text-white bg-secondary";
    } else{
        $bg = "text-white bg-success";
    }

    return [
        "overall_change" => $overall_change,
        "overall_change_average" => $overall_change_average,
        "gain" => $gain,
        "loses" => $loses,
        "current" => $current_quantity,
        "bg" => $bg
    ];
}