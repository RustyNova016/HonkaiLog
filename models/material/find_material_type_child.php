<?php
    function find_material_type_child(int $id_current, $material_list){
        $id_of_children = [];
        
        foreach ($material_list as $material_type) {
            //var_dump($material_type);
            //var_dump($material_list);
            //var_dump($material_list[$id_current]);
            if ($material_type->get_parent_id() == $material_list[$id_current]->get_id()){
                $id_of_children = array_merge($id_of_children, find_material_type_child($material_type->get_id(), $material_list));
            }
        }
        
        array_push($id_of_children, $material_list[$id_current]->get_id());
        return $id_of_children;
    }