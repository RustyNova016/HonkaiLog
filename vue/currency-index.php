<div class="bg">
    <div class="container bg">

        <h1 class="title">Currencies</h1>

        <form action="/honkailog/user/" method=get>

            <div class="mb-3">
                <select class="form-select" aria-label="Default select example">
                    <option selected>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
                <button type="submit" class="btn btn-primary">Select currency</button>
            </div>


        </form>

        <form action="/honkailog/currency/" method=post>

            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Crystal quantity</label>
                <input name="quantity" type="input" class="form-control" id="exampleFormControlInput1" placeholder="">
            </div>
            <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Change</label>
                <textarea name="libchange" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>

            <button type="submit" class="btn btn-primary">Submit</button>


        </form>

        <h1 class="title">Stats</h1>

        <div class="row">
            <?php
            foreach ($timespan_type as $times) {
            ?>

            <div class="card text-white bg-success mb-3" style="width: 18rem; margin: 5px;">
              <div class="card-body">
                <h5 class="card-title"><?=$times["name"] ?></h5>
                <p class="card-text"><?=$times["start"] ?>, you:</p>
                  <ul>
                      <li>Gained <?=$times["gain"] ?></li>
                      <li>Lost <?=$times["loses"] ?></li>
                  </ul>
                  Overall, you got <?=$times["overall_change"] ?>
              </div>
            </div>

            <?php
            }
            ?>
        </div>


    </div>
</div>