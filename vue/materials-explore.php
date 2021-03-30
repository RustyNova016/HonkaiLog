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

        <div style="margin-top: 50px">
            <h1>Material amounts:</h1>

            <?php
            $i = 0;
            foreach($list_materials as $material_item) {
                $i += 1;
            ?>
                You got N <?=$material_item["name"] ?>


                <br>
                <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapse<?=$i ?>" aria-expanded="false" aria-controls="collapse<?=$i ?>">
                    Show data
                </button>
                <div class="collapse" id="collapse<?=$i ?>">
                  <div class="card card-body">
                    Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
                  </div>
                </div>
                <br>
                <br>

            <?php
            }
            ?>
        </div>
    </div>
</div>