<div class="bg">
    <div class="container bg">

        <h1 class="title">Add an account</h1>
        <div class="content-card">

            <form action="/honkailog/user/add" method=post>
                <?php
                    if (!(empty($_GET["redirect"]))){
                        echo '<input name="redirect" type="hidden" placeholder='.$_GET["redirect"].'>';
                    }
                ?>

                <input name="action" type="hidden" value="add_info"/>

                <div class="col-auto" style="margin-top: 20px">
                    <label class="forms-labels">Username</label>
                    <input name="username" type="text" class="form-control form-control-lg" id="honkailog_user"
                           placeholder="Username"
                           required>
                </div>

                <div class="col-auto" style="margin-top: 20px">
                    <label class="forms-labels">Password</label>
                    <input name="password" type="password" class="form-control form-control-lg"
                           id="honkailog_user_password"
                           placeholder="Password" required>
                </div>

                <div class="col-auto" style="margin-top: 20px">
                    <label class="forms-labels">Level</label>
                    <input name="level" type="text" class="form-control form-control-lg" id="honkailog_user_level"
                           placeholder="Level" required>
                </div>
                <button type="submit" class="btn btn-primary" style="margin-top: 20px">Submit</button>
            </form>

        </div>
    </div>
</div>
