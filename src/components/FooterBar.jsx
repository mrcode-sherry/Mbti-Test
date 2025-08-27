import React from 'react';

const FooterBar = () => {
  return (
    <div className="bg-[#14442E] text-white text-sm py-7 md:px-16 px-8 border-t-[1px]">
      <div className="max-w-7xl mx-auto flex justify-center items-center text-center">
        &copy; {new Date().getFullYear()} MBTI Test. All rights reserved.
      </div>
    </div>
  );
};

export default FooterBar;
