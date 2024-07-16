<?php
// Buat koneksi ke database
$host = 'localhost';
$username = "root";
$password = "";
$database = "dkidsco1_ddim_2024";
$base_url = "https://my.ddim.tech";

try {
  $koneksi = new PDO("mysql:host=$host;dbname=$database;charset=utf8mb4", $username, $password);
  $koneksi->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
  die("Connection failed: " . $e->getMessage());
}

$hari_ini = date("Y-m-d");
date_default_timezone_set('Asia/Jakarta');

$arrayStatusPesanan[6] = "Masih Belanja";
$arrayStatusPesanan[4] = "Belum Bayar";
$arrayStatusPesanan[5] = "Menunggu Konfirmasi";
$arrayStatusPesanan[1] = "Diproses";
$arrayStatusPesanan[2] = "Selesai";
$arrayStatusPesanan[3] = "Batal";


$arrayWarnaPesanan[6] = "badge-secondary";
$arrayWarnaPesanan[4] = "badge-danger";
$arrayWarnaPesanan[5] = "badge-info";
$arrayWarnaPesanan[1] = "badge-warning";
$arrayWarnaPesanan[2] = "badge-success";
$arrayWarnaPesanan[3] = "badge-primary";

$arrayIconPesanan[6] = "<i class='fas fa-shopping-cart'></i>";
$arrayIconPesanan[4] = "<i class='far fa-credit-card'></i>";
$arrayIconPesanan[5] = "<i class='far fa-clock'></i>";
$arrayIconPesanan[1] = "<i class='fas fa-cogs'></i>";
$arrayIconPesanan[2] = "<i class='fas fa-check-circle'></i>";
$arrayIconPesanan[3] = "<i class='fas fa-times-circle'></i>";

//session_start();
$user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : false;
$owner_id = isset($_SESSION['owner_id']) ? $_SESSION['owner_id'] : false;