<div class="bg">
    <div class="container bg">

        <h1 class="title">User identification</h1>

        <div class="content-card">
            <form method="POST">
                <div class="col-auto">
                    <label>Username</label>
                    <input name="username" type="text" class="form-control form-control-lg" id="honkailog_user"
                           placeholder="Username"
                           required>
                </div>
                <div class="col-auto" style="margin-top: 20px">
                    <label>Password</label>
                    <input name="password" type="password" class="form-control form-control-lg"
                           id="honkailog_user_password"
                           placeholder="Password" required>
                </div>
                <div class="col-auto" style="margin-top: 20px">
                    <button type="submit" class="btn btn-primary mb-3 btn-lg">Confirm</button>
                </div>
            </form>
        </div>

        <div class="content-card">
            <h3>No account?</h3>
            <a href="/honkailog/user/add" class="btn btn-primary">Register</a>
        </div>
    </div>
</div>

