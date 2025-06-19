import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="flex mx-8 pt-6 justify-between">
      <h1 className="text-3xl font-semibold text-black cursor-pointer">
        About Page
      </h1>
      <Link to={"/"}>
        <button className="border-2 bg-black p-2 rounded-xl text-xl text-white font-bold cursor-pointer hover:text-emerald-100 border-transparent hover:bg-green-400">
          Return to home
        </button>
      </Link>
    </div>
  );
}

export default About;
