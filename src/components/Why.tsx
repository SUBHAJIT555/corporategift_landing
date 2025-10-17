const Why = () => {
  return (
    <div>
      <div className="w-full px-5 md:px-15  pb-10 md:pb-15">
        <div className="w-full py-10 md:py-20 px-5 md:px-15">
            {/* heading section start */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left side */}
            <div className="flex flex-col lg:col-span-2">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-tight text-text-primary mb-6">
                Why Choose
                Us for
                Corporate Gifts?
              </h2>
            </div>

            {/* Right side */}
            <div className="flex lg:col-span-1">
              <p className="text-lg md:text-xl lg:text-2xl font-poppins text-text-primary leading-relaxed">
                Experience excellence in corporate gifting with our premium customized products, exceptional service, and innovative solutions that help strengthen your business relationships and enhance your brand presence.
              </p>
            </div>
          </div>

          {/* bento grid items start */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* ------------------------------ 1st item start ------------------------------ */}
            <div className="h-[50vh] rounded-lg">
              <div className="flex flex-col h-full justify-between gap-4">
                <div className="rounded-lg p-4 border transition-all duration-300 h-[calc(50vh/3)]">
                  <h3 className="text-2xl font-light text-text-primary mb-4">Premium Quality</h3>
                  <p className="text-text-primary">We source only the finest materials and work with skilled craftsmen to create corporate gifts of exceptional quality.</p>
                </div>

                <div className="rounded-lg p-4 border transition-all duration-300 h-[calc(50vh/3)]">
                  <h3 className="text-2xl font-light text-text-primary mb-4">Innovation</h3>
                  <p className="text-text-primary">Our creative team stays ahead of trends to offer unique and innovative gift solutions that make a lasting impression.</p>
                </div>

                <div className="rounded-lg p-4 border transition-all duration-300 h-[calc(50vh/3)]">
                  <h3 className="text-2xl font-light text-text-primary mb-4">Reliability</h3>
                  <p className="text-text-primary">Count on us for timely delivery and consistent quality across all your corporate gifting needs.</p>
                </div>
              </div>
            </div>
            {/* ------------------------------ 1st item end ------------------------------ */}
            {/* ------------------------------ 2nd item start ------------------------------ */}

            <div className="h-[50vh] rounded-lg  p-6 border transition-all duration-300">
              <h3 className="text-2xl font-light text-text-primary mb-4">Customization</h3>
              <p className="text-text-primary">We offer extensive customization options to perfectly align your corporate gifts with your brand identity and specific requirements.</p>
            </div>
            {/* ------------------------------ 2nd item end ------------------------------ */}

            {/* ------------------------------ 3rd item start ------------------------------ */}
            <div className="h-[50vh] rounded-lg ">
              <div className="flex flex-col h-full justify-between gap-4">
                <div className="rounded-lg p-4 border transition-all duration-300 h-[25vh]">
                  <h3 className="text-2xl font-light text-text-primary mb-4">Expert Support</h3>
                  <p className="text-text-primary">Our dedicated team provides personalized guidance and support throughout your corporate gifting journey.</p>
                </div>

                <div className="rounded-lg p-4 border transition-all duration-300 h-[25vh]">
                  <h3 className="text-2xl font-light text-text-primary mb-4">Global Reach</h3>
                  <p className="text-text-primary">With our extensive network, we can handle corporate gift requirements for businesses of any size, anywhere in Dubai.</p>
                </div>
              </div>
            </div>
            {/* ------------------------------ 3rd item end ------------------------------ */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Why;
