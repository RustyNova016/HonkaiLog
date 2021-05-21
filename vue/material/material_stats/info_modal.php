<?php
    /**
     * @var int              $i
     * @var material_history $history_time_span
     * @var string           $material_name
     */
?>

<div class="modal fade  bg"
     id="Modal_<?=$i?>_<?=str_replace(' ', '', $history_time_span->get_time_frame()->getCardTitle());?>"
     tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-bg modal-content">
            <div class="modal-header">
                <h5 class="modal-title"
                    id="exampleModalLabel"><?=$history_time_span->get_time_frame()->getCardTitle()?>
                </h5>
            </div>
            <div class="modal-body">
                <?=$material_name?> counts:
                <ul>
                    <?php

                    ?>
                    <li>
                        Gained <?=$history_time_span->getNetGains()?>
                        <?=$material_name?>s
                    </li>
                    <?php

                    ?>
                    <li>
                        Spent <?=$history_time_span->getNetLoss()?>
                        <?=$material_name?>s
                    </li>
                    <?php

                    ?>
                    <li>In
                        total, <?=$history_time_span->get_overall_change()?>
                        <?=$material_name?>s
                    </li>
                    <?php

                    ?>
                </ul>
                
                <?=$material_name?> counts / day:
                <ul>
                    <?php

                        if (!($history_time_span->get_average_gain() == -1)){
                    ?>
                    <li>
                        Gained <?=$history_time_span->get_average_gain()?>
                        <?=$material_name?>s / day
                    </li>
                    <?php
                        }
                    if (!($history_time_span->get_average_loss() == -1)){
                    ?>
                    <li>
                        Spent <?=$history_time_span->get_average_loss()?>
                        <?=$material_name?>s / day
                    </li>
                    <?php
                    }
                    if (!($history_time_span->get_average_change() == -1)){
                    ?>
                    <li>In
                        average, <?=$history_time_span->get_average_change()?>
                        <?=$material_name?>s / day
                    </li>
                    <?php
                    }
                    ?>
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
