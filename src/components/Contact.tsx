import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useUTMTracking } from "../hooks/useUTMTracking";

const budgetOptions = [
  { label: "<AED 1,000", value: "<AED 1,000" },
  { label: "AED 1,000-AED 5,000", value: "AED 1000-5000" },
  { label: "AED 5,000-AED 10,000", value: "AED 5000-10000" },
  { label: "AED 10,000-AED 20,000", value: "AED 10000-20000" },
  { label: "AED 20,000-AED 50,000", value: "AED 20,000-AED 50,000" },
  { label: ">AED 50,000", value: ">AED 50000" },
];

type FormData = {
  name: string;
  contact: string;
  email: string;
  requirements: string;
  budget: string;
  additionalMessage: string;
  privacy: boolean;
  formType: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
};

export default function ContactForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      contact: "+971 ",
      email: "",
      requirements: "",
      budget: "",
      additionalMessage: "",
      privacy: false,
      formType: "CONTACT",
      utm_source: "",
      utm_medium: '',
      utm_campaign: '',
      utm_term: '',
      utm_content: '',
    },
  });


  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null);
  const [message, setMessage] = useState<string>("");

  // UTM Parameter Tracking
  useUTMTracking<FormData>(setValue);

  // Keep +971 formatting logic
  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    let digitsOnly = raw.replace(/\D/g, "");
    if (digitsOnly.startsWith("971")) {
      digitsOnly = digitsOnly.slice(3);
    }
    const localNineDigits = digitsOnly.slice(0, 9);
    const formatted =
      localNineDigits.length > 0 ? `+971 ${localNineDigits}` : "+971 ";
    setValue("contact", formatted, { shouldDirty: true, shouldValidate: true });
  };

  const validateUaeNumber = (value: string) => {
    const valid = /^\+971\s?\d{9}$/.test(value.trim());
    return valid || "Please enter a valid number";
  };

  // Helper function to remove space after +971
  const formatPhoneNumber = (phone: string): string => {
    return phone.replace(/^(\+971)\s+/, '$1');
  };

  // 🔹 Updated submit to FluentForm API
  const onSubmit = async (data: FormData) => {
    setSubmitStatus(null);

    // Remove space after +971 before submission
    const formattedPhone = formatPhoneNumber(data.contact);
    await fetch('/api/save-to-sheet.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formType: 'contact',
        name: data.name,
        contact_number: formattedPhone,
        email: data.email,
        requirements: data.requirements,
        budget_range: data.budget,
        message: data.additionalMessage,
        utm_source: data.utm_source,
        utm_medium: data.utm_medium,
        utm_campaign: data.utm_campaign,
        utm_term: data.utm_term,
        utm_content: data.utm_content,
      }),
    });

    try {
      // Remove space after +971 before submission
      const formattedPhone = formatPhoneNumber(data.contact);

      await fetch('/api/save-to-sheet.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'contact',
          name: data.name,
          contact_number: formattedPhone,
          email: data.email,
          requirements: data.requirements,
          budget_range: data.budget,
          message: data.additionalMessage,
        }),
      });

      const response = await fetch(
        "https://staging.corporategiftsdubaii.ae/wp-json/fluentform/v1/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            form_id: 6,
            data: {
              name: data.name,
              phone: formattedPhone,
              email: data.email,
              requirements: data.requirements,
              budget: data.budget,
              message: data.additionalMessage || "",
            },
          }),
        }
      );

      const responseData = await response.json();

      if (!response.ok) throw new Error(responseData.message);

      setMessage("✅ Thank you! We'll get in touch with you shortly.");
      setSubmitStatus("success");
      navigate("/thank-you");
      reset();
      setTimeout(() => setSubmitStatus(null), 3000);
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
      setTimeout(() => setSubmitStatus(null), 3000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-5xl mx-auto my-4 sm:my-6 md:my-8 lg:my-10 px-3 sm:px-4 md:px-6 lg:px-8"
      id="contact"
      noValidate
    >
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
      {/* Header Section */}
      <div className="mb-8 sm:mb-10 md:mb-12 text-center">
        <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-text-primary mb-3 sm:mb-4">
          Tell us about your corporate gift needs
        </h2>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto"></div>
      </div>

      <div
        style={{ minHeight: "450px" }}
        className="relative sm:min-h-[550px] md:min-h-[600px] lg:min-h-[650px]"
      >
        {/* ✅ Success */}
        {submitStatus === "success" && (
          <div className="text-center py-8 sm:py-12 md:py-16 absolute inset-0 flex flex-col items-center justify-center px-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg">
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-green-100 rounded-full flex items-center justify-center mb-6 sm:mb-8">
              <div className="text-4xl sm:text-5xl md:text-6xl">
                😊
              </div>
            </div>
            <p className="text-lg sm:text-xl md:text-2xl text-green-700 font-semibold text-center">
              {message}
            </p>
          </div>
        )}

        {/* ❌ Error */}
        {submitStatus === "error" && (
          <div className="text-center py-8 sm:py-12 md:py-16 absolute inset-0 flex flex-col items-center justify-center px-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg">
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-red-100 rounded-full flex items-center justify-center mb-6 sm:mb-8">
              <div className="text-4xl sm:text-5xl md:text-6xl">
                😞
              </div>
            </div>
            <p className="text-lg sm:text-xl md:text-2xl text-red-600 font-semibold mb-1 sm:mb-4 text-center">
              Sorry, something went wrong.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-center text-gray-600">
              {message}
            </p>
          </div>
        )}

        {/* 🔹 Form fields */}
        {submitStatus === null && (
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6 sm:p-8 md:p-10 lg:p-12 space-y-2.5">
            {/* Name */}
            <div>
              <label className="block text-sm sm:text-base md:text-lg font-medium text-gray-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                placeholder="Enter your full name"
                className={`w-full px-4 py-2 sm:py-3 text-base sm:text-lg border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${errors.name
                  ? "border-red-500 focus:ring-red-300 focus:border-red-500"
                  : "border-gray-300 focus:ring-primary/30 focus:border-primary"
                  } bg-white placeholder:text-gray-400`}
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Contact */}
            <div>
              <label className="block text-sm sm:text-base md:text-lg font-medium text-gray-700">
                Contact Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                inputMode="tel"
                maxLength={14}
                {...register("contact", {
                  required: "Contact number is required",
                  validate: validateUaeNumber,
                  onChange: handleContactChange,
                })}
                placeholder="+971 XXXXXXXXX"
                className={`w-full px-4 py-2 sm:py-3 text-base sm:text-lg border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${errors.contact
                  ? "border-red-500 focus:ring-red-300 focus:border-red-500"
                  : "border-gray-300 focus:ring-primary/30 focus:border-primary"
                  } bg-white placeholder:text-gray-400`}
              />
              {errors.contact && (
                <p className="text-sm text-red-500 mt-1">{errors.contact.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm sm:text-base md:text-lg font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                placeholder="name@example.com"
                className={`w-full px-4 py-2 sm:py-3 text-base sm:text-lg border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${errors.email
                  ? "border-red-500 focus:ring-red-300 focus:border-red-500"
                  : "border-gray-300 focus:ring-primary/30 focus:border-primary"
                  } bg-white placeholder:text-gray-400`}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Requirements */}
            <div>
              <label className="block text-sm sm:text-base md:text-lg font-medium text-gray-700 mb-1">
                Requirements <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("requirements", {
                  required: "Requirements are required",
                })}
                placeholder="Describe your corporate gift needs"
                className={`w-full px-4 py-2 sm:py-3 text-base sm:text-lg border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${errors.requirements
                  ? "border-red-500 focus:ring-red-300 focus:border-red-500"
                  : "border-gray-300 focus:ring-primary/30 focus:border-primary"
                  } bg-white placeholder:text-gray-400`}
              />
              {errors.requirements && (
                <p className="text-sm text-red-500 mt-1">{errors.requirements.message}</p>
              )}
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm sm:text-base md:text-lg font-medium text-gray-700 mb-1">
                Budget Range <span className="text-red-500">*</span>
              </label>
              <select
                {...register("budget", { required: "Budget is required" })}
                className={`w-full px-4 py-2 sm:py-3 text-base sm:text-lg border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 appearance-none bg-white ${errors.budget
                  ? "border-red-500 focus:ring-red-300 focus:border-red-500"
                  : "border-gray-300 focus:ring-primary/30 focus:border-primary"
                  } bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")] bg-[length:20px] bg-[right_12px_center] bg-no-repeat pr-10`}
                defaultValue=""

              >
                <option value="" disabled>
                  Select your budget range
                </option>
                {budgetOptions.map((opt) => (
                  <option key={opt.value as string} value={opt.value as string}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors.budget && (
                <p className="text-sm text-red-500 mt-1">{errors.budget.message}</p>
              )}
            </div>

            {/* Additional Message */}
            <div>
              <label className="block text-sm sm:text-base md:text-lg font-medium text-gray-700 mb-1">
                Additional message
              </label>
              <textarea
                {...register("additionalMessage")}
                placeholder="Any additional details or special requests..."
                className="w-full px-4 py-2 sm:py-3 text-base sm:text-lg border-2 border-gray-300 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/30 focus:border-primary bg-white placeholder:text-gray-400 resize-none"
                rows={4}
              />
            </div>

            {/* Privacy */}
            <div className="flex items-start pt-2 sm:pt-4">
              <input
                type="checkbox"
                {...register("privacy", { required: true })}
                className={`w-5 h-5 sm:w-6 sm:h-6 border-2 rounded transition-all duration-200 flex-shrink-0 mt-0.5 cursor-pointer ${errors.privacy
                  ? "border-red-500 accent-red-500"
                  : "border-gray-300 accent-primary focus:ring-2 focus:ring-primary/30"
                  }`}
              />
              <label
                className={`text-sm sm:text-base md:text-lg ml-3 leading-relaxed cursor-pointer ${errors.privacy ? "text-red-600" : "text-gray-700"
                  }`}
              >
                I agree with the{" "}
                <a
                  href="/privacy-policy"
                  className="underline underline-offset-2 decoration-1 decoration-primary hover:decoration-2 transition-all text-primary font-medium"
                >
                  Privacy Policy
                </a>
                <span className="text-red-500"> *</span>
              </label>
            </div>
            {errors.privacy && (
              <p className="text-sm text-red-500 mt-1 ml-8">Please accept the privacy policy</p>
            )}

            {/* Submit */}
            <div className="flex justify-center sm:justify-end pt-4 sm:pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="h-12 sm:h-14 md:h-16 px-8 sm:px-12 md:px-16 bg-primary text-white text-base sm:text-lg md:text-xl font-semibold rounded-lg hover:bg-primary/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer w-full sm:w-auto min-w-[200px] sm:min-w-[280px] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
              >
                {isSubmitting ? "Sending..." : "GET QUOTE"}
              </button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
