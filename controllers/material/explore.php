<?php
    require_once "models/material_db.php";
    require_once "models/material/material_type.php";
    require_once "models/material/find_material_type_child.php";
    require_once "models/material/MaterialClass.php";
    require_once "models/material/material_history.php";
    require_once "models/material/time_frame.php";
    require_once "models/other_functions.php";
    
    if (empty($_SESSION["user"])){
        login_redirect("material/explore");
    }

    /**
     * @var PDO      $dbh
     * @var database $db
     */
    
    // We get the list of the ids of the materials types
    $material_DB = new material_db($dbh);
    $list_of_id_material_type = $material_DB->get_material_types();
    
    // We then transform the ids into material_type objects
    $list_of_material_type = [];
    foreach ($list_of_id_material_type as $material_type) {
        $list_of_material_type[$material_type["id_material_type"]] = new material_type($db, $material_type["id_material_type"]);
    }
    
    // Now, we prepare the material list
    $hierachical_material_types_id = find_material_type_child(1, $list_of_material_type);
    
    // We check if the user already selected a material type
    if (isset($params[2])) {
        // If so, we retrieve the id
        $id_selected_mat_type = $params[2];
    } else {
        $id_selected_mat_type = 1;
    }
    // Get the children
    $get_children_id = find_material_type_child($id_selected_mat_type, $list_of_material_type);
    
    $timespan_type = [
        [
            "name" => "Today",
            "SQL" => "0",
            "start" => "Today",
            "nbr_day" => 1,
            "wholeday" => 1
        ],
        [
            "name" => "Last 24h",
            "SQL" => "1",
            "start" => "In the last 24h",
            "nbr_day" => 1,
            "wholeday" => 0
        ],
        [
            "name" => "Last 7 day",
            "SQL" => "7",
            "start" => "In the last 7 days",
            "nbr_day" => 7,
            "wholeday" => 1
        ],
        [
            "name" => "Last 30 day",
            "SQL" => "30",
            "start" => "In the last 30 days",
            "nbr_day" => 30,
            "wholeday" => 1
        ],/**
        [
            "name" => "Last version",
            "SQL" => "365 DAY",
            "start" => "In the last version",
            "nbr_day" => 365,
            "date_start" => new DateTime("2021-03-05"),
            "wholeday" => 1
        ],*/
        [
            "name" => "Last version",
            "SQL" => "365 DAY",
            "start" => "In the last version",
            "nbr_day" => 365,
            "date_start" => new DateTime("2022-04-7"),
            "wholeday" => 1,
            "show_average" => true
        ],
        [
            "name" => "Last 365 days",
            "SQL" => "365 DAY",
            "start" => "In the last 365 days",
            "nbr_day" => 365,
            "wholeday" => 1
        ]
    ];
    
    $time_frame_list = [];
    
    foreach ($timespan_type as $time_array) {
        $new_time_frame = new time_frame(
            $time_array["SQL"],
            $time_array["name"],
            $time_array["nbr_day"],
            $time_array["wholeday"],
            $time_array["start"],
            $time_array["name"],
            $time_array
        );
        //var_dump($new_time_frame);
        array_push($time_frame_list, $new_time_frame);
    }
    
    // We retrieve the material data
    foreach ($get_children_id as $id_child => $depth) {
        $list_of_material_type[$id_child]->query_material_list($db, $time_frame_list);
    }
    
    // Did the user sent a new count? Log it
    if (!empty($_POST)) {
        foreach ($list_of_material_type as $material_type) {
            
            $list_of_material = $material_type->get_list_of_material();
            foreach ($list_of_material as $material) {
                /**
                 * @var  material_class $material
                 */
    
                $new_quantity = $_POST[$material->get_id_material() . "_quantity"];
                if (!empty($new_quantity)) {
                    $material->log_material_count($db, $new_quantity, "");
                }
            }
        }
    }
    
    
    
    $_POST = array();
    require_once "vue/materials-explore.php";