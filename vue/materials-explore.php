<div class="bg">
    <div class="container bg">
        <h1 class="title">Material: <?=$id_selected_mat_type ?></h1>

        <div class="btn-group">
            <button class="btn btn-secondary btn-lg dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Select the type of material
            </button>
            <ul class="dropdown-menu">
              <?php
                foreach ($list_material_type as $key) {


                    if ($key["id_material"] == $id_selected_mat_type){
                        $sele = "selected";
                    } else {
                    $sele = "";
                    }
                    echo "<li><a class=\"dropdown-item\" href='/honkailog/materials/explore/".$key["type_mat"]."'>".$key["type_mat"]."</a></li>";
                }
                ?>
            </ul>
        </div>
    </div>
</div>