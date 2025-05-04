import React from "react";

const InfoSection = ({ trip }) => {
  return (
    <div>
      <img
        src="/placeholder.jpg"
        className="h-[340px] w-full object-cover rounded-xl"
      />

      <div className="my-3 flex flex-col gap-2">
        <h2 className="font-bold text-2xl ">{trip?.userSelection?.location}</h2>

        <div className="flex gap-5">
          <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500  text-xs md:text-md">
            {trip?.userSelection?.days} Days
          </h2>
          <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
            Budget: {trip?.userSelection?.budget}
          </h2>
          <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
            No. of Traveler: {trip?.userSelection?.traveler}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
