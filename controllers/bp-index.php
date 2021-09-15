<?php
    require_once "models/BP/BP_progress.php";
    require_once "models/other_functions.php";

    if (empty($_SESSION["user"])){
        login_redirect("bp");
    }
    
    /**
     * @var database $db
     */
    
    $bp_db = new BP_progress($db);
    
    if (!empty($_POST["bp_level"])) {
        $bp_db->insert_bp_log($db, $_POST["bp_level"], $_POST["bp_xp"]);
    }

    $send = [
        "current_bp" => $bp_db->get_current_bp(),
        "yesterday_bp" => $bp_db->get_yesterday_count(),
        "days_left" => $bp_db->get_seasons()["vanguard"]->get_day_left(),
        "weeks_left" => $bp_db->get_seasons()["vanguard"]->get_weeks_left(),
        "weekly_limit" => 12000,
        "types" => []
    ];

    foreach ($bp_db->get_seasons() as $season) {
        array_push($send["types"], [
            "name" => $season->get_bp_type(),
            "bp_goal" => $season->get_total_bp_needed()
        ]);
    }

    send_to_JS_json($send, "DOM_data");
    
    include "vue/bp-index.php";