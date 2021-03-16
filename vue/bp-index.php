<div class="bg">
    <div class="container bg">

        <h1 class="title">Battle pass</h1>

        <form action="/honkailog/bp/" method=post>
            <div class="row">

                <input type="hidden" name="bp_level" value="true">

                <div class="col-md-6">
                    <label class="form-label">BP level</label>
                    <input type="input" class="form-control" name="bp_level" value="<?=$bp_levels->getBPLevel() ?>" />
                </div>

                <div class="col-md-6">
                    <label class="form-label">BP XP</label>
                    <input type="input" class="form-control" name="bp_xp" value="<?=$bp_levels->getBPXP() ?>" />
                </div>

                <!-- TODO: Put it to the right -->
                <div class="d-flex">
                    <button class="btn btn-primary" type="submit" style="">Submit</button>
                </div>
            </div>
        </form>

        <h1 style="margin-top: 20px">Stats:</h1>
        <p>
            Today, you got <?=$bp_levels->get_today_bp() ?> BPs, which is
            <?php
            if ($bp_levels->get_today_bp() < $bp_levels->get_bp_per_day_current()){
                echo "<a style='color: #ffa7a7'>less</a>";
            } elseif($bp_levels->get_today_bp() < $bp_levels->get_bp_per_day_current()){
                echo "<a style='color: #7eff76'>equal</a>";
            } else{
                echo "<a style='color: #7eff76'>more</a>";
            }
            ?>
            than the BP per day (<?=$bp_levels->get_bp_per_day_current() ?> BP) needed to finish it with the current count.<br>
        </p>
    </div>
</div>