// Email service for sending quote requests
// In a real application, this would integrate with your backend or email service

export interface QuoteRequest {
  product: {
    id: number;
    name: string;
    image: string;
    category: string;
    rating: number;
    reviewCount: number;
    description?: string;
  };
  customer: {
    name: string;
    email: string;
    company: string;
    phone: string;
    quantity: number;
    message: string;
  };
  timestamp: string;
}

export const sendQuoteRequest = async (
  quoteData: QuoteRequest
): Promise<boolean> => {
  try {
    // In a real application, you would send this to your backend:
    // const response = await fetch('/api/send-quote', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(quoteData)
    // });

    // For demonstration purposes, we'll simulate the email content
    const emailContent = generateEmailContent(quoteData);
    console.log("Email Content:", emailContent);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // In a real implementation, you might use services like:
    // - EmailJS (client-side)
    // - SendGrid
    // - Nodemailer (backend)
    // - AWS SES

    return true;
  } catch (error) {
    console.error("Error sending quote request:", error);
    return false;
  }
};

const generateEmailContent = (quoteData: QuoteRequest) => {
  const { product, customer } = quoteData;

  return {
    to: "sales@yourcompany.com", // Your company email
    subject: `Quote Request for ${product.name} - ${customer.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
          New Quote Request
        </h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #007bff; margin-top: 0;">Product Information</h3>
          <p><strong>Product:</strong> ${product.name}</p>
          <p><strong>Category:</strong> ${product.category}</p>
          <p><strong>Description:</strong> ${
            product.description || "No description provided"
          }</p>
          <p><strong>Rating:</strong> ${product.rating}/5 stars (${
      product.reviewCount
    } reviews)</p>
        </div>
        
        <div style="background-color: #e9ecef; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #007bff; margin-top: 0;">Customer Information</h3>
          <p><strong>Name:</strong> ${customer.name}</p>
          <p><strong>Email:</strong> ${customer.email}</p>
          <p><strong>Company:</strong> ${customer.company || "Not provided"}</p>
          <p><strong>Phone:</strong> ${customer.phone || "Not provided"}</p>
          <p><strong>Quantity Requested:</strong> ${customer.quantity}</p>
          ${
            customer.message
              ? `<p><strong>Additional Message:</strong><br>${customer.message}</p>`
              : ""
          }
        </div>
        
        <div style="background-color: #d1ecf1; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; color: #0c5460;">
            <strong>Request Date:</strong> ${new Date(
              quoteData.timestamp
            ).toLocaleString()}
          </p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6;">
          <p style="color: #6c757d; font-size: 14px;">
            This quote request was submitted through your corporate gifts website.
            Please respond to the customer within 24 hours.
          </p>
        </div>
      </div>
    `,
    text: `
New Quote Request

Product Information:
- Product: ${product.name}
- Category: ${product.category}
- Description: ${product.description || "No description provided"}
- Rating: ${product.rating}/5 stars (${product.reviewCount} reviews)

Customer Information:
- Name: ${customer.name}
- Email: ${customer.email}
- Company: ${customer.company || "Not provided"}
- Phone: ${customer.phone || "Not provided"}
- Quantity Requested: ${customer.quantity}
${customer.message ? `- Additional Message: ${customer.message}` : ""}

Request Date: ${new Date(quoteData.timestamp).toLocaleString()}

This quote request was submitted through your corporate gifts website.
Please respond to the customer within 24 hours.
    `,
  };
};

// Alternative implementation using EmailJS (uncomment and configure if needed)
/*
import emailjs from '@emailjs/browser';

export const sendQuoteRequestWithEmailJS = async (quoteData: QuoteRequest): Promise<boolean> => {
  try {
    const templateParams = {
      to_email: 'sales@yourcompany.com',
      product_name: quoteData.product.name,
      product_category: quoteData.product.category,
      product_description: quoteData.product.description || 'No description provided',
      customer_name: quoteData.customer.name,
      customer_email: quoteData.customer.email,
      customer_company: quoteData.customer.company || 'Not provided',
      customer_phone: quoteData.customer.phone || 'Not provided',
      quantity: quoteData.customer.quantity,
      message: quoteData.customer.message || 'No additional message',
      request_date: new Date(quoteData.timestamp).toLocaleString(),
    };

    const response = await emailjs.send(
      'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
      'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
      templateParams,
      'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
    );

    return response.status === 200;
  } catch (error) {
    console.error('Error sending email with EmailJS:', error);
    return false;
  }
};
*/
