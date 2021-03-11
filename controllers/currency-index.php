<?php
// We check for if the user is connected
if (!empty($_SESSION["iduser"])){
    include "models/material.php";
    $material_DB = new material($dbh);

    // We get the available list_material_type
    $currencies = $material_DB->get_material_list_of_type("currency");

    if (!empty($_POST)){
        $idcurrency_selected = $_POST["cur"];
    } else {
        $idcurrency_selected = 1;
    }

    $cur_info = $currencies[$idcurrency_selected-1];

    if (!empty($_POST)){
        if (!empty($_POST["quantity"])){
            $update_valid = $material_DB->update_material($_SESSION["iduser"], $idcurrency_selected, $_POST["quantity"], $_POST["libchange"]);
        }
    }

    //TODO: move to separate file
    $timespan_type = [
        [
            "name" => "Today",
            "SQL" => "0 DAY",
            "start" => "Today",
            "nbr_day" => 1,
            "wholeday" => 1
        ],
        [
            "name" => "Last 24h",
            "SQL" => "1 DAY",
            "start" => "In the last 24h",
            "nbr_day" => 1,
            "wholeday" => 0
        ],
        [
            "name" => "Last 7 day",
            "SQL" => "7 DAY",
            "start" => "In the last 7 days",
            "nbr_day" => 7,
            "wholeday" => 1
        ],
        [
            "name" => "Last 30 day",
            "SQL" => "30 DAY",
            "start" => "In the last 30 days",
            "nbr_day" => 30,
            "wholeday" => 1
        ],
        [
            "name" => "Last year",
            "SQL" => "365 DAY",
            "start" => "In the last year",
            "nbr_day" => 365,
            "wholeday" => 1
        ]
    ];

    for ($i=0; $i < count($timespan_type); $i++) {
        $timespan_type[$i]["history_data"] = $material_DB->get_material_history($_SESSION["iduser"], $idcurrency_selected, $timespan_type[$i]["SQL"]);
    }


    include "models/history_analysis.php";

    for ($i=0; $i < count($timespan_type); $i++) {
        $history_analysis = history_analysis($timespan_type[$i]);
        $timespan_type[$i] = array_merge_recursive($timespan_type[$i], $history_analysis);
    }

    //var_dump($timespan_type);

    //echo "<pre>";
    //print_r($timespan_type);
    //echo "</pre>";

    include "vue/currency-index.php";

    //TODO: History table
} else {
    header("Location: /honkailog/user/");
    echo "who is this?";
    die();
}