<?php
include "models/material_db.php";

$material_DB = new material_db($dbh);

$list_material_type = $material_DB->get_material_types();
//var_dump($list_material_type);

//var_dump($params);
if(isset($params[2])){
    $id_selected_mat_type = $params[2];
    $selected_mat_type = $material_DB->get_material_type_info($id_selected_mat_type)[0];
    //var_dump($selected_mat_type);
    $list_materials = $material_DB->get_material_list_of_type($id_selected_mat_type);
}

//var_dump($list_materials);
//var_dump($id_selected_mat_type);
//echo $id_selected_mat_type;

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

var_dump($list_materials);

$material_info_array = [];
foreach($list_materials as $material){
    $material_info = [
        "id" => $material["id_material"],
        "name" => $material["name"],
        "history" => [],
    ];
    for ($i=0; $i < count($timespan_type); $i++) {
        $material_history = $material_DB->get_material_history($_SESSION["iduser"], $material["id_material"], $timespan_type[$i]["SQL"]);
        $material_history["history"] = $timespan_type[$i];
        var_dump($material_history);
        array_push($material_info["history"], $material_history);
    }
    $material_info_array[$material["id_material"]] = $material_info;
}

//var_dump($material_info_array);

echo "<pre>";
print_r($material_info_array);
echo "</pre>";

include "vue/materials-explore.php";