<?php
    foreach ($list_of_material_type as $material_type) {
        if (($material_type->is_display_type()) and (count($material_type->get_list_of_material()) > 0)) {
            
            ?>
            <h2 style="margin-top: 20px">
                Material type: <?=$material_type->get_name()?>
            </h2>
            
            <?php
            foreach ($material_type->get_list_of_material() as $material_item) {
                $i = $material_item->getId();
                $name = $material_item->getName();
                $current_count = $material_item->getCurrentCount();
                $current_count_formated = number_format(floatval($current_count));
                ?>

                <form action="#" method=post>

                    <div class="row g-3 align-items-center">

                        <div class="row g-3 align-items-center" style="padding-left: 40px; margin-top: 40px; margin-bottom: 20px">
                            <input name="id_material" type="hidden" value="<?=$material_item->getId()?>">

                            <label style="min-width: 300px">You
                                got <?=$current_count_formated?> <?=$name?></label>
                            <div class="col-auto">
                                <input name="<?=$material_item->getId()?>_quantity" type="input" class="form-control"
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
                                foreach ($material_item->getHistory() as $history_time_span) {
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
                                            <h5 class="card-title"><?=$history_time_span->getTimeFrame()->getCardTitle()?></h5>
                                            <p class="card-text"><?=$history_time_span->getTimeFrame()->getCardStart()?>,
                                                you:</p>
                                            <ul>
                                                <li>
                                                    Gained <?=$history_time_span->getNetGains()?> <?=$name?>s
                                                </li>
                                                <li>
                                                    Spent <?=$history_time_span->getNetLoss()?> <?=$name?>s
                                                </li>
                                            </ul>
                                            Overall, you
                                            got <?=$history_time_span->get_overall_change()?> <?=$name?>s during this
                                            period.
                                            <br> <br>
                                            <?php
                                                $change_average = $history_time_span->get_average_gain();
                                                if ($change_average != -1) {
                                                    echo "On average, you got " . $change_average . " " . $name . "s per day. Which is ";
                                                    $today_overall_change = $timespan_type[0]["overall_change"];
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
                                                    data-target="#Modal_<?=$i?>_<?=str_replace(' ', '', $history_time_span->getTimeFrame()->getCardTitle());?>"
                                                    style="margin-top: 20px">
                                                More info
                                            </button>

                                            <div class="modal fade  bg"
                                                 id="Modal_<?=$i?>_<?=str_replace(' ', '', $history_time_span->getTimeFrame()->getCardTitle());?>"
                                                 tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                                                 aria-hidden="true">
                                                <div class="modal-dialog" role="document">
                                                    <div class="modal-bg modal-content">
                                                        <div class="modal-header">
                                                            <h5 class="modal-title"
                                                                id="exampleModalLabel"><?=$history_time_span->getTimeFrame()->getCardTitle()?></h5>
                                                            <button type="button" class="close" data-dismiss="modal"
                                                                    aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div class="modal-body">
                                                            <?=$name?> counts:
                                                            <ul>
                                                                <li>
                                                                    Gained <?=$history_time_span->getNetGains()?>
                                                                    <?=$name?>s
                                                                </li>
                                                                <li>
                                                                    Spent <?=$history_time_span->getNetLoss()?>
                                                                    <?=$name?>s
                                                                </li>
                                                                <li>In
                                                                    total, <?=$history_time_span->get_overall_change()?>
                                                                    <?=$name?>s
                                                                </li>
                                                            </ul>
                                                            
                                                            <?=$name?> counts / day:
                                                            <ul>
                                                                <li>
                                                                    Gained <?=$history_time_span->get_average_gain()?>
                                                                    <?=$name?>s / day
                                                                </li>
                                                                <li>
                                                                    Spent <?=$history_time_span->get_average_loss()?>
                                                                    <?=$name?>s / day
                                                                </li>
                                                                <li>In
                                                                    average, <?=$history_time_span->get_average_change()?>
                                                                    <?=$name?>s / day
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="btn btn-secondary"
                                                                    data-dismiss="modal">Close
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
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