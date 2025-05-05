import React from "react";
import { TextHoverEffect } from "../text-hover-effect";

import { Button } from "../button";
import { Link } from "react-router-dom";


const Hero = () => {
  return (
    <div>
      <div>
        <TextHoverEffect text="Let's GO" duration={0} />
      </div>

      <div>
        <p className="text-xl text-gray-500 text-center">
          Your <span className="text-red-500">AI</span> trip planner
        </p>
      </div>

      <div className=" flex justify-center items-center m-5">


      
      <Link to={"/create-trip"} >
      <Button className="cursor-pointer">Get Started,it's Free</Button>
      </Link>
      </div>


      
    </div>
  );
};

export default Hero;
