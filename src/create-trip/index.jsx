import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from "@/constants/Options";
import { chatSession } from "@/servive/AiModel";
import { db } from "@/servive/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
chatSession
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const CreateTrip = () => {
  const [destination, setDestination] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [formData, setFormData] = useState({});
  const [openDialog,setOpenDialog] = useState(false)

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


  const login = useGoogleLogin({
    onSuccess:(codeResp)=>GetUserProfile(codeResp),
    onError:(error)=>console.log(error)
  })


  const SaveAiTrip= async(TripData)=>{
    // Add a new document in collection "cities"
    
    const docId = Date.now().toString()
    await setDoc(doc(db, "AITrips", "LA",docId), {
      userSelection:formData,
      tripData:TripData
});
  }


  const OnGenerateTrip= async()=>{
    
    const user = localStorage.getItem('user')

    if(!user){
      setOpenDialog(true)
      return 
    }

    if(formData?.days>5 && !formData?.location || !formData?.budget || !formData.traveler)
      { 
        toast("Please fill all details")
        return 
    }
    console.log(formData)
    const FINAL_PROMPT = AI_PROMPT
  .replace("{location}", formData?.location)
  .replace("{days}", formData?.days)
  .replace("{traveler}", formData?.traveler)
  .replace("{budget}", formData?.budget);

console.log(FINAL_PROMPT);

const chat = await chatSession(); // ✅ await the chatSession
const result = await chat.sendMessage(FINAL_PROMPT);
const text = await result.response.text();

console.log(text);
SaveAiTrip(text)

  }


  const GetUserProfile=(tokenInfo)=>{
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`,{
      headers:{
        Authorization:`Bearer ${tokenInfo?.access_token}`,
        Accept:"Application/json"
      }
    }).then((resp)=>{
      console.log(resp)
      localStorage.setItem('user',JSON.stringify(resp.data))
      setOpenDialog(false)
      OnGenerateTrip();
    })
    
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


      <Dialog open={openDialog}>
        
        <DialogContent>
          <DialogHeader>
            
            <DialogDescription>
              <img src="/logo.svg" alt="" />
              <h2 className="font-bold text-lg mt-7">Sign in with google</h2>
              <p>Sign in to the App with Google authentication secuerly</p>

              <Button className="w-full mt-5 flex gap-4 items-center" onClick={login} ><FcGoogle className="h-7 w-7" />Sign in with Google</Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default CreateTrip;
