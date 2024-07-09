<?php
include '../helper/koneksi.php';

// Ambil data yang dikirim dari JavaScript
$phone = htmlspecialchars($_POST['phone']);

try {
    // Cek apakah nomor telepon sudah terdaftar di tabel pelanggan
    $query = $koneksi->prepare("SELECT * FROM user WHERE wa_login = :phone");
    $query->bindParam(':phone', $phone);
    $query->execute();
    $result = $query->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        $user_id = $result['user_id'];
        $wa_login = $result['wa_login'];
        $owner_id = $result['owner_id'];
        $emailUser = $result['email_login'];
        $nama_apk = 'New EEI';

        session_start();
        $_SESSION['wa_login'] = $result['wa_login'];
        $_SESSION['email_login'] = $result['email_login'];
        $_SESSION['owner_id'] = $result['owner_id'];
        $_SESSION['nama'] = $result['nama'];
        $_SESSION['inisial_nama'] = $result['inisial_nama'];

        // Nomor telepon terdaftar, generate OTP dan kirimkan via WhatsApp
        $otp = mt_rand(123456, 999999);
        $wa_message = "Berikut OTP login Anda : " . $otp;
        $key = "f4fee0d27cfdb7d3146c8372d702861b2c3f64274839b2e4"; // key jangan diganti, ini key punya katib
        $url_chat = "http://116.203.92.59/api/send_message"; // url chat juga jangan di ganti
        $waktu_saat_ini = date("Y-m-d H:i:s");
        // $res = 'pending';
        $res = 'success';

        // Masukkan atau perbarui data ke tabel log_login
        $queryLogLogin = $koneksi->prepare("INSERT INTO log_login (owner_id, user_id, phone, otp) VALUES (:owner_id, :user_id, :phone, :otp) ON DUPLICATE KEY UPDATE otp = :otp");
        $queryLogLogin->bindParam(':owner_id', $owner_id);
        $queryLogLogin->bindParam(':user_id', $user_id);
        $queryLogLogin->bindParam(':phone', $phone);
        $queryLogLogin->bindParam(':otp', $otp);
        $queryLogLogin->execute();

        // Kode API sending WA
        $data = array(
            "phone_no" => $phone,
            "key"      => $key,
            "message"  => $wa_message,
        );
        $data_string = json_encode($data);

        $ch = curl_init($url_chat);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_VERBOSE, 0);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 0);
        curl_setopt($ch, CURLOPT_TIMEOUT, 360);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt(
            $ch,
            CURLOPT_HTTPHEADER,
            array(
                'Content-Type: application/json',
                'Content-Length: ' . strlen($data_string),
            )
        );
        $resWoowa = curl_exec($ch);
        curl_close($ch);

        //log_notif
        // $log_notif = $koneksi->prepare("INSERT INTO log_notifikasi_wa VALUES('','1','1','0','$waktu_saat_ini','WA Customer','$wa_message','$phone','$res', '$resWoowa')");
        // $log_notif->execute();

        // cek apakah repon woowa offline?

            if ($resWoowa !== 'success') {

                $to = $emailUser;
                $subject = 'Kode Verifikasi OTP ' . $nama_apk;
                $headers = "From: no-reply@katib.id\r\n";
                $headers .= "Reply-To: no-reply@katib.id\r\n";
                $headers .= "Content-type: text/html\r\n";
                $email_otp = $otp;

                $message = "
            <html>
            <head>
                <title>Kode Verifikasi OTP</title>
            </head>
            <body>
                <h2>Berikut Kode OTP Login pada Aplikasi $nama_apk Anda : $email_otp</h2>
            </body>
            </html>";
            
            mail($to, $subject, $message, $headers);

                // if (mail($to, $subject, $message, $headers)) {
                //     echo 'Email sent successfully.';
                // } else {
                //     echo 'Error sending email.';
                // }
            }

        // Periksa apakah pesan berhasil dikirim
        if ($resWoowa !== 'success') {
            // Jika gagal, atur status respons ke 'error'
            $response = array(
                'status' => 'success',
                'message' => 'OTP sudah dikirim ke Email ' . $emailUser . ', silahkan cek email Anda!'
            );
        } else {
            // Jika berhasil, atur status respons ke 'success'
            $response = array(
                'status' => 'success',
                'message' => 'OTP sudah dikirim ke WhatsApp ' . $wa_login . ', silahkan cek WhatsApp Anda!'
            );
        }
    } else {
        // Jika gagal, atur status respons ke 'error'
        $response = array(
            'status' => 'error',
            'message' => 'Nomor WhatsApp yang Anda masukkan tidak terdaftar.'
        );
    }
    

    

} catch (PDOException $e) {
    // Kirim respons error ke JavaScript
    echo json_encode(['status' => 'error', 'message' => 'Terjadi kesalahan saat mengirim OTP: ' . $e->getMessage()]);
}
        // Return the JSON-encoded response
    header('Content-Type: application/json');
    echo json_encode($response);
$koneksi = null;
