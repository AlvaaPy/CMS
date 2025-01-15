import React from "react";
import Sidebar from "./Sidebar";
import IMGG from "../../Assets/img-1.png";

function Cms() {
  return (
    <div className="">
      <Sidebar />
      <div className="flex-1 p-10 bg-gray-100 min-h-screen">
        <div className="text-center my-4">
          <img src={IMGG} alt="img-1" className="mx-auto mb-4 rounded-lg-md max-w-96 h-auto" />
          <div>
            <h1 className="text-3xl font-bold mb-2 text-gray-800">CMS Page</h1>
            <p className="text-gray-700">
              This is the CMS page from Admin.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cms;
