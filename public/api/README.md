# PHP API Setup

This folder contains the PHP API endpoint for saving form data to Google Sheets.

## File Structure

```
public/api/
├── save-to-sheet.php    # Main API endpoint
├── .htaccess           # Apache configuration (if using Apache)
└── README.md           # This file
```

## Important Notes

⚠️ **Deployment Consideration**: This PHP file is in the `public` folder, but for production, you may need to:
- Deploy it to a PHP-capable server (not just static hosting)
- Ensure the server can execute PHP files
- Install Composer dependencies on the server

## Setup Steps

1. **Install Composer dependencies** (on your server):
   ```bash
   composer require google/apiclient
   ```
   This creates a `vendor/` folder in your project root.

2. **Get Google Service Account Credentials**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a service account and download the JSON key
   - Save it as `credentials.json` in the project root (one level up from public/)

3. **Update the Spreadsheet ID**:
   - Open `save-to-sheet.php`
   - Replace `YOUR_SHEET_ID` with your actual Google Sheet ID
   - The Sheet ID is in the URL: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`

4. **Share Google Sheet**:
   - Open your Google Sheet
   - Click "Share" and add the service account email (found in `credentials.json` as `client_email`)
   - Give it "Editor" permissions

5. **Test the API**:
   ```bash
   curl -X POST http://your-domain.com/api/save-to-sheet.php \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@example.com","message":"Test message"}'
   ```

## File Paths

The PHP file expects:
- `vendor/` folder at: `__DIR__ . '/../../vendor/autoload.php'` (project root)
- `credentials.json` at: `__DIR__ . '/../../credentials.json'` (project root)

If your server structure is different, update these paths in `save-to-sheet.php`.

## Security Notes

- ✅ `credentials.json` is already in `.gitignore` - never commit it
- ✅ The API only accepts POST requests
- ✅ CORS is enabled for frontend requests
- ⚠️ In production, consider restricting CORS to your domain only
- ⚠️ Consider adding rate limiting to prevent abuse

