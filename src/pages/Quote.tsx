import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { FaCheckCircle } from "react-icons/fa";
import { MdArrowBack, MdSend } from "react-icons/md";

interface Product {
  id: number | string;
  name: string;
  image: string;
  category?: string;
  description?: string;
}

interface QuoteFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address_1: string;
  city: string;
  quantity: number;
  note?: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
}

const Quote = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product as Product | undefined;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<QuoteFormData>({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      address_1: "",
      city: "",
      quantity: 1,
      note: "",
      utm_source: "",
      utm_medium: '',
      utm_campaign: '',
      utm_term: '',
      utm_content: '',
    },
  });

  useEffect(() => {
    if (!product && typeof window !== "undefined") {
      // Redirect only on client
      navigate("/");
    }
  }, [product, navigate]);

  const onSubmit = async (data: QuoteFormData) => {
    if (!product) return;
    await fetch('/api/save-to-sheet.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formType: 'order',
        name: data.first_name + ' ' + data.last_name,
        contact_number: data.phone,
        email: data.email,
        note: data.note,
        utm_source: data.utm_source,
        utm_medium: data.utm_medium,
        utm_campaign: data.utm_campaign,
        utm_term: data.utm_term,
        utm_content: data.utm_content,
      }),
    });
    try {
      const payload = {
        billing: {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          phone: data.phone,
          address_1: data.address_1,
          city: data.city,
          country: "AE",
        },
        items: [{ product_id: product.id, quantity: data.quantity }],
        note: data.note,
      };

      const res = await fetch(
        "https://corporategiftsdubaii.ae/wp-json/custom/v1/quote",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error("Failed to send quote");

      navigate("/thank-you");
      reset();
    } catch (err) {
      console.error(err);
      if (typeof window !== "undefined") {
        alert("Error submitting quote request. Please try again.");
      }
    }
  };

  // 🧩 During React-Snap prerender, location.state is undefined
  // Just render a placeholder to avoid hydration mismatch
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        <p>Loading quote form…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-background pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-text-secondary mb-4">
            Request Your Quote
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Fill out your details below and our team will contact you within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Product Info */}
          <div className="xl:col-span-1">
            <div className="sticky top-32">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <div className="w-1 h-8 bg-primary mr-3"></div> Product Details
                  </h2>

                  <div className="space-y-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="rounded-xl w-full aspect-square object-cover"
                    />
                    <div>
                      <h3 className="text-xl font-bold">{product.name}</h3>
                      {product.category && (
                        <span className="inline-block mt-2 px-3 py-1 text-sm bg-primary/10 text-primary rounded-full">
                          {product.category}
                        </span>
                      )}
                      {product.description && (
                        <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                          {product.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quote Form */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-1 h-8 bg-primary mr-3"></div> Quote Information
                </h2>

                {isSubmitSuccessful && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                    <FaCheckCircle className="text-green-600 text-xl" />
                    <p className="text-green-700">
                      Quote request sent successfully! Our team will contact you shortly.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* UTM Source */}
                  <input type="hidden" {...register("utm_source")} />
                  {/* UTM Medium */}
                  <input type="hidden" {...register("utm_medium")} />
                  {/* UTM Campaign */}
                  <input type="hidden" {...register("utm_campaign")} />
                  {/* UTM Term */}
                  <input type="hidden" {...register("utm_term")} />
                  {/* UTM Content */}
                  <input type="hidden" {...register("utm_content")} />
                  {/* Name */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        First Name *
                      </label>
                      <input
                        {...register("first_name", { required: true })}
                        className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary/30 focus:border-primary bg-gray-50"
                      />
                      {errors.first_name && (
                        <p className="text-red-600 text-xs mt-1">Required</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Last Name *
                      </label>
                      <input
                        {...register("last_name", { required: true })}
                        className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary/30 focus:border-primary bg-gray-50"
                      />
                      {errors.last_name && (
                        <p className="text-red-600 text-xs mt-1">Required</p>
                      )}
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Email *
                      </label>
                      <input
                        type="email"
                        {...register("email", { required: true })}
                        className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary/30 focus:border-primary bg-gray-50"
                      />
                      {errors.email && (
                        <p className="text-red-600 text-xs mt-1">Required</p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        {...register("phone", {
                          required: true,
                          pattern: /^[0-9]{9}$/,
                        })}
                        placeholder="50XXXXXXX"
                        className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary/30 focus:border-primary bg-gray-50"
                      />
                      {errors.phone && (
                        <p className="text-red-600 text-xs mt-1">
                          Enter 9-digit UAE number
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Address & City */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Address *
                      </label>
                      <input
                        {...register("address_1", { required: true })}
                        className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary/30 focus:border-primary bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        City *
                      </label>
                      <input
                        {...register("city", { required: true })}
                        className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary/30 focus:border-primary bg-gray-50"
                      />
                    </div>
                  </div>

                  {/* Quantity */}
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Quantity *
                    </label>
                    <input
                      type="number"
                      min={1}
                      {...register("quantity", { required: true, min: 1 })}
                      className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary/30 focus:border-primary bg-gray-50"
                    />
                  </div>

                  {/* Note */}
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Additional Notes
                    </label>
                    <textarea
                      rows={4}
                      {...register("note")}
                      placeholder="Any specific requirements or customization?"
                      className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary/30 focus:border-primary bg-gray-50 resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-gradient-to-r from-primary to-blue-600 text-white py-4 px-8 rounded-xl font-semibold hover:from-primary/90 hover:to-blue-600/90 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <MdSend className="text-lg" />
                          <span>Request Quote</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => navigate("/#products")}
                      className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 flex items-center justify-center gap-2"
                    >
                      <MdArrowBack />
                      <span>Back to Products</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quote;
