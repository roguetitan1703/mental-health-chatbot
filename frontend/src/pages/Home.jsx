import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import { env } from "../devdata/const";

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const inputRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [showError, setShowError] = useState(false);

  // Making a useEffect to set show error to false after 3 seconds
  useEffect(() => {
    if (showError) {
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  }, [showError]);

  // Making a better getResponse function
  const getResponse = async () => {
    setLoading(true);
    try {
      if (userInput) {
        // Make the request to the backend
        const response = await axios.post(
          "http://localhost:8000/get-response",
          {
            message: userInput,
          },
          {
            headers: {
              "Content-Type": "application/json", // Specify the content type
            },
          }
        );
        if (response.status === 200) {
          // Add both messages to history
          setMessages([
            ...messages,
            { role: "user", content: userInput },
            { role: "assistant", content: response.data.response },
          ]);
        } else {
          // Extract the error detail correctly
          console.log("Error:", response.data.detail);
          setErrMessage(response.data.detail);
          setShowError(true);
        }
      } else {
        setErrMessage("Please enter a message");
        setShowError(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrMessage("There was an error. Please try again later.: ", error);
      setShowError(true);
    } finally {
      setLoading(false);
      setUserInput("");
    }
  };

  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      getResponse();
    }
  };

  const showMessages = messages.map((message, index) => (
    <div
      key={index}
      className={`flex flex-row items-end w-full my-4 ${
        message.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`p-4 text-white rounded-lg max-w-xl text-wrap ${
          message.role === "user" ? "bg-[#1e1f20]" : "bg-[#1e1f20]"
        }`}
      >
        {message.content}
      </div>
    </div>
  ));

  const showContent = () => {
    if (messages.length === 0) {
      if (userInput === "") {
        return showInstructions(1);
      } else {
        return showInstructions(0);
      }
    } else {
      return showMessages;
    }
  };

  const showInstructions = (opacity) => {
    return (
      <div className="mt-40 flex justify-center items-center font-heading">
        {opacity ? (
          <div className="p-8 rounded-lg shadow-lg text-center text-sm text-white/80 animate-pulse">
            <h1 className="text-2xl font-bold mb-6">
              Chat with the Mental Health Support Bot
            </h1>
            <ul className="text-left space-y-4">
              <li>
                • Send messages as <span className="font-bold">USER</span> to
                interact with the chatbot.
              </li>
              <li>
                • The bot is trained on mental health conversations, offering
                non-judgmental support.
              </li>
              <li>
                • Responses are generated using a Hugging Face model customized
                for mental health topics.
              </li>
              <li>
                • Click the <span className="font-bold">SEND</span> button or
                press <span className="font-bold">ENTER</span> to submit your
                message.
              </li>
              <li>
                • All conversations are confidential and aim to provide
                emotional support and guidance.
              </li>
            </ul>
          </div>
        ) : (
          <div className="p-8 rounded-lg shadow-lg text-center text-sm text-white/80 opacity-0">
            <h1 className="text-2xl font-bold mb-6">
              Chat with the Mental Health Support Bot
            </h1>
            <ul className="text-left space-y-4">
              <li>
                • Send messages as <span className="font-bold">USER</span> to
                interact with the chatbot.
              </li>
              <li>
                • The bot is trained on mental health conversations, offering
                non-judgmental support.
              </li>
              <li>
                • Responses are generated using a Hugging Face model customized
                for mental health topics.
              </li>
              <li>
                • Click the <span className="font-bold">SEND</span> button or
                press <span className="font-bold">ENTER</span> to submit your
                message.
              </li>
              <li>
                • All conversations are confidential and aim to provide
                emotional support and guidance.
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  };

  const handleInputChange = (event) => {
    setUserInput(event.target.value.replace(/\n/g, "")); // Remove newlines

    adjustContainerHeight();
  };

  const adjustContainerHeight = () => {
    const container = inputRef.current;
    container.style.height = "auto";

    container.style.height = `${inputRef.current.scrollHeight}px`;
  };
  const renderInput = () => {
    return (
      <textarea
        ref={inputRef}
        id="search"
        className={`w-5/6 font-heading items-center flex flex-row justify-center px-3 pb-3 text-md text-white ring-1 ring-white resize-none no-scrollbar ${
          !userInput ? "rounded-full" : "rounded-lg"
        } bg-[#1e1f20]`}
        placeholder="Type your message here..."
        value={userInput}
        onChange={handleInputChange}
      />
    );
  };

  return (
    <div className="h-screen bg-[#131314]" id="home">
      <div className="relative mx-auto max-w-screen-xl px-4 py-12 flex flex-col sm:px-6 h-screen">
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex flex-col items-start">
            <span className="text-5xl font-extrabold text-transparent bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-400 bg-clip-text bg-300% animate-gradient">
              BayMax
            </span>
            <span className="text-white/80 ml-4 lowercase font-bold">
              the Mental Health Chatbot
            </span>
          </div>

          {showError && (
            <div className="px-8 py-3 rounded-md bg-gray-200 hover:bg-gray-300 hover:scale-105 transition-all duration-150 ease-in-out">
              <div className="text-black/90 text-md text-bold">
                {errMessage}
              </div>
            </div>
          )}
        </div>
        {/* Making a message container which has the user's prompt and the model's repsonse, no history storing or displaying for now */}
        <div
          id="messages-container"
          className="w-full h-[700px] mt-12 overflow-scroll no-scrollbar"
        >
          {loading ? (
            <div className="flex flex-row items-end w-full justify-start">
              <div className="p-4 text-white rounded-lg bg-[#1e1f20]">
                Please wait, generating response...
              </div>
            </div>
          ) : (
            <>{showContent()}</>
          )}
        </div>
        <footer className="w-full absolute mx-auto px-6 py-4 bottom-0 flex flex-col justify-center items-center">
          <div className="w-full flex flex-row justify-center items-center mb-10 space-x-4">
            {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg> */}
            {renderInput()}
            <button
              disabled={loading}
              onClick={() => {
                getResponse();
              }}
              onSubmit={() => getResponse()}
              className="flex flex-row items-center font-extrabold justify-between bg-white/80 hover:bg-white rounded-full px-6 py-2 text-md border-black border-2"
            >
              <span className="">Send</span>
              {/* <FontAwesomeIcon
                icon={faPaperPlane}
                className="h-6 w-6 text-black"
              /> */}
            </button>
          </div>
          <div className="text-gray-50 text-sm">
            Our chatbot is experimental, please have some patience.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
