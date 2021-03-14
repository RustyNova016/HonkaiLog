<div class="bg">
    <div class="container bg">

        <h1 class="title">Battle pass</h1>

        <form action="/honkailog/bp/" method=post>
            <div class="row">

                <input type="hidden" name="bp_level" value="true">

                <!-- TODO: Put current level as default -->
                <div class="col-md-6">
                    <label class="form-label">BP level</label>
                    <input type="input" class="form-control" name="bp_level" value="<?=$bp_levels->getBPLevel() ?>" />
                </div>

                <!-- TODO: Put current xp as default -->
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

    </div>
</div>