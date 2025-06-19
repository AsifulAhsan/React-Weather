import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="bg-[#1A1A1A] min-h-screen">
      <div className="flex flex-col justify-center items-center min-h-165 gap-12">
        <h1 className="text-white font-semibold text-4xl">
          This Page Does Not Exist!
        </h1>
        <Link to={"/"}>
          <button className="border-2 bg-black p-3 rounded-xl text-xl text-white font-bold cursor-pointer hover:text-emerald-100 border-transparent hover:bg-green-400">
            Return to home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
