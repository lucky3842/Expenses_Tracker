<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

$dataFile = 'expense_data.json';

// Handle GET request - Read data
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($dataFile)) {
        echo file_get_contents($dataFile);
    } else {
        // Return default data if file doesn't exist
        echo json_encode([
            'walletBalance' => 94,
            'expenses' => []
        ]);
    }
}

// Handle POST request - Save data
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if ($data !== null) {
        file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT));
        echo json_encode(['success' => true, 'message' => 'Data saved successfully']);
    } else {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Invalid data']);
    }
}
?>
