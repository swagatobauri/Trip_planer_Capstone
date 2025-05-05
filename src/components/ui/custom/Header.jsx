import React, { useEffect, useState } from "react";
import { Button } from "../button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useNavigation } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);



  useEffect(() => {
    console.log(user);
  }, []);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`,
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
        window.location.reload
      });
  };

  return (
    <div className="p-2 shadow-lg flex justify-between items-center px-5 bg-teal-100 sticky">
      <img src="/logo.svg" alt="" />
      <div>{user ? 
        <div>
          
          <Popover>
            <PopoverTrigger>
            <img  src={user?.picture} className="h-[35px] w-[35px] rounded-full cursor-pointer"/>
            </PopoverTrigger>
            <PopoverContent>
              <h2 className="cursor-pointer" 
                onClick={()=>{
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}
                >Logout</h2>
            </PopoverContent>
          </Popover>

      </div> : <Button onClick={()=>setOpenDialog(true)}>Sign in </Button>}</div>


      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="" />
              <h2 className="font-bold text-lg mt-7">Sign in with google</h2>
              <p>Sign in to the App with Google authentication secuerly</p>

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

export default Header;
