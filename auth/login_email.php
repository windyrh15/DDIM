
<div class="card-body">
    <div class="text-center mb-4"><img src="https://office.katib.id/assets/img/18/DDiM Logo Official.png" alt="logo" width="65%"></div>
    <form method="POST" action="#" class="needs-validation" novalidate="">
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" name="email" tabindex="1" required autofocus autocomplete="off">
            <div class="invalid-feedback">
                Silahkan masukan alamat email
            </div>
        </div>

        <div class="form-group">
            <div class="d-block">
                <label for="password" class="control-label">Password</label>
            </div>
            <input id="password-pc" type="password" class="form-control" name="password" tabindex="2" required>
            <span id="eye-pc" onclick="changePc()"><i class="glyphicon glyphicon-eye-open"></i></span>
            <div class="invalid-feedback">
                Silahkan masukan password
            </div>
        </div>
        <div class="form-group">
            <button type="submit" name="login" class="btn btn-eei btn-lg btn-block cl-white" tabindex="4">
                Login
            </button>
        </div>
    </form>
</div>