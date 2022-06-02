<?php
/**
 * @var array $list_of_material_type
 * @var material_type $material_type
 * @var material_class $material_item
 * @var material_history $history_time_span
 */
?>

    <h1 style="margin-bottom: 20px">Material counts:</h1>
<?php
/**
 * @param int $nbPullsBeforePity
 * @return float|int
 */
function getNbCrystalsToHardPity(int $nbPullsBeforePity): int|float
{
    return 28000 - ((100 - $nbPullsBeforePity) * 280);
}

function calculate_crystals_gained_per_day($nb_days, $nb_crystals_per_day)
{
    return $nb_crystals_per_day * $nb_days;
}

function getNewVersionExcessCrystals($oldVersionDate, $nb_crystals_per_day, $nb_future_version, $currentCrystalCount){
    for ($i = 0; $i < $nb_future_version; $i++) {
        $oldVersionDate->add(new DateInterval("P6W"));
    }

    // Get the number of days before the new version
    $nb_days_before_new_version = $oldVersionDate->diff(new DateTime())->format("%a");

    // Get the number of crystals you got by the new version
    $nb_crystals_gained_by_new_version = calculate_crystals_gained_per_day($nb_days_before_new_version, $nb_crystals_per_day);

    $crystals_entering_new_version = $currentCrystalCount + $nb_crystals_gained_by_new_version;
    if ($crystals_entering_new_version < 28000) {
        return 'Not Enought for pity in ' . $nb_future_version . ' versions (Will be '.$crystals_entering_new_version.' total crystals the ' . $oldVersionDate->format("d/m/y") .')</br></br>';
    } else {
        return 'You\'ll have '.$crystals_entering_new_version - 28000 .' excess crystals (Will be '.$crystals_entering_new_version.' total crystals the ' . $oldVersionDate->format("d/m/y") .')</br></br>';
    }
}

/**
 * @param material_class $material_item
 * @param float|int $change_average
 * @return void
 * @throws Exception
 */
function crystal_info(material_class $material_item, float|int $change_average): void
{
    echo "<br> <br>";

    $nbPullsBeforePity = 98;

    // We calculate the number of crystals you need to get to the next pity
    $nb_remaining_crystals_to_get = getNbCrystalsToHardPity($nbPullsBeforePity) - $material_item->get_current_count();

    // Then we use the average income to calculate the time to get to the next pity
    $nb_days_to_get_pity_crystal_amount = ceil($nb_remaining_crystals_to_get / max(1, $change_average));


    // Add pity days to today's date
    $today = new DateTime();
    $today->add(new DateInterval("P" . $nb_days_to_get_pity_crystal_amount . "D"));

    $str = "Hard pity achived in: ";
    $str .= $nb_days_to_get_pity_crystal_amount . " days (" . $today->format("d/m/y") . ")";

    echo $str;
    echo "<br>";
    $week_remaining = $nb_days_to_get_pity_crystal_amount / 7;
    echo "Aka, " . ceil($week_remaining) . " weeks, ~" . ceil($nb_days_to_get_pity_crystal_amount / 30) . " months, " . $week_remaining / 7 . " versions";

    echo "</br></br>";

    echo 'Nb excess crystal in 1 version: ' . getNewVersionExcessCrystals(new DateTime("2022-05-19"), $change_average, 1, $material_item->get_current_count());
    echo 'Nb excess crystal in 2 version: ' . getNewVersionExcessCrystals(new DateTime("2022-05-19"), $change_average, 2, $material_item->get_current_count());
}

