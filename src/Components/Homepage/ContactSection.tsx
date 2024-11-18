import React, { useState } from "react";
import { connect } from "react-redux";
import { RootState, AppDispatch } from "../../Redux/store";
import { sendMessage } from "../../Redux/HomePage/contactSlice";
import { useTranslation } from "react-i18next";
import emailjs from "emailjs-com";

// interface Props {
//   status: "idle" | "loading" | "succeeded" | "failed";
//   error: string | null;
//   sendMessage: (messageData: {
//     name: string;
//     email: string;
//     content: string;
//   }) => void;

// }

const ContactSection: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "succeeded" | "failed"
  >("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Form Data:", { name, email, content });

    if (!name || !email || !content) {
      alert("All fields are required.");
      return;
    }
    console.log(name, email, content);
    setStatus("loading");
    const templateParams = {
      name,
      email,
      message: content,
    };
    emailjs
      .send(
        "service_30ufy2x",
        "template_gda17dn",
        templateParams,
        "UyJEPvFpHKoLWdu7h"
      )
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        setStatus("succeeded");
        // Reload the page after successful email sent
        setTimeout(() => {
          window.location.reload(); // Reload the page
        }, 2000); // Optional delay of 2 seconds before reloading
      })
      .catch((err) => {
        console.error("FAILED...", err);
        setError("Failed to send message. Please try again.");
        setStatus("failed");
      });
    console.log(name, email, content);
    // sendMessage({ name, email, content });
  };
  const { t } = useTranslation();
  return (
    <section
      className="xl:px-20   flex flex-col xl:flex-row gap-[40px] justify-center font-outfit xl:text-xl py-[20vh]  px-4 md:px-10 "
      id="contact-us"
    >
      <div className="w-full xl:w-1/2 text-center xl:text-start  md:mb-0 flex flex-col gap-[40px]">
        <div className="flex flex-col gap-[4px]">
          <h2 className="text-blackText text-[24px] xl:text-4xl font-bold">
            {t("Get In Touch With Us")}
          </h2>
          <h2 className="text-secondary text-[16px]">
            {t("We Are Here To Help")}
          </h2>
        </div>
        <div className="flex flex-col">
          <div className="w-full flex flex-col gap-[20px] mb-4 md:mb-0">
            <div className="flex items-center space-x-4">
              <svg
                width="39"
                height="39"
                viewBox="0 0 39 39"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="39" height="39" rx="10" fill="#E9E9E9" />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M19.5317 20.4724C23.5208 24.4604 24.4258 19.8467 26.9656 22.3848C29.4143 24.8328 30.8216 25.3232 27.7192 28.4247C27.3306 28.737 24.8616 32.4943 16.1846 23.8197C7.50652 15.144 11.2616 12.6724 11.574 12.2839C14.6839 9.17385 15.1659 10.5894 17.6145 13.0373C20.1544 15.5765 15.5427 16.4844 19.5317 20.4724Z"
                  fill="#013362"
                />
              </svg>

              <p className="text-blackText textsm:text-sm md:text-[14px]">
                {t(
                  "If you have an urgent business concern please contact us at"
                )}
                0785954141
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <svg
                width="53"
                height="40"
                viewBox="0 0 53 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.564453"
                  y="0.5"
                  width="51.5038"
                  height="39"
                  rx="10"
                  fill="#E9E9E9"
                />
                <path
                  d="M24.5276 28.2279C25.0275 28.1222 28.0737 28.1222 28.5736 28.2279C29.001 28.3266 29.4631 28.5573 29.4631 29.0608C29.4383 29.5402 29.157 29.9653 28.7684 30.2352C28.2646 30.628 27.6732 30.8767 27.055 30.9664C26.7131 31.0107 26.3772 31.0117 26.0472 30.9664C25.4281 30.8767 24.8367 30.628 24.3338 30.2342C23.9442 29.9653 23.663 29.5402 23.6381 29.0608C23.6381 28.5573 24.1003 28.3266 24.5276 28.2279ZM26.6097 11C28.6898 11 30.8147 11.987 32.0769 13.6247C32.8958 14.6792 33.2715 15.7327 33.2715 17.3703V17.7963C33.2715 19.0523 33.6035 19.7925 34.334 20.6456C34.8875 21.2741 35.0645 22.0808 35.0645 22.956C35.0645 23.8302 34.7772 24.6601 34.2018 25.3339C33.4484 26.1417 32.386 26.6573 31.3017 26.747C29.7304 26.8809 28.1581 26.9937 26.5649 26.9937C24.9708 26.9937 23.3995 26.9263 21.8282 26.747C20.7429 26.6573 19.6805 26.1417 18.9281 25.3339C18.3527 24.6601 18.0645 23.8302 18.0645 22.956C18.0645 22.0808 18.2424 21.2741 18.7949 20.6456C19.5483 19.7925 19.8584 19.0523 19.8584 17.7963V17.3703C19.8584 15.6883 20.2778 14.5885 21.1414 13.5119C22.4255 11.9417 24.4838 11 26.5202 11H26.6097Z"
                  fill="#013362"
                />
              </svg>

              <p className="text-blackText textsm:text-sm md:text-[14px]">
                {t(
                  "If you have an urgent business concern please contact us at"
                )}
                0785954141
              </p>
            </div>
            <div className="bg-primary flex justify-center space-x-6 mt-4 p-4 text-white text-2xl xl:text-3xl w-full max-w-md rounded-xl">
              <a href="#">
                <i className="fab fa-facebook mr-4"></i>
              </a>
              <a href="#">
                <i className="fab fa-twitter mr-4"></i>
              </a>
              <a href="#">
                <i className="fab fa-linkedin mr-4"></i>
              </a>
              <a href="#">
                <i className="fab fa-instagram mr-4"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full xl:w-1/2 text-center xl:text-start text-base xl:text-lg flex flex-col gap-[20px]">
        <h2 className="text-secondary text-4xl font-bold">
          {t("Send Us Message")}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="mb-4">
            <input
              type="text"
              placeholder={t("Your Name")}
              className="w-full text-[14px] p-2 bg-[lightgray] rounded-[6px]"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder={t("Your Email")}
              className="w-full text-[14px] p-2 bg-[lightgray] rounded-[6px]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <textarea
              placeholder={t("Your Message")}
              className="w-full text-[14px] p-2 bg-[lightgray] rounded-[6px]"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <button
            className="bg-primary mt-4 p-4 text-white text-lg md:text-xl w-full rounded-xl"
            type="submit"
          >
            {t("Send Message")}
          </button>
        </form>
        {status === "loading" && (
          <p className="mt-4 text-primary">Sending...</p>
        )}
        {status === "succeeded" && (
          <div className="mt-4 p-4 border-l-4 border-green-500 bg-green-100 text-green-700">
            <p className="font-bold">Success!</p>
            <p>Your message has been sent successfully!</p>
          </div>
        )}
        {status === "failed" && (
          <div className="mt-4 p-4 border-l-4 border-red-500 bg-red-100 text-red-700">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}
      </div>
    </section>
  );
};

const mapStateToProps = (state: RootState) => ({
  status: state.contact.status,
  error: state.contact.error,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  sendMessage: (messageData: {
    name: string;
    email: string;
    content: string;
  }) => dispatch(sendMessage(messageData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactSection);
