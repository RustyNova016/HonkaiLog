<div class="btn-group">
    <button class="btn btn-secondary btn-lg dropdown-toggle" type="button" data-bs-toggle="dropdown"
            aria-expanded="false">
        Select the type of material
    </button>
    <ul class="dropdown-menu">
        <?php
            foreach ($list_of_material_type as $material_type) {
                if ($material_type->get_id() == $id_selected_mat_type) {
                    $selected = "selected";
                } else {
                    $selected = "";
                }
                ?>
                <li>
                    <a class="dropdown-item" href='/honkailog/materials/explore/<?=$material_type->get_id()?>'>
                        <?php
                            $i = 2;
                            if ($hierachical_material_types_id[$material_type->get_id()] > 1){
                                while ($i < $hierachical_material_types_id[$material_type->get_id()]){
                                    echo "///";
                                    $i++;
                                }
                                echo " ◣";
                                
                            }
                            
                        ?>
                        <?=$material_type->get_name()?>
                    </a>
                </li>
                <?php
            }
        ?>
    </ul>
</div>