<?php
// Path ke file JSON
$filePath = 'delidummy.json';

// Baca input JSON dari request body
$inputJSON = file_get_contents('php://input');
$newData = json_decode($inputJSON, true);

// Baca konten file JSON yang ada
$jsonData = file_get_contents($filePath);
$dataArray = json_decode($jsonData, true);

// Tambahkan data baru ke array
$dataArray['data'][] = $newData;

// Encode kembali ke JSON dan simpan ke file
file_put_contents($filePath, json_encode($dataArray, JSON_PRETTY_PRINT));

// Kirim response
header('Content-Type: application/json');
echo json_encode(['message' => 'Data added successfully']);
