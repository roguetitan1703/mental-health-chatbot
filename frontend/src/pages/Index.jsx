import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="h-screen bg-[#131314]">
      <div className="relative mx-auto max-w-screen-xl px-4 py-32 flex flex-col sm:px-6 lg:h-screen lg:items-center lg:px-8">
        <div className="flex flex-col items-start w-full">
          <h1 className="text-9xl text-gray-50/90 font-extrabold">
            <span className="text-transparent bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-400 bg-clip-text bg-300% animate-gradient">
              BayMax
            </span>
            , The mental health support chatbot.
          </h1>
        </div>

        {/* start a chat button */}
        <Link to = "/home">
        <div className="group mt-12 flex justify-center items-center ring-white ring-1 hover:ring-0 rounded-md from-cyan-400 via-pink-500 to-purple-400 bg-300% animate-gradient bg-none hover:bg-gradient-to-r tansition-all duration-150 ease-in-out">
          <button className="text-xl py-3 px-6 rounded-md group-hover:bg-none group-hover:text-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-400 bg-300% animate-gradient">
            Start a chat
          </button>
        </div>
        </Link>

        <footer className="w-full absolute mx-auto px-6 py-4 bottom-0 flex flex-col justify-center items-center">
          <div className="text-gray-50 text-sm">
            Our chatbot is experimental, please have some patience.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
