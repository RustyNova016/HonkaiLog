<h1 class="title">Add an account</h1>

<form action="/honkailog/user/add" method=post>

    <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Username</label>
        <input name="name" type="input" class="form-control" id="exampleInputPassword1">
        <label for="exampleInputPassword1" class="form-label">Level</label>
        <input name="level" type="input" class="form-control" id="exampleInputPassword1">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input name="password" type="input" class="form-control" id="exampleInputPassword1">
    </div>

    <button type="submit" class="btn btn-primary">Submit</button>
</form>
