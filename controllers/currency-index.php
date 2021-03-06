<?php
$idcap = 2;

// We get the avaible currencies
include "models/get_currencies.php";
$currencies = get_currencies($dbh);

//echo "<pre>";
//print_r($currencies);
//echo "</pre>";

if (!empty($_POST)){
    $idcurrency = $_POST["cur"];
} else {
    $idcurrency = 1;
}

$cur_info = $currencies[$idcurrency-1];

include "models/update_currency_quantity.php";
if (!empty($_POST)){
    if (!empty($_POST["quantity"])){
        $update_valid = update_currency_count($dbh, $idcap, $idcurrency, $_POST["quantity"], $_POST["libchange"]);
    }
}

$timespan_type = [
    [
        "name" => "Today",
        "SQL" => "TODAY",
        "start" => "Today",
        "nbr_day" => 1,
    ],
    [
        "name" => "Last 24h",
        "SQL" => "1 DAY",
        "start" => "In the last 24h",
        "nbr_day" => 1,
    ],
    [
        "name" => "Last 7 day",
        "SQL" => "7 DAY",
        "start" => "In the last 7 days",
        "nbr_day" => 7,
    ],
    [
        "name" => "Last 30 day",
        "SQL" => "30 DAY",
        "start" => "In the last 30 days",
        "nbr_day" => 30,
    ],
    [
        "name" => "Last year",
        "SQL" => "365 DAY",
        "start" => "In the last year",
        "nbr_day" => 365,
    ]
];

include "models/get_currency_history.php";

for ($i=0; $i < count($timespan_type); $i++) {
    $timespan_type[$i]["history_data"] = get_currency_history($dbh, $idcap, $idcurrency, $timespan_type[$i]["SQL"]);
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
