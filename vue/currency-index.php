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


    </div>
</div>