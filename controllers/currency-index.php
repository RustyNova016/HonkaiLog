<?php
$idcap = 2;
$idcurrency = 1;

// We get the avaible currencies
include "models/get_currencies.php";
$currencies = get_currencies($dbh);

//echo "<pre>";
//print_r($currencies);
//echo "</pre>";

include "models/update_currency_quantity.php";
if (!empty($_POST)){
    $update_valid = update_currency_count($dbh,$idcap, $idcurrency, $_POST["quantity"], $_POST["libchange"]);
}

$timespan_type = [
    [
        "name" => "Today",
        "SQL" => "1 DAY",
        "start" => "Today"
    ],
    [
        "name" => "Last 7 day",
        "SQL" => "1 WEEK",
        "start" => "In the last 7 days"
    ],
    [
        "name" => "Last 30 day",
        "SQL" => "1 MONTH",
        "start" => "In the last 30 days"
    ]
];

include "models/get_currency_history.php";

for ($i=0; $i < count($timespan_type); $i++) {
    $timespan_type[$i]["history_data"] = get_currency_history($dbh, $idcap, $idcurrency, $timespan_type[$i]["SQL"]);
}


include "models/history_analysis.php";

for ($i=0; $i < count($timespan_type); $i++) {
    $history_analysis = history_analysis($timespan_type[$i]["history_data"]);
    $timespan_type[$i] = array_merge_recursive($timespan_type[$i], $history_analysis);
}

//echo "<pre>";
//print_r($timespan_type);
//echo "</pre>";

include "vue/currency-index.php";
