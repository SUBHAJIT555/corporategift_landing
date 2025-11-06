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
    $range = 'New Landing Page';
    $formType = strtolower($input['formType'] ?? 'contact');
    $serverIp = $_SERVER['REMOTE_ADDR'] ?? 'unknown';

    // --- Get current row count to calculate Sr No ---
    $existingRows = $sheets->spreadsheets_values->get($spreadsheetId, $range)->getValues();
    $srNo = is_array($existingRows) ? count($existingRows) - 1 : 0;

    // --- Default blank row matching columns (A→L) ---
    $row = [
        $srNo + 1,        // Sr No
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
    $result = $sheets->spreadsheets_values->append($spreadsheetId, $range, $body, $params);

    echo json_encode([
        'success' => true,
        'insertedRow' => $row,
        'updatedRange' => $result->getUpdates()->getUpdatedRange() ?? null
    ]);
} catch (Throwable $e) {
    error_log('❌ Google Sheets sync failed: ' . $e->getMessage());
    echo json_encode(['error' => $e->getMessage()]);
}
