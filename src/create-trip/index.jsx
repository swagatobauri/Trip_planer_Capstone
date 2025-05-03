import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SelectBudgetOptions, SelectTravelsList } from "@/constants/Options";
import React, { useEffect, useState } from "react";

const CreateTrip = () => {
  const [destination, setDestination] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [formData, setFormData] = useState({});

  const handleInputChange = (name, value) => {

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const destinationsList = ["Paris", "New York", "London", "Tokyo", "Sydney"];



  useEffect(() => {
    console.log(formData)
  }, [formData])


  const OnGenerateTrip=()=>{
    if(formData?.days>5)
      {
      return 
    }
  }
  

  const handleChange = (event) => {
    const value = event.target.value;
    setDestination(value);
    handleInputChange("location", value);

    if (value) {
      const filteredSuggestions = destinationsList.filter((destination) =>
        destination.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setDestination(suggestion);
    handleInputChange("location", suggestion);
    setSuggestions([]);
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10 text-center">
      <h2 className="font-bold text-3xl">
        Tell us your <span className="text-red-300">trip</span> preferences
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information and our trip planner will generate a customized itinerary based on your preferences.
      </p>

      <div className="mt-20">
        {/* Destination Input */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is your destination of choice?
          </h2>
          <input
            type="text"
            value={destination}
            onChange={handleChange}
            className="border px-4 py-2 rounded-lg"
            placeholder="Search for a destination..."
          />
          {suggestions.length > 0 && (
            <ul className="mt-2 border rounded-lg shadow-lg max-h-40 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Days Input */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you gonna stay?
          </h2>
          <input
            type="number"
            className="border px-4 py-2 rounded-lg"
            placeholder="Ex. 3"
            onChange={(e) => handleInputChange("days", e.target.value)}
          />
        </div>
      </div>

      {/* Budget Options */}
      <div>
        <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5 cursor-pointer">
          {SelectBudgetOptions.map((item, idx) => (
            <div key={idx} className={`p-4 border rounded-lg hover:shadow-lg ${formData?.budget==item.title &&'shadow-lg border-black'}`}
            onClick={()=>handleInputChange('budget',item.title)}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* Travel Companions */}
      <div>
        <h2 className="text-xl my-3 font-medium">
          Who do you plan on traveling with on your next adventure?
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-5 cursor-pointer">
          {SelectTravelsList.map((item, idx) => (
            <div key={idx} className={`p-4 border rounded-lg hover:shadow-lg ${formData?.traveler==item.peopleCount  &&'shadow-lg border-black'}`}
            onClick={()=>handleInputChange('traveler',item.peopleCount)}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="my-10 flex justify-end">
        <Button onClick={OnGenerateTrip}>
          Generate Trip
        </Button>
      </div>
    </div>
  );
};

export default CreateTrip;
