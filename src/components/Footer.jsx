import React from "react";

const Footer = () => {
  return <div className="bg-red-200">
      <div class="flex items-center p-2 mt-12 space-x-4 justify-self-end">
    <img
      src="https://source.unsplash.com/user/erondu/daily"
      alt=""
      class="w-12 h-12 rounded-lg"
    />
    <div>
      <h2 class="text-lg font-semibold">Faber Hurtado</h2>
      <span class="flex items-center space-x-1">
        <a href="#" class="text-xs hover:underline text-gray-600"
          >View profile</a
        >
      </span>
    </div>
  </div>
  </div>;
};

export default Footer;
