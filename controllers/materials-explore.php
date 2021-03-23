<?php
include "models/material.php";

$material_DB = new material($dbh);

$list_material_type = $material_DB->get_material_types();
//var_dump($list_material_type);

//var_dump($params);
if(isset($params[2])){
    $id_selected_mat_type = $params[2];
    $selected_mat_type = $material_DB->get_material_type_info($id_selected_mat_type)[0];
    //var_dump($selected_mat_type);
}

//var_dump($id_selected_mat_type);
//echo $id_selected_mat_type;

include "vue/materials-explore.php";