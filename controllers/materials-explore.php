<?php
include "models/material_db.php";

//var_dump($_POST);

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

//var_dump($list_materials);


include "models/material/material.php";
include "models/material/material_history.php";
include "models/material/time_frame.php";

$time_frame_list = [];

foreach ($timespan_type as $time_array){
    $new_time_frame = new time_frame(
        $time_array["SQL"],
        $time_array["name"],
        $time_array["nbr_day"],
        $time_array["wholeday"],
        $time_array["start"],
        $time_array["name"]
    );
    //var_dump($new_time_frame);
    array_push($time_frame_list, $new_time_frame);
}

//var_dump($time_frame_list);

$material_list_ = [];
foreach($list_materials as $material_base){
    $material = new material($material_base["id_material"], $material_base["name"]);



    if (!empty($_POST[$material->getId()."_quantity"])){
        $material->log_material_count($dbh, $_POST[$material->getId()."_quantity"], "");
    }
    //var_dump($material);


    foreach($time_frame_list as $one_time_frame){
        $material->request_material_history($dbh, $one_time_frame);
    }



    array_push($material_list_, $material);
}
//var_dump($material_list_);
$_POST = array();
include "vue/materials-explore.php";