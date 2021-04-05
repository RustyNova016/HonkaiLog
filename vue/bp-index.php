<?php
    /**
     * @var BP_progress $bp_db
     */
?>

<h1 class="title">Battle pass</h1>

<form action="/honkailog/bp/" method=post>
    <div class="row">

        <input type="hidden" name="bp_level" value="true">

        <div class="col-md-6">
            <label class="form-label">BP level</label>
            <input type="input" class="form-control" name="bp_level"
                   value="<?=$bp_db->get_current_bp_level()?>"/>
        </div>

        <div class="col-md-6">
            <label class="form-label">BP XP</label>
            <input type="input" class="form-control" name="bp_xp" value="<?=$bp_db->get_current_bp_xp()?>"/>
        </div>

        <!-- TODO: Put it to the right -->
        <div style="margin-top: 20px; margin-left: 20px">
            <button class="btn btn-primary" type="submit" style="">Submit</button>
        </div>
    </div>
</form>

<h1 style="margin-top: 20px">Stats:</h1>
<p>
    Today, you got <?=$bp_db->get_today_bp()?> BPs.
    The current BP per day needed to finish it is:
</p>
<ul>
    <li>Vanguard BP: <?=$bp_db->get_bp_per_day_left("vanguard")?>BP/day</li>
    <li>Knight BP: <?=$bp_db->get_bp_per_day_left("knight")?>BP/day</li>
    <li>Paladin BP: <?=$bp_db->get_bp_per_day_left("paladin")?>BP/day</li>
</ul>