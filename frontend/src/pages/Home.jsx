import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import { env } from "../devdata/const";

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessages([...messages, { role: "user", content: userInput }]);
    try {
      const response = await axios.post("/chat", { message: userInput });
      setMessages([
        ...messages,
        { role: "assistant", content: response.data.response },
      ]);
    } catch (error) {
      console.error("Error:", error);
    }
    setUserInput("");
  };

  // Making a better getResponse function
  const getResponse = async () => {
    setLoading(true);
    try {
      if (userInput) {
        // Make the request to the backend
        const response = await axios.post(`${env.getResponseURL}`, {
          message: userInput,
        });
        if (response.status === 200) {
          // Add both messages to history
          setMessages([
            ...messages,
            { role: "user", content: userInput },
            { role: "assistant", content: response.data.response },
          ]);
        } else {
          console.log("Error:", response.data.error);
          setErrMessage(response.data.error);
          setShowError(true);
        }
      } else {
        setErrMessage("Please enter a message");
        setShowError(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrMessage("There was an error: ", error);
      setShowError(true);
    } finally {
      setLoading(false);
      setUserInput("");
    }
  };
  return (
    <div className="h-screen bg-[#131314]" id="home">
      <div className="relative mx-auto max-w-screen-xl px-4 py-12 flex flex-col sm:px-6 lg:h-screen lg:items-center lg:px-8">
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex flex-col items-start">
            <span className="text-5xl font-extrabold text-transparent bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-400 bg-clip-text bg-300% animate-gradient">
              Cassandra
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
        <div id="messages-container" className="w-full mt-12">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex flex-row items-center w-full my-4 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-4 text-white rounded-lg ${
                  message.role === "user" ? "bg-[#1e1f20]" : "bg-[#1e1f20]"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
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
            <input
              type="textbox"
              id="search"
              className="w-5/6 font-heading p-4 text-md text-white ring-1 ring-white rounded-full bg-[#1e1f20]"
              placeholder="Type your message here..."
              value={userInput}
              onChange={(event) => setUserInput(event.target.value)}
            />
            <button
              disabled={loading}
              onClick={() => {
                getResponse();
              }}
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
