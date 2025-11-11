<?php
use Google\Client;
use Google\Service\Sheets;

require __DIR__ . '/../vendor/autoload.php';

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    echo json_encode(['error' => 'Invalid payload']);
    exit;
}

try {
    // --- Setup Google Sheets client ---
    $client = new Client();
    $client->setApplicationName('Google Sheets API');
    $client->setScopes([Sheets::SPREADSHEETS]);
    $client->setAuthConfig(__DIR__ . '/../credentials.json');
    $client->setAccessType('offline');

    $sheets = new Sheets($client);

    // --- Config ---
    $spreadsheetId = '11Wt7xxqYmH_j1l1z-kcCQsSe4_5zwz4ggp90-2UohpU';
    $sheetName = 'New Landing Page';
    $formType = strtolower($input['formType'] ?? 'contact');
    $serverIp = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $columnsRange = "'{$sheetName}'!A:L"; // scan only A→L

    // --- Get current row count to calculate Sr No ---
    $existingRows = $sheets->spreadsheets_values->get($spreadsheetId, $columnsRange)->getValues() ?? [];

    // --- Find first empty row in A→L (skip header row 1) ---
    $targetRow = count($existingRows) + 1; // default append after last seen row
    for ($i = 1; $i < count($existingRows); $i++) { // start at row 2 (index 1)
        $rowData = array_pad($existingRows[$i], 12, '');
        $isEmpty = count(array_filter($rowData, fn($c) => trim((string) $c) !== '')) === 0;
        if ($isEmpty) {
            $targetRow = $i + 1; // 1-based row index
            break;
        }
    }


    // --- Sr No = target row - 1 (because row 1 is header) ---
    $srNo = $targetRow - 1;

    // --- Default blank row matching columns (A→L) ---
    $row = [
        $srNo,        // Sr No
        date('Y-m-d H:i:s'), // Date
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '', // C→K placeholders
        $serverIp         // L → Server IP
    ];

    // --- Map based on form type ---
    switch ($formType) {
        case 'quote':
            // A:Sr No | B:Date | C:Company name | D:Name | E:Email | F:Phone | G:Message | H:Form Type | I:Requirements | J:Budget | K:Call time | L:Server
            $row[2] = $input['company_name'] ?? '';
            $row[3] = $input['contact_person'] ?? '';
            $row[4] = $input['email'] ?? '';
            $row[5] = $input['phone'] ?? '';
            $row[7] = 'Quote';
            break;

        case 'callback':
            $row[3] = $input['name'] ?? '';
            $row[5] = $input['phone'] ?? '';
            $row[6] = $input['enquiry_for'] ?? ''; // Message
            $row[7] = 'Callback';
            $row[10] = $input['call_time'] ?? '';
            break;

        case 'order':
            $row[3] = $input['name'] ?? '';
            $row[5] = $input['contact_number'] ?? '';
            $row[4] = $input['email'] ?? '';
            $row[6] = $input['note'] ?? ''; // Message
            $row[7] = 'Order';
            break;

        case 'contact':
        default:
            $row[3] = $input['name'] ?? '';
            $row[4] = $input['email'] ?? '';
            $row[5] = $input['contact_number'] ?? '';
            $row[6] = $input['message'] ?? '';
            $row[7] = 'Contact';
            $row[8] = $input['requirements'] ?? '';
            $row[9] = $input['budget_range'] ?? '';
            break;
    }

    // --- Append row ---
    $body = new Sheets\ValueRange(['values' => [$row]]);
    $params = ['valueInputOption' => 'USER_ENTERED'];
    $rangeToWrite = "'{$sheetName}'!A{$targetRow}:L{$targetRow}";
    $result = $sheets->spreadsheets_values->update($spreadsheetId, $rangeToWrite, $body, $params);


    echo json_encode([
        'success' => true,
        'insertedRow' => $row,
        'updatedRange' => $result->getUpdatedRange() ?? null,
        'updatedRows' => $result->getUpdatedRows() ?? null
    ]);
} catch (Throwable $e) {
    error_log('❌ Google Sheets sync failed: ' . $e->getMessage());
    echo json_encode(['error' => $e->getMessage()]);
}
