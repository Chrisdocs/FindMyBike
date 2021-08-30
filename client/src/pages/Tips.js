import React from "react";
// import biketips from "../assets/images/biketips.jpg";
import doubleLock from "../assets/images/double-lock.PNG";
import serialNumber from "../assets/images/serial-number.PNG"
import ulock from "../assets/images/ulock.PNG";
import nonQuickRelease from "../assets/images/non-quick-release.PNG";
import "../assets/styles/tips.css";

const Tips = () => {
  return (
    <div>
      <div>
        <h2 className="tips-title"><span className="dark:text-gray-200">How to Keep Your Bike Safe!</span></h2>
      </div>
      <div id="tips" className="max-w-md mx-auto bg-white dark:bg-gray-600 rounded-xl shadow-md overflow-hidden md:max-w-6xl space-x-3">
        <div className="md:flex ">
          <div className="p-8 ">
            <p className="block mt-1 text-lg leading-tight font-medium text-black dark:text-gray-300 underline">Double up your security by using two high-quality locks</p>
            <p className="mt-2 text-gray-500 dark:text-gray-400">U-locks tend to be more durable than thin cable locks, which can be cut through more easily. But because of their shape, U-locks limit the amount of bike you can secure at one time, so consider pairing yours with a sturdy steel chain.</p>
          </div>
          <div className="md:flex-shrink-0">
            <img className="object-contain h-48 w-full md:w-58" src={ulock} alt="U-lock" />
          </div>
        </div>
      </div>
      <div id="tips" className="max-w-md mx-auto bg-white dark:bg-gray-600 rounded-xl shadow-md overflow-hidden md:max-w-6xl">
        <div className="md:flex">
          <div className="p-8">
            <p className="block mt-1 text-lg leading-tight font-medium text-black dark:text-gray-300 underline">Use your locks to keep your wheels from being stolen, too.</p>
            <p className="mt-2 text-gray-500 dark:text-gray-400">If you choose to double your security by using both a U-lock and a steel chain, first thread the U-lock through to the bike frame, the bike rack or other secure structure, and one wheel. Then, loop the cable lock through both the front and back wheel, as well as through the U-lock.</p>
          </div>
          <div className="md:flex-shrink-0">
            <img className="object-contain h-48 w-full md:w-58" src={doubleLock} alt="Double locked bike" />
          </div>
        </div>
      </div>
      <div id="tips" className="max-w-md mx-auto bg-white dark:bg-gray-600 rounded-xl shadow-md overflow-hidden md:max-w-6xl">
        <div className="md:flex">
          <div className="p-8">
            <p className="block mt-1 text-lg leading-tight font-medium text-black dark:text-gray-300 underline">Swap quick-release seat and wheel skewers for ones that require keys.</p>
            <p className="mt-2 text-gray-500 dark:text-gray-400">Seats and wheels on most new bikes come with ‘quick-release’ mechanisms, which make it easy to take them off if you need to load your bike into a car — but they also make your seat and wheels easier to steal. If you don’t need to frequently remove your wheels and seat, consider switching the quick-release skewers for ones that require keys.</p>
          </div>
          <div className="md:flex-shrink-0">
            <img className="object-contain h-48 w-full md:w-58" src={nonQuickRelease} alt="Non-quick release parts" />
          </div>
        </div>
      </div>
      <div id="tips" className="max-w-md mx-auto bg-white dark:bg-gray-600 rounded-xl shadow-md overflow-hidden md:max-w-6xl">
        <div className="md:flex">
          <div className="p-8">
            <p className="block mt-1 text-lg leading-tight font-medium text-black dark:text-gray-300 underline">Take pictures of your bike</p>
            <p className="mt-2 text-gray-500 dark:text-gray-400">Pictures of both sides of your bike and the picture of the bottom bracket, showing the serial number. You can log this information on your dashbord</p>
          </div>
          <div className="md:flex-shrink-0">
            <img className="object-contain h-48 w-full md:w-58" src={serialNumber} alt="How to locate your serial number" />
          </div>
        </div>
      </div>
      <div id="tips" className="max-w-md mx-auto bg-white dark:bg-gray-600 rounded-xl shadow-md overflow-hidden md:max-w-6xl">
        <div className="md:flex">
          <div className="p-8">
            <p className="block mt-1 text-lg leading-tight font-medium text-black dark:text-gray-300 underline">Always bring your bike inside at night.</p>
            <p className="mt-2 text-gray-500 dark:text-gray-400">Most bike thieves prefer to operate when the sun goes down and no one is around to watch. Whenever possible, bring your bike indoors at night — and if you can’t bring it indoors, lock it up in a well-lit area.</p>
          </div>
        </div>
      </div>



    </div>
  );
};

export default Tips;
