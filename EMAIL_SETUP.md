# Email Setup for Quote Requests

This document explains how to set up email functionality for the quote request system.

## Current Implementation

The quote system is currently set up with a mock email service that logs the email content to the console. To make it functional, you need to integrate with a real email service.

## Email Service Options

### Option 1: Backend Integration (Recommended)

Create a backend API endpoint that handles email sending:

1. **Create API endpoint** (`/api/send-quote`):

   ```javascript
   // Example using Express.js and Nodemailer
   app.post("/api/send-quote", async (req, res) => {
     try {
       const { product, customer, timestamp } = req.body;

       // Send email using your preferred service
       await sendEmail({
         to: "sales@yourcompany.com",
         subject: `Quote Request for ${product.name}`,
         html: generateEmailHTML(product, customer, timestamp),
       });

       res.json({ success: true });
     } catch (error) {
       res.status(500).json({ error: "Failed to send email" });
     }
   });
   ```

2. **Update the email service** in `src/services/emailService.ts`:

   ```typescript
   export const sendQuoteRequest = async (
     quoteData: QuoteRequest
   ): Promise<boolean> => {
     try {
       const response = await fetch("/api/send-quote", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(quoteData),
       });

       return response.ok;
     } catch (error) {
       console.error("Error sending quote request:", error);
       return false;
     }
   };
   ```

### Option 2: EmailJS (Client-side)

For a quick setup without a backend:

1. **Install EmailJS**:

   ```bash
   npm install @emailjs/browser
   ```

2. **Set up EmailJS account**:

   - Go to [EmailJS.com](https://www.emailjs.com/)
   - Create an account and set up email service
   - Get your Service ID, Template ID, and Public Key

3. **Update the email service**:

   ```typescript
   import emailjs from "@emailjs/browser";

   export const sendQuoteRequestWithEmailJS = async (
     quoteData: QuoteRequest
   ): Promise<boolean> => {
     try {
       const templateParams = {
         to_email: "sales@yourcompany.com",
         product_name: quoteData.product.name,
         // ... other parameters
       };

       const response = await emailjs.send(
         "YOUR_SERVICE_ID",
         "YOUR_TEMPLATE_ID",
         templateParams,
         "YOUR_PUBLIC_KEY"
       );

       return response.status === 200;
     } catch (error) {
       console.error("Error sending email:", error);
       return false;
     }
   };
   ```

### Option 3: Third-party Services

You can also integrate with services like:

- **SendGrid**
- **Mailgun**
- **AWS SES**
- **Postmark**

## Email Template

The system generates both HTML and text versions of the email with:

- Product information (name, category, description, rating)
- Customer details (name, email, company, phone, quantity)
- Additional message from customer
- Timestamp of the request

## Testing

To test the current implementation:

1. Navigate to a product
2. Click "Add to Quote"
3. Fill out the form
4. Submit the quote request
5. Check the browser console for the generated email content

## Production Setup

For production deployment:

1. Set up your chosen email service
2. Update the email service configuration
3. Test thoroughly with real email addresses
4. Consider adding email validation and spam protection
5. Set up monitoring for failed email deliveries

## Security Considerations

- Validate all form inputs on both client and server side
- Implement rate limiting to prevent spam
- Use environment variables for sensitive configuration
- Consider adding CAPTCHA for additional protection
- Sanitize user input before including in emails
