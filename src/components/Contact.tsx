import { useState } from "react";
import { useForm } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";

const budgetOptions = [
  "<AED 1,000",
  "AED 1,000-AED 5,000",
  "AED 5,000-AED 10,000",
  "AED 10,000-AED 20,000",
  "AED 20,000-AED 50,000",
  ">AED 50,000",
];

type Budget = (typeof budgetOptions)[number];

type FormData = {
  name: string;
  contact: string;
  email: string;
  requirements: string;
  budget: Budget;
  additionalMessage: string;
  privacy: boolean;
  formType: string;
  website: string;
};

export default function ContactForm() {
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
      website: "",
      formType: "CONTACT",
    },
  });

  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(
    null
  );
  const [message, setMessage] = useState<string>("");

  // Ensure +971 prefix and 9 digits formatting for UAE numbers
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
    // Accept +971 with optional space then exactly 9 digits
    const valid = /^\+971\s?\d{9}$/.test(value.trim());
    return valid || "Please enter a valid number";
  };

  const onSubmit = async (data: FormData) => {
    console.log(data);
    setSubmitStatus(null);

    if (data.website) {
      // Honeypot filled, treat as success silently
      reset();
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/contact/create`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = await response.json();

      if (responseData.success === false) {
        throw new Error(responseData.message);
      }

      setMessage(responseData.message);

      setSubmitStatus("success");
      reset();
      // Hide message after 1 second and show form again
      setTimeout(() => setSubmitStatus(null), 3000);
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
      if (error instanceof Error) {
        setMessage(error.message);
      }
      setTimeout(() => setSubmitStatus(null), 3000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-7xl mx-auto my-4 sm:my-6 md:my-8 lg:my-10 px-3 sm:px-4 md:px-6 lg:px-8"
      id="contact"
      noValidate
    >
      <p className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-light leading-tight text-text-primary mb-3 sm:mb-4 md:mb-6 lg:mb-8 xl:mb-10 border-b border-text-primary/30 pb-2 sm:pb-3 md:pb-4 border-dashed">
        Tell us about your corporate gift needs:
      </p>

      {/* Fixed height container to prevent layout shift */}
      <div
        style={{ minHeight: "450px" }}
        className="relative sm:min-h-[550px] md:min-h-[600px] lg:min-h-[650px]"
      >
        {/* Success message */}
        {submitStatus === "success" && (
          <div className="text-center py-8 sm:py-12 md:py-16 absolute inset-0 flex flex-col items-center justify-center px-4">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 sm:mb-6">
              😊
            </div>
            <p className="text-lg sm:text-xl md:text-2xl text-green-700 font-semibold text-center">
              {message}
            </p>
          </div>
        )}

        {/* Error message */}
        {submitStatus === "error" && (
          <div className="text-center py-8 sm:py-12 md:py-16 absolute inset-0 flex flex-col items-center justify-center px-4">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 sm:mb-6">
              😞
            </div>
            <p className="text-lg sm:text-xl md:text-2xl text-red-600 font-semibold mb-2 sm:mb-4 text-center">
              Sorry, something went wrong.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-center">
              {message}
            </p>
          </div>
        )}

        {/* Form inputs (shown only when no submit status) */}
        {submitStatus === null && (
          <div className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10 xl:space-y-12">
            {/* Name */}
            <div className="text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-normal tracking-tighter text-[#080f0f] flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-4">
              <span className="flex-shrink-0">My name is</span>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                placeholder="Enter your name*"
                className={`border-b text-base sm:text-lg md:text-xl lg:text-2xl tracking-normal bg-transparent px-2 py-1 w-full sm:w-64 md:w-72 lg:w-80 focus:outline-none placeholder-gray-400 ${
                  errors.name ? "border-red-500" : "border-[#080f0f]"
                }`}
              />
            </div>

            {/* Contact */}
            <div className="text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-normal tracking-tighter text-[#080f0f] flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-4">
              <span className="flex-shrink-0">You can contact me at</span>
              <input
                type="tel"
                inputMode="tel"
                maxLength={14}
                {...register("contact", {
                  required: "Contact number is required",
                  validate: validateUaeNumber,
                  onChange: handleContactChange,
                })}
                placeholder="Phone number*"
                className={`border-b text-base sm:text-lg md:text-xl lg:text-2xl tracking-normal bg-transparent px-2 py-1 w-full sm:w-56 md:w-64 lg:w-72 focus:outline-none placeholder-gray-400 ${
                  errors.contact ? "border-red-500" : "border-[#080f0f]"
                }`}
              />
            </div>

            {/* Email */}
            <div className="text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-normal tracking-tighter text-[#080f0f] flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-4">
              <span className="flex-shrink-0">Or email me at</span>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                placeholder="name@example.com*"
                className={`border-b text-base sm:text-lg md:text-xl lg:text-2xl tracking-normal bg-transparent px-2 py-1 w-full sm:w-80 md:w-96 lg:w-[28rem] focus:outline-none placeholder-gray-400 ${
                  errors.email ? "border-red-500" : "border-[#080f0f]"
                }`}
              />
            </div>

            {/* Requirements */}
            <div className="text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-normal tracking-tighter text-[#080f0f] flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-4">
              <span className="flex-shrink-0">My requirements are</span>
              <input
                type="text"
                {...register("requirements", {
                  required: "Requirements are required",
                })}
                placeholder="Describe your corporate gift needs*"
                className={`border-b text-base sm:text-lg md:text-xl lg:text-2xl tracking-normal bg-transparent px-2 py-1 w-full sm:w-3/4 md:w-1/2 lg:w-2/3 focus:outline-none placeholder-gray-400 ${
                  errors.requirements ? "border-red-500" : "border-[#080f0f]"
                }`}
              />
            </div>

            {/* Budget */}
            <div className="text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-normal tracking-tighter text-[#080f0f] flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-4">
              <span className="flex-shrink-0">My budget range is</span>
              <select
                {...register("budget", { required: "Budget is required" })}
                className={`border-b text-base sm:text-lg md:text-xl lg:text-2xl tracking-normal bg-transparent px-2 py-1 w-full sm:w-56 md:w-64 lg:w-72 focus:outline-none ${
                  errors.budget ? "border-red-500" : "border-[#080f0f]"
                }`}
                defaultValue=""
              >
                <option value="" disabled>
                  Select budget*
                </option>
                {budgetOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Additional Message */}
            <div className="text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-normal tracking-tighter text-[#080f0f] flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-4">
              <span className="flex-shrink-0">Additional message</span>
              <input
                type="text"
                {...register("additionalMessage")}
                placeholder="Any additional details..."
                className="border-b border-[#080f0f] text-base sm:text-lg md:text-xl lg:text-2xl tracking-normal bg-transparent px-2 py-1 w-full sm:w-3/4 md:w-1/2 lg:w-2/3 focus:outline-none placeholder-gray-400"
              />
            </div>

            {/* Honeypot */}
            <div className="hidden">
              <input type="text" {...register("website")} />
            </div>

            {/* Privacy */}
            <div className="flex items-start sm:items-center mt-6 sm:mt-8 md:mt-10 lg:mt-12">
              <input
                type="checkbox"
                {...register("privacy", { required: true })}
                className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 border-2 transition flex-shrink-0 mt-1 sm:mt-0 ${
                  errors.privacy
                    ? "border-red-500 accent-red-500"
                    : "border-[#499f68] accent-[#499f68]"
                }`}
              />

              <span
                className={`text-sm sm:text-base md:text-lg lg:text-xl ml-2 sm:ml-3 leading-relaxed ${
                  errors.privacy ? "text-red-600" : "text-[#080f0f]"
                }`}
              >
                I agree with the{" "}
                <a
                  href="/privacy-policy"
                  className="underline underline-offset-2 decoration-1 decoration-[#080f0f] hover:decoration-2 transition-all"
                >
                  Privacy Policy
                </a>
              </span>
            </div>

            {/* Submit */}
            <div className="flex justify-center sm:justify-end mt-6 sm:mt-8 md:mt-10 lg:mt-12">
              <button
                type="submit"
                disabled={isSubmitting}
                className="h-12 sm:h-14 md:h-[50px] px-6 sm:px-8 md:px-10 bg-primary text-white text-base sm:text-lg md:text-xl rounded-md hover:bg-primary/80 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer w-full sm:w-auto min-w-[200px] sm:min-w-[250px]"
              >
                {isSubmitting ? "Sending..." : "GET MY QUOTE"}
              </button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
