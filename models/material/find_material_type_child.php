<?php
    function find_material_type_child(int $id_current, $list_of_material_type){
        $list_of_child_id = [];
        
        foreach ($list_of_material_type as $material_type) { // for each material of the list
            
            // If the material is the child of the target material
            if ($material_type->get_parent_id() == $list_of_material_type[$id_current]->get_id()){
                
                // We add it to the list
                array_push($list_of_child_id, $material_type->get_id());
            }
        }
        
        // We set up the depth counter
        $result_array = [
            $id_current => 0,
        ];
        
        // For each child id, we get their the ids of their own children
        foreach ($list_of_child_id as $child_id) {
            $find_material_type_child = find_material_type_child($child_id, $list_of_material_type);
            $result_array = $result_array + $find_material_type_child;
        }
    
        // We add +1 to the depth of all the childs
        $add_depth = [];
        foreach ($result_array as $id_child => $depth) {
            $add_depth[$id_child] = $depth + 1;
        }

        // We return the result
        return $add_depth;
    }