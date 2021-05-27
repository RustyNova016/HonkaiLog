<?php
    /**
     * @var BP_progress $bp_db
     */
?>

<script src="/honkailog/js/BP_XP.js" defer></script>

<h1 class="title">Battle Pass</h1>

<div class="content-card">

    <form action="/honkailog/bp/" method=post>
        <div class="row">

            <input type="hidden" name="bp_level" value="true">

            <div class="col-md-6">
                <label class="form-label">BP level</label>
                <input type="number"
                       id="BP_level_input"
                       class="form-control"
                       name="bp_level"
                       value="<?=$bp_db->get_current_bp_level()?>"/>
            </div>

            <div class="col-md-6">
                <label class="form-label">BP XP</label>
                <input type="number"
                       id="BP_xp_input"
                       class="form-control"
                       name="bp_xp"
                       value="<?=$bp_db->get_current_bp_xp()?>"/>
            </div>

            <!-- TODO: Put it to the right -->
            <div class="d-grid gap-2" style="margin-top: 20px">
                <button class="btn" type="submit" style="" id="log_bp">Log BP count</button>
            </div>
        </div>
    </form>

</div>

<div class="content-card">
    <h1>Statistics:</h1>

    <div style="padding-left: 10px; margin-top: 20px">
        <p>
            Today, you got <span id="today_bp"></span> BPs.
            The current BP per day needed to finish it is:
        </p>
        <ul>
            <?php
                foreach ($bp_db->get_seasons() as $season) {
            ?>
                <li><?=$season->get_bp_type()?> BP: <span id="<?=$season->get_bp_type()?>_BP_day"></span></li>
            <?php
                }
            ?>
        </ul>
    </div>
</div>
