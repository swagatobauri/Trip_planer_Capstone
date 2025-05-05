import { GetPlaceDetails } from "@/servive/GlobalApi";
import axios from "axios";
import React, { useEffect } from "react";

const InfoSection = ({ trip }) => {



  useEffect(() => {
   trip && GetPlacePhoto()
  }, [trip])
  

  const GetPlacePhoto = async (photoReference) => {
    try {
      const response = await axios.get(
        `/api/placephoto?photoreference=${photoReference}`
      );
      // Process the successful response here
      return response.data;
      console.log(response.data)
    } catch (error) {
      // Log the error for debugging
      console.error("Error fetching place photo:", error);
      // Handle the error appropriately, e.g., display an error message to the user
      return null; // Or throw the error if you want to handle it further up the chain
    }
  };
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
