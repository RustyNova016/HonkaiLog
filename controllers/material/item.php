<?php
    /**
     * @var \material_database $material_DB
     * @var \user_class $user
     */

    require_once "models/other_functions.php";

    $item_ID = $params[2];

    $material_info = $material_DB->request_item_id($item_ID);


    $user = unserialize($_SESSION["user"]);
    $id_user = $user->get_id_user();
    $item_logs = $material_DB->request_item_logs($item_ID, $id_user);

    $material_info["material_logs"] = $item_logs;

    send_to_JS_json($material_info, "DOM_data");

    require "vue/material/item/index.php";
