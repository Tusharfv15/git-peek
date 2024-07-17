import React from "react";
import { FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
const LikeProfile = ({ userProfile }) => {
    const {authUser} = useAuthContext();
    const isOwnProfile = authUser?.username === userProfile.login;

  const handleLikeProfile = async () => {
    try {
      const res = await fetch(`/api/users/likes/${userProfile.login}`, {
        method: "POST",
        credentials: "include",
      });
        
     
      const data = await res.json();

      if (res.status == 400) {
        toast.error("User Already Liked");
        }
      else if(res.status === 200) {
          toast.success("Profile Liked");
        }
      else if (res.status === 404) {
        toast.error("That user is not a member of our app");
        }

      if (data.error) throw new Error(data.error);
     
    } catch (error) {
      toast.error("Error liking profile");
    }
    };
    if (isOwnProfile) {
    return null;
    }
  return (
    <button
      className="p-2 text-xs w-full font-medium rounded-md bg-glass border border-blue-400 flex items-center gap-2"
      onClick={handleLikeProfile}
    >
      <FaHeart size={16} /> Like Profile
    </button>
  );
};

export default LikeProfile;
