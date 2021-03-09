<div class="bg">
    <div class="container bg">

        <?php
        if (isset($update_valid)){
            if ($update_valid[0]){
                echo "<br><div class=\"alert alert-success\" role=\"alert\">Successfully updated the currency count</div>";
            } else {
                echo "<br><div class=\"alert alert-danger\" role=\"alert\">Something went wrong</div>";
            }
        }
        ?>

        <h1 class="title">Currency: <?=$cur_info["name"] ?></h1>

        <form action="/honkailog/currency/" method=post>


            <select onchange="this.form.submit()" name="cur" class="form-select form-select-lg" aria-label=".form-select-lg example">
                <?php
                foreach ($currencies as $key) {
                    if ($key["id_currency"] == $idcurrency){
                        $sele = "selected";
                    } else {
                        $sele = "";
                    }
                    echo "<option value=\"".$key["id_currency"]."\" ".$sele.">".$key["name"]."</option>"

                ?>
                <?php
                }
                ?>
            </select>



        </form>

        <p>You currently have <?=$timespan_type[0]["current"] ?> <?=$cur_info["name"] ?>s</p>
        <br><br>

        <h2>Update value:</h2><br>

        <form action="/honkailog/currency/" method=post>

            <input name="cur" type="hidden" value="<?=$cur_info["id_currency"] ?>">

            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label"><?=$cur_info["name"] ?> quantity</label>
                <input name="quantity" type="input" class="form-control" value="<?=$timespan_type[0]["current"] ?>">
            </div>
            <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Change</label>
                <textarea name="libchange" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>

            <button type="submit" class="btn btn-primary">Submit</button>


        </form>

        <h1 class="title">Stats</h1>

        <div class="row justify-content-between">
            <?php
            foreach ($timespan_type as $timespan) {
            ?>

                <div class="card text-white <?=$timespan["bg"] ?> col-sm-5" style="width: auto; margin: 10px; padding:15px;">
                    <div class="card-body" style="padding: 5px;">
                        <h5 class="card-title"><?=$timespan["name"] ?></h5>
                        <p class="card-text"><?=$timespan["start"] ?>, you:</p>
                        <ul>
                            <li>Gained <?=$timespan["gain"] ?> <?=$cur_info["name"] ?>s</li>
                            <li>Spent <?=$timespan["loses"] ?> <?=$cur_info["name"] ?>s</li>
                        </ul>
                        Overall, you got <?=$timespan["overall_change"] ?> <?=$cur_info["name"] ?>s during this period.
                        <br> <br>

                        <?php
                        $change_average = $timespan["overall_change_average"];
                        if ($change_average != -1){
                            echo "On average, you got ". $change_average ." ".$cur_info["name"]."s per day. Which is ";

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
    </div>
</div>