<?php
include_once("helper/koneksi.php");

if (isset($_POST['login'])) {
    $email = addslashes($_POST['email']);
    $password = md5(addslashes($_POST['password']));
    $email = htmlspecialchars($email);
    $password = htmlspecialchars($password);

    try {
        $sql = "SELECT * FROM user WHERE email = :email AND password = :password";
        $stmt = $koneksi->prepare($sql);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $password);
        $stmt->execute();

        $count = $stmt->rowCount();
        if ($count == 1) {
            $row = $stmt->fetch();
            session_start();
            $_SESSION['user_id'] = $row['user_id'];
            $_SESSION['wa_login'] = $row['wa_login'];
            $_SESSION['email_login'] = $row['email_login'];
            $_SESSION['owner_id'] = $row['owner_id'];
            $_SESSION['nama'] = $row['nama'];
            $_SESSION['inisial_nama'] = $row['inisial_nama'];
            header('Location: index.php');
            return;
        } else {
            echo "<br><div class='bg-danger text-white shadow'>
                          <div class='card-body'>
                          Mohon maaf, email atau password yang kamu gunakan kurang tepat.
                          </div></div>";
        }
    } catch (PDOException $e) {
        echo $e->getMessage();
    }
}

$customjs = filemtime("auth/verifWa.js");

?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no" name="viewport">
    <title>Login &mdash; PT. DDiM</title>
    <link rel="icon" href="https://office.katib.id/assets/img/18/DDiM Logo Official.png" sizes="32x32" />
    <link rel="icon" href="https://office.katib.id/assets/img/18/DDiM Logo Official.png" sizes="192x192" />

    <!-- General CSS Files -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link href="https://fonts.googleapis.com/css2?family=Audiowide&display=swap" rel="stylesheet">

    <!-- CSS Libraries -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-social/5.1.1/bootstrap-social.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/summernote@0.8.11/dist/summernote-bs4.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/owl-carousel/1.3.3/owl.carousel.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.css">


    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
    <link rel="stylesheet" href="https://office.katib.id/assets/vendor/datatables/DataTables-1.10.22/css/dataTables.bootstrap4.min.css">

    <link rel="stylesheet" href="https://office.katib.id/assets/vendor/select2/dist/css/select2.min.css">
    <link rel="stylesheet" href="https://office.katib.id/assets/vendor/bootstrap-tagsinput/dist/bootstrap-tagsinput.css">
    <link rel="stylesheet" href="https://office.katib.id/assets/vendor/jquery-selectric/public/selectric.css">
    <link rel="stylesheet" href="https://office.katib.id/assets/vendor/datatables/Select-1.3.1/css/select.bootstrap4.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11.0.18/dist/sweetalert2.min.css">

    <!-- Font -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@600&display=swap" rel="stylesheet">

    <!-- Template CSS -->
    <link rel="stylesheet" href="https://office.katib.id/assets/css/style.css">
    <link rel="stylesheet" href="https://office.katib.id/assets/css/components.css">
    <link rel="stylesheet" href="assets/css/login.css">

    <style>
        body {
            background-image: url('assets/img/100/bg-login.jpeg');
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            height: 100%;
        }

        #eye {
            position: relative;
            z-index: 1;
            left: 90%;
            top: -30px;
            cursor: pointer;
        }

        #eye-pc {
            position: relative;
            z-index: 1;
            left: 90%;
            top: -30px;
            cursor: pointer;
        }
        .container {
                position: relative;
                height: 200px;
            }

            .card {
                margin: 0;
                position: absolute;
                top: 170%;
                left: 50%;
                -ms-transform: translate(-50%, -50%);
                transform: translate(-50%, -50%);
            }
    </style>
</head>

<body>
    <div id="app">
        <section class="section">
            <div class="container">
                <div class="card card-primary col-11 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
                    <!-- header tabulasi -->
                    <ul class="nav nav-tabs justify-content-center" id="loginTab" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" id="loginEmailTab" data-toggle="tab" href="#loginEmail" role="tab" aria-controls="loginEmail" aria-selected="true"><i class="far fa-envelope  fa-lg"></i> <b>Email</b></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="loginWATab" data-toggle="tab" href="#loginWA" role="tab" aria-controls="loginWA" aria-selected="false"><i class="fab fa-whatsapp  fa-lg"></i> <b>WhatsApp</b></a>
                        </li>
                    </ul>
                    <!-- content tabulasi -->
                    <div class="tab-content" id="loginTabContent">
                        <!-- Tab untuk login dengan email -->
                        <div class="tab-pane fade show active in" id="loginEmail" role="tabpanel" aria-labelledby="loginEmailTab">
                            <?php include_once("auth/login_email.php"); ?>
                        </div>
                        <!-- Tab untuk login dengan WhatsApp -->
                        <div class="tab-pane fade" id="loginWA" role="tabpanel" aria-labelledby="loginWATab">
                            <?php include_once("auth/login_wa.php"); ?>
                        </div>
                    </div>
                </div>
        </section>
    </div>


    <!-- General JS Scripts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.2.0.min.js" integrity="sha256-JAW99MJVpJBGcbzEuXk4Az05s/XyDdBomFqNlM3ic+I=" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-1.11.0.min.js" integrity="sha256-spTpc4lvj4dOkKjrGokIrHkJgNA0xMS98Pw9N7ir9oI=" crossorigin="anonymous"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.nicescroll/3.7.6/jquery.nicescroll.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script>
    <script src="https://office.katib.id/assets/js/stisla.js"></script>


    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-sparklines/2.1.2/jquery.sparkline.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/owl-carousel/1.3.3/owl.carousel.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.18/summernote.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
    <script src="https://office.katib.id/assets/vendor/datatables/DataTables-1.10.22/js/dataTables.bootstrap4.min.js"></script>
    <script src="https://office.katib.id/assets/vendor/datatables/Select-1.3.1/js/dataTables.select.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.js"></script>
    <script src="https://office.katib.id/assets/vendor/bootstrap-tagsinput/dist/bootstrap-tagsinput.min.js"></script>
    <script src="https://office.katib.id/assets/vendor/select2/dist/js/select2.full.min.js"></script>
    <script src="https://office.katib.id/assets/vendor/jquery-selectric/public/jquery.selectric.min.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.0.18/dist/sweetalert2.min.js"></script>

    <script src="https://office.katib.id/assets/js/scripts.js"></script>
    <script src="auth/verifWa.js?v=<?= $customjs; ?>"></script>

    <script type="text/javascript">
        function change() {
            var x = document.getElementById('password').type;

            if (x == 'password') {
                document.getElementById('password').type = 'text';
                document.getElementById('eye').innerHTML = '<i class="glyphicon glyphicon-eye-close"></i>';
            } else {
                document.getElementById('password').type = 'password';
                document.getElementById('eye').innerHTML = '<i class="glyphicon glyphicon-eye-open"></i>';
            }
        }
    </script>
    <script type="text/javascript">
        function changePc() {
            var x = document.getElementById('password-pc').type;

            if (x == 'password') {
                document.getElementById('password-pc').type = 'text';
                document.getElementById('eye-pc').innerHTML = '<i class="glyphicon glyphicon-eye-close"></i>';
            } else {
                document.getElementById('password-pc').type = 'password';
                document.getElementById('eye-pc').innerHTML = '<i class="glyphicon glyphicon-eye-open"></i>';
            }
        }
    </script>

</body>

</html>