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
            <h1>Materials:</h1>

            <?php

            foreach($material_list_ as $material_item) {
                $i = $material_item->getId();
            ?>
                <form action="#" method=post style="padding-bottom: 50px">

                    <div class="row g-3 align-items-center">

                        <input name="id_material" type="hidden" value="<?=$material_item->getId() ?>">

                        You got <?=$material_item->getCurrentCount() ?> <?=$material_item->getName() ?>
                        <div class="col-auto">
                            <input name="<?=$material_item->getId() ?>_quantity" type="input" class="form-control" value="<?=$material_item->getCurrentCount() ?>">
                        </div>
                        <!--
                        <div class="mb-3">
                            <label for="exampleFormControlTextarea1" class="form-label">Change</label>
                            <textarea name="libchange" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>

                        -->

                        <button type="submit" class="btn btn-primary">Submit</button>




                        <div class="col-auto">
                        <button class="btn btn-outline-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapse<?=$i ?>" aria-expanded="false" aria-controls="collapse<?=$i ?>">
                            More options...
                        </button>
                        </div>

                        <div class="collapse row justify-content-between" id="collapse<?=$i ?>" style="padding-top: 20px;" >
                            <?php
                            foreach ($material_item->getHistory() as $history_time_span) {
                                if ($history_time_span->get_overall_change() < 0){
                                    $bg = "text-white bg-danger";
                                } elseif ($history_time_span->get_overall_change() == 0){
                                    $bg = "text-white bg-secondary";
                                } else{
                                    $bg = "text-white bg-success";
                                }
                                //$history_time_span->getNetGains();
                                
                                //var_dump($history_time_span);
                            ?>

                                <div class="card text-white <?=$bg ?> col-sm-5" style="width: auto; margin: 10px; padding:15px;">
                                    <div class="card-body" style="padding: 5px;">
                                        <h5 class="card-title"><?=$history_time_span->getTimeFrame()->getCardTitle() ?></h5>
                                        <p class="card-text"><?=$history_time_span->getTimeFrame()->getCardStart() ?>, you:</p>

                                        <ul>
                                            <li>Gained <?=$history_time_span->getNetGains() ?> <?=$material_item->getName() ?>s</li>
                                            <li>Spent <?=$history_time_span->getNetLoss() ?> <?=$material_item->getName() ?>s</li>
                                        </ul>

                                        Overall, you got <?=$history_time_span->get_overall_change() ?> <?=$material_item->getName() ?>s during this period.
                                        <br> <br>

                                        <?php
                                        $change_average = $history_time_span->get_average_gain();
                                        if ($change_average != -1){
                                            echo "On average, you got ". $change_average ." ".$material_item->getName()."s per day. Which is ";

                                            $today_overall_change = $timespan_type[0]["overall_change"];
                                            if ($change_average > $today_overall_change) {
                                                echo "<a style='color: #ffa7a7'>more</a> than today";
                                            } elseif ($change_average == $today_overall_change){
                                                echo "the same as the last 24h";
                                            } else {
                                                echo "<a style='color: #7eff76'>less</a> than today";
                                            }
                                        }
                                        ?>
                                    </div>
                                </div>
                            <?php
                            }
                            ?>
                        </div>
                        <br>
                        <br>

                    </div>

                </form>

            <?php
            }
            ?>
        </div>
    </div>
</div>