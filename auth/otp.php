<?php
include '../helper/koneksi.php';
session_start();
$phone = isset($_SESSION['wa_login']) ? $_SESSION['wa_login'] : false;

$otp = isset($_POST['otp']) ? $_POST['otp'] : null;

if ($otp !== null) {
    $otp = htmlspecialchars($otp);

    try {
        $query = $koneksi->prepare("SELECT * FROM log_login WHERE phone = :phone ORDER BY updated_at DESC LIMIT 1");
        $query->bindParam(':phone', $phone);
        $query->execute();
        $result = $query->fetch(PDO::FETCH_ASSOC);

        if ($result) {
            $stored_otp = $result['otp'];
            $user_id = $result['user_id'];
            if ($otp == $stored_otp) {
                $_SESSION['user_id'] = $result['user_id'];
                $response = array(
                    'status' => 'success',
                    'message' => 'Verifikasi OTP Sesuai'
                );
            } else {
                $response = array(
                    'status' => 'error',
                    'message' => 'Verifikasi OTP tidak sesuai!'
                );
            }
        } else {
            $response = array(
                'status' => 'error',
                'message' => 'Data OTP tidak ditemukan'
            );
        }
    } catch (PDOException $e) {
        $response = array(
            'status' => 'error',
            'message' => 'Terjadi kesalahan saat memverifikasi OTP: ' . $e->getMessage()
        );
    }
} else {
    $response = array(
        'status' => 'error',
        'message' => 'Data OTP tidak ditemukan'
    );
}

// Return the JSON-encoded response
header('Content-Type: application/json');
echo json_encode($response);
$koneksi = null;
