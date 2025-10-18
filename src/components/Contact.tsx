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

    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      contact: "",
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
      className="max-w-7xl mx-auto my-10"
      id="contact-form"
      noValidate
    >
      <p className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-light leading-tight text-text-primary mb-6 sm:mb-8 md:mb-12 border-b border-text-primary/30 pb-4 border-dashed">
        Tell us about your corporate gift needs:
      </p>

      {/* Fixed height container to prevent layout shift */}
      <div style={{ minHeight: "650px" }} className="relative">
        {/* Success message */}
        {submitStatus === "success" && (
          <div className="text-center py-16 absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-7xl mb-6">😊</div>
            <p className="text-2xl text-green-700 font-semibold">{message}</p>
          </div>
        )}

        {/* Error message */}
        {submitStatus === "error" && (
          <div className="text-center py-16 absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-7xl mb-6">😞</div>
            <p className="text-2xl text-red-600 font-semibold mb-4">
              Sorry, something went wrong.
            </p>
            <p className="text-lg">{message}</p>
          </div>
        )}

        {/* Form inputs (shown only when no submit status) */}
        {submitStatus === null && (
          <div className="space-y-8 sm:space-y-12">
            {/* Name */}
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal tracking-tighter text-[#080f0f] flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-x-6 gap-y-4">
              <span>My name is</span>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                placeholder="Enter your name*"
                className={`border-b text-xl sm:text-2xl tracking-normal bg-transparent px-2 py-1 w-full sm:w-72 focus:outline-none placeholder-gray-400 ${
                  errors.name ? "border-red-500" : "border-[#080f0f]"
                }`}
              />
            </div>

            {/* Contact */}
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal tracking-tighter text-[#080f0f] flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-x-6 gap-y-4">
              <span>You can contact me at</span>
              <input
                type="tel"
                {...register("contact", {
                  required: "Contact number is required",
                })}
                placeholder="Phone number*"
                className={`border-b text-xl sm:text-2xl tracking-normal bg-transparent px-2 py-1 w-full sm:w-64 focus:outline-none placeholder-gray-400 ${
                  errors.contact ? "border-red-500" : "border-[#080f0f]"
                }`}
              />
            </div>

            {/* Email */}
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal tracking-tighter text-[#080f0f] flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-x-6 gap-y-4">
              <span>Or email me at</span>
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
                className={`border-b text-xl sm:text-2xl tracking-normal bg-transparent px-2 py-1 w-full sm:w-96 focus:outline-none placeholder-gray-400 ${
                  errors.email ? "border-red-500" : "border-[#080f0f]"
                }`}
              />
            </div>

            {/* Requirements */}
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal tracking-tighter text-[#080f0f] flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-x-6 gap-y-4">
              <span>My requirements are</span>
              <input
                type="text"
                {...register("requirements", {
                  required: "Requirements are required",
                })}
                placeholder="Describe your corporate gift needs*"
                className={`border-b text-xl sm:text-2xl tracking-normal bg-transparent px-2 py-1 w-full sm:w-1/2 focus:outline-none placeholder-gray-400 ${
                  errors.requirements ? "border-red-500" : "border-[#080f0f]"
                }`}
              />
            </div>

            {/* Budget */}
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal tracking-tighter text-[#080f0f] flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-x-6 gap-y-4">
              <span>My budget range is</span>
              <select
                {...register("budget", { required: "Budget is required" })}
                className={`border-b text-xl sm:text-2xl tracking-normal bg-transparent px-2 py-1 w-full sm:w-64 focus:outline-none ${
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
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal tracking-tighter text-[#080f0f] flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-x-6 gap-y-4">
              <span>Additional message</span>
              <input
                type="text"
                {...register("additionalMessage")}
                placeholder="Any additional details..."
                className="border-b border-[#080f0f] text-xl sm:text-2xl tracking-normal bg-transparent px-2 py-1 w-full sm:w-1/2 focus:outline-none placeholder-gray-400"
              />
            </div>

            {/* Honeypot */}
            <div className="hidden">
              <input type="text" {...register("website")} />
            </div>

            {/* Privacy */}
            <div className="flex items-center mt-8 sm:mt-12">
              <input
                type="checkbox"
                {...register("privacy", { required: true })}
                className={`w-5 h-5 sm:w-6 sm:h-6 border-2 transition ${
                  errors.privacy
                    ? "border-red-500 accent-red-500"
                    : "border-[#499f68] accent-[#499f68]"
                }`}
              />

              <span
                className={`text-base sm:text-xl ml-2 ${
                  errors.privacy ? "text-red-600" : "text-[#080f0f]"
                }`}
              >
                I agree with the{" "}
                <a
                  href="/privacy-policy"
                  className="underline underline-offset-2 decoration-1 decoration-[#080f0f]"
                >
                  Privacy Policy
                </a>
              </span>
            </div>

            {/* Submit */}
            <div className="flex justify-end mt-8 sm:mt-12">
              <button
                type="submit"
                disabled={isSubmitting}
                className="h-[50px] px-8 bg-primary text-white text-lg sm:text-xl rounded-md hover:bg-primary/80 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
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
