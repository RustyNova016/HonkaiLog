<?php
    /**
     * @var array $list_of_material_type
     * @var material_type $material_type
     * @var material $material_item
     * @var material_history $history_time_span
     */
?>

<?php
    foreach ($list_of_material_type as $material_type) {
        if (($material_type->is_display_type()) and (count($material_type->get_list_of_material()) > 0)) {
            
            ?>
            <h2 style="margin-top: 20px">
                Material type: <?=$material_type->get_name()?>
            </h2>
            
            <?php
            foreach ($material_type->get_list_of_material() as $material_item) {
                $i = $material_item->get_id_material();
                $material_name = $material_item->get_name();
                $current_count = $material_item->get_current_count();
                $current_count_formated = number_format(floatval($current_count));
                ?>

                <form action="#" method=post>

                    <div class="row g-3 align-items-center">

                        <div class="row g-3 align-items-center" style="padding-left: 40px; margin-top: 40px; margin-bottom: 20px">
                            <input name="id_material" type="hidden" value="<?=$material_item->get_id_material()?>">

                            <label style="min-width: 300px">You
                                got <?=$current_count_formated?> <?=$material_name?></label>
                            <div class="col-auto">
                                <input name="<?=$material_item->get_id_material()?>_quantity" type="input" class="form-control"
                                       value="<?=$current_count?>">
                            </div>
                            <!--
                            <div class="mb-3">
                                <label for="exampleFormControlTextarea1" class="form-label">Change</label>
                                <textarea name="libchange" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                
                            -->

                            <button type="submit" class="btn btn-primary">Submit</button>


                            <div class="col-auto">
                                <button class="btn btn-outline-primary" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapse<?=$i?>" aria-expanded="false"
                                        aria-controls="collapse<?=$i?>">
                                    See statistics
                                </button>
                            </div>
                        </div>

                        <div class="collapse row justify-content-between" id="collapse<?=$i?>"
                             style="padding-top: 20px;">
                            <?php
                                foreach ($material_item->get_history() as $history_time_span) {
                                    if ($history_time_span->get_overall_change() < 0) {
                                        $bg = "text-white bg-danger";
                                    } else if ($history_time_span->get_overall_change() == 0) {
                                        $bg = "text-white bg-secondary";
                                    } else {
                                        $bg = "text-white bg-success";
                                    }
                                    //$history_time_span->getNetGains();
                                    
                                    //var_dump($history_time_span);
                                    ?>

                                    <div class="card text-white <?=$bg?> col-sm-5"
                                         style="width: auto; margin: 10px; padding:15px;">
                                        <div class="card-body" style="padding: 5px;">
                                            <h5 class="card-title"><?=$history_time_span->get_time_frame()->getCardTitle()?></h5>
                                            
                                            <p class="card-text"><?=$history_time_span->get_time_frame()->getCardStart()?>,
                                                you:</p>
                                            <ul>
                                                <li>
                                                    Gained <?=$history_time_span->getNetGains()?> <?=$material_name?>s
                                                </li>
                                                <li>
                                                    Spent <?=$history_time_span->getNetLoss()?> <?=$material_name?>s
                                                </li>
                                            </ul>
                                            Overall, you
                                            got <?=$history_time_span->get_overall_change()?> <?=$material_name?>s during this
                                            period.
                                            <br> <br>
                                            
                                            <?php
                                                $change_average = $history_time_span->get_average_gain();
                                                $today_overall_change = $history_time_span->get_overall_change();
                                                
                                                if ($change_average != -1) {
                                                    echo "On average, you got " . $change_average . " " . $material_name . "s per day. Which is ";
                                                    
                                                    if ($change_average > $today_overall_change) {
                                                        echo "<a style='color: #ffa7a7'>more</a> than today";
                                                    } else if ($change_average == $today_overall_change) {
                                                        echo "the same as the last 24h";
                                                    } else {
                                                        echo "<a style='color: #7eff76'>less</a> than today";
                                                    }
                                                }
                                            ?>

                                            <br>
                                            <button type="button" class="btn btn-primary" data-toggle="modal"
                                                    data-target="#Modal_<?=$i?>_<?=str_replace(' ', '', $history_time_span->get_time_frame()->getCardTitle());?>"
                                                    style="margin-top: 20px">
                                                More info
                                            </button>
                                            <?php
                                                require "vue/material/material_stats/info_modal.php"
                                            ?>
                                        </div>
                                    </div>
                                    <?php
                                }
                            ?>
                        </div>
                    </div>
                </form>
                <?php
            }
        }
    }
?>