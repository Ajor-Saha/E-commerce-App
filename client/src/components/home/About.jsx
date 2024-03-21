import React from 'react';
import about from "../../assets/about.png";

const About = () => {
  return (
    <div className="bg-gray-100 dark:bg-darkPurple py-14">
      <div className="container mx-auto px-4 py-6 md:py-8 lg:py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          {/* Left side content */}
          <div className="md:w-1/2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 md:mb-0">Fabrilife</h1>
            <p className="text-lg text-gray-600 dark:text-gray-200 font-semibold">Because comfort and confidence go hand in hand.</p>
            <p className="text-gray-700 dark:text-gray-300 mt-4">We focus on carefully selecting the best clothing that is comfortable, looks great, and makes you confident. Apart from the fabric, design, and fit, we go through strict quality control parameters to give you what you truly deserve. The power of a good outfit is how it can influence your perception of and an image on the right side.</p>
          </div>
          {/* Right side content */}
          <div className="md:w-1/2 mt-8 md:mt-0">
            <img src={about} alt="Image" className="w-full h-auto rounded-lg shadow-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
