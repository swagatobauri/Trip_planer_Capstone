import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelsList,
} from "@/constants/Options";
import { chatSession } from "@/service/AiModel";
import { db } from "@/service/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { HiOutlineMap } from "react-icons/hi2";


const CreateTrip = () => {
  const [destination, setDestination] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);


  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const destinationsList = [
    // International
    "Paris",
    "New York",
    "London",
    "Tokyo",
    "Sydney",
    "Rome",
    "Dubai",
    "Barcelona",
    "Bali",
    "Istanbul",
    "Singapore",
    "Bangkok",
    "Amsterdam",
    "Los Angeles",
    "Venice",

    // Indian
    "Delhi",
    "Mumbai",
    "Jaipur",
    "Goa",
    "Kerala",
    "Ladakh",
    "Varanasi",
    "Agra",
    "Rishikesh",
    "Udaipur",
    "Mysore",
    "Shillong",
    "Ooty",
    "Kolkata",
    "Amritsar"
  ];


  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const SaveAiTrip = async (TripData) => {
    // Add a new document in collection "cities"
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();

    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate('/view-trip/' + docId)
  };

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (
      (formData?.days < 5 && !formData?.location) ||
      !formData?.budget ||
      !formData.traveler
    ) {
      toast("Please fill all details");
      return;
    }
    console.log(formData);

    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData?.location)
      .replace("{days}", formData?.days)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget);

    console.log(FINAL_PROMPT);

    const chat = await chatSession(); // ✅ await the chatSession
    const result = await chat.sendMessage(FINAL_PROMPT);
    const text = await result.response.text();

    console.log(text);
    setLoading(false);
    SaveAiTrip(text);
  };

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        OnGenerateTrip();
      });
  };

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
        Just provide some basic information and our trip planner will generate a
        customized itinerary based on your preferences.
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
            min="1"
            max="5"
            // step="1"
            className="border px-4 py-2 rounded-lg"
            placeholder="3"
            onChange={(e) => handleInputChange("days", e.target.value)}
          />
        </div>
      </div>

      {/* Budget Options */}
      <div>
        <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5 cursor-pointer">
          {SelectBudgetOptions.map((item, idx) => (
            <div
              key={idx}
              className={`p-4 border rounded-lg hover:shadow-lg ${formData?.budget == item.title && "shadow-lg border-black"
                }`}
              onClick={() => handleInputChange("budget", item.title)}
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
            <div
              key={idx}
              className={`p-4 border rounded-lg hover:shadow-lg ${formData?.traveler == item.peopleCount &&
                "shadow-lg border-black"
                }`}
              onClick={() => handleInputChange("traveler", item.peopleCount)}
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
        <Button disabled={loading} onClick={OnGenerateTrip}>
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <div className="flex items-center gap-2 mb-4">
                <HiOutlineMap className="text-3xl text-red-500" />
                <h2 className="font-extrabold text-2xl tracking-tighter text-gray-800">
                  Trip <span className="text-red-500">Planner</span>
                </h2>
              </div>
              <h2 className="font-bold text-lg mt-7">Sign in with google</h2>
              <p>Sign in to the App with Google authentication securely</p>

              <Button
                disabled={loading}
                className="w-full mt-5 flex gap-4 items-center"
                onClick={login}
              >
                <FcGoogle className="h-7 w-7" />
                Sign in with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTrip;