foreach ($list_of_material_type as $material_type) {
    if (($material_type->is_display_type()) and (count($material_type->get_list_of_material()) > 0)) {

        ?>

        <div class="content-card">
            <h2>
                <?= $material_type->get_name() ?>
            </h2>

            <?php
            foreach ($material_type->get_list_of_material() as $material_item) {
                $i = $material_item->get_id_material();
                $material_name = $material_item->get_name();
                $current_count = $material_item->get_current_count();
                $current_count_formated = number_format(floatval($current_count));
                ?>
                <div class="material">
                    <form action="#m_<?= $i ?>_<?= $material_name ?>" method=post>
                        <a class="anchor" id="m_<?= $i ?>_<?= $material_name ?>"></a>

                        <!-- Material header -->
                        <div class="row justify-content-evenly">
                            <div class="col-5">
                                <input name="id_material" type="hidden"
                                       value="<?= $material_item->get_id_material() ?>">
                                <label style="min-width: 300px">You
                                    got <?= $current_count_formated ?> <?= $material_name ?></label>
                            </div>

                            <div class="col-7">
                                <div class="row justify-content-end">
                                    <!-- Material input group -->

                                    <div class="col-auto">
                                        <div class="input-group mb-3">

                                            <div class="input-group-text">

                                                <input type="checkbox"
                                                       class="form-check-input mt-0"
                                                       id="log_check_<?= $material_item->get_id_material() ?>"
                                                       autocomplete="off">

                                            </div>

                                            <br>

                                            <input type="checkbox"
                                                   class="btn-check"
                                                   id="yesterday_check_<?= $material_item->get_id_material() ?>"
                                                   autocomplete="off">

                                            <label class="btn btn-input-group btn-outline-primary"
                                                   for="yesterday_check_<?= $material_item->get_id_material() ?>">
                                                Yesterday
                                            </label>

                                            <input name="<?= $material_item->get_id_material() ?>_quantity"
                                                   type="input"
                                                   class="form-control"
                                                   value="<?= $current_count ?>">
                                        </div>
                                    </div>

                                    <!-- Submit -->
                                    <div class="col-auto">
                                        <button type="submit" class="btn btn-primary">Submit</button>
                                    </div>

                                    <!-- See stats -->
                                    <div class="col-auto">
                                        <input type="checkbox"
                                               class="btn-check"
                                               id="btn-check-outlined_<?= $i ?>"
                                               data-bs-toggle="collapse"
                                               data-bs-target="#collapse<?= $i ?>"
                                               aria-expanded="false"
                                               aria-controls="collapse<?= $i ?>">

                                        <label class="btn btn-outline-success dropdown-toggle"
                                               for="btn-check-outlined_<?= $i ?>">See
                                            statistics</label><br>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Material stats -->
                        <!-- Collapsing div-->
                        <div class="collapse" id="collapse<?= $i ?>" style="padding-top: 20px;">
                            <div class="material-stats">
                                <div class="row row-cols-md-1 row-cols-lg-2 justify-content-around">
                                    <?php
                                    foreach ($material_item->get_history() as $history_time_span) {
                                        if ($history_time_span->get_overall_change() < 0) {
                                            $bg = "text-white bg-danger";
                                        } else if ($history_time_span->get_overall_change() == 0) {
                                            $bg = "text-white bg-secondary";
                                        } else {
                                            $bg = "text-white bg-success-custom";
                                        }
                                        ?>
                                        <div class="col-md" style="padding: 0px">
                                            <div class="card text-white <?= $bg ?> col-sm-5"
                                                 style="width: auto; margin: 15px; padding:15px;">
                                                <div class="card-body" style="padding: 5px;">
                                                    <h5 class="card-title"><?= $history_time_span->get_time_frame()->getCardTitle() ?></h5>

                                                    <p class="card-text"><?= $history_time_span->get_time_frame()->getCardStart() ?>
                                                        ,
                                                        you:</p>
                                                    <ul>
                                                        <li>
                                                            Gained <?= $history_time_span->getNetGains() ?> <?= $material_name ?>
                                                            s
                                                        </li>
                                                        <li>
                                                            Spent <?= $history_time_span->getNetLoss() ?> <?= $material_name ?>
                                                            s
                                                        </li>
                                                    </ul>
                                                    Overall, you
                                                    got <?= $history_time_span->get_overall_change() ?> <?= $material_name ?>
                                                    s
                                                    during this
                                                    period.
                                                    <br> <br>

                                                    <?php
                                                    $change_average = $history_time_span->get_average_gain();
                                                    $today_overall_change =
                                                        $material_item->get_history()
                                                        [0]->get_overall_change();

                                                    if ($change_average != -1) {
                                                        echo "On average, you got " . $change_average . " " . $material_name . "s per day. Which is ";

                                                        if ($change_average > $today_overall_change) {
                                                            echo "<a style='color: #ffa7a7'>more</a> than today";
                                                        } else if ($change_average == $today_overall_change) {
                                                            echo "the same as the last 24h";
                                                        } else {
                                                            echo "<a style='color: #7eff76'>less</a> than today";
                                                        }

                                                        if ($material_item->get_id_material() == 1) {
                                                            crystal_info($material_item, $change_average);
                                                        }
                                                    }
                                                    ?>

                                                    <br>
                                                    <button type="button" class="btn btn-primary"
                                                            data-toggle="modal"
                                                            data-target="#Modal_<?= $i ?>_<?= str_replace(' ', '', $history_time_span->get_time_frame()->getCardTitle()); ?>"
                                                            style="margin-top: 20px">
                                                        More info
                                                    </button>
                                                    <?php
                                                    require "vue/material/material_stats/info_modal.php"
                                                    ?>
                                                </div>
                                            </div>
                                        </div>
                                        <?php
                                    }
                                    ?>
                                </div>

                                <div class="row">
                                    <div class="col-md-10"></div>
                                    <div class="col-md-1 dropup">
                                        <input type="checkbox"
                                               class="btn-check"
                                               id="btn-check-outlined_<?= $i ?>"
                                               data-bs-toggle="collapse"
                                               data-bs-target="#collapse<?= $i ?>"
                                               aria-expanded="false"
                                               aria-controls="collapse<?= $i ?>">


                                        <label class="btn btn-outline-success dropdown-toggle"
                                               for="btn-check-outlined_<?= $i ?>">Close statistics</label><br>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <?php
            }
            ?>
        </div>
        <?php
    }
}
?>