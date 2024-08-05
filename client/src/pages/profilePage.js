import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/authContext";
import PageNotFound from "./pnfError";

const Profile = () => {
  const { isLoggedIn, user, onLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(isLoggedIn);
    if (!isLoggedIn) {
      <PageNotFound/> 
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return null; 
  }

  return (
    <div className="w-full h-screen">
      <h1 className="text-center text-2xl">Profile</h1>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-center text-1xl font-bold pt-5">User Info</h1>
        <h2>{user.name}</h2>
        <h2>{user.email}</h2>
        <button
          className="border border-black px-3 mt-2 font-bold hover:text-white hover:bg-black"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
