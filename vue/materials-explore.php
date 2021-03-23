<div class="bg">
    <div class="container bg">
        <h1 class="title">Materials: <?=$selected_mat_type["name"] ?></h1>

        <div class="btn-group">
            <button class="btn btn-secondary btn-lg dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Select the type of material
            </button>
            <ul class="dropdown-menu">
              <?php
                foreach ($list_material_type as $key) {


                    if ($key["id_material_type"] == $id_selected_mat_type){
                        $sele = "selected";
                    } else {
                    $sele = "";
                    }
                    echo "<li><a class=\"dropdown-item\" href='/honkailog/materials/explore/".$key["id_material_type"]."'>".$key["name"]."</a></li>";
                }
                ?>
            </ul>
        </div>
    </div>
</div>