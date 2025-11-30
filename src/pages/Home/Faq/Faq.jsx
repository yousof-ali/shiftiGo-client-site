import React from "react";

const Faq = () => {
  return (
    <div className=" rounded-2xl mb-16 ">
      <h2 className="md:text-4xl   text-2xl text-center">
        Frequently Asked Question (FAQ)
      </h2>
      <p className="max-w-[700px] mt-2 mb-8 mx-auto text-gray-600 text-center">
        Enhance posture, mobility, and well-being effortlessly with Posture Pro.
        Achieve proper alignment, reduce pain, and strengthen your body with
        ease!
      </p>

      <div className="max-w-5xl space-y-3 mx-auto">
        <div className="collapse collapse-arrow bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title  text-base sm:text:lg lg:text-xl font-semibold">
          How do I create an account?
        </div>
        <div className="collapse-content text-sm">
          Click the "Sign Up" button in the top right corner and follow the
          registration process.
        </div>
      </div>
      <div className="collapse collapse-arrow text-base sm:text:lg lg:text-xl  bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title font-semibold">
          I forgot my password. What should I do?
        </div>
        <div className="collapse-content text-sm">
          Click on "Forgot Password" on the login page and follow the
          instructions sent to your email.
        </div>
      </div>
      <div className="collapse collapse-arrow text-base sm:text:lg lg:text-xl  bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title font-semibold">
          How do I update my profile information?
        </div>
        <div className="collapse-content text-sm">
          Go to "My Account" settings and select "Edit Profile" to make changes.
        </div>
      </div>
      </div>
    </div>
  );
};

export default Faq;
