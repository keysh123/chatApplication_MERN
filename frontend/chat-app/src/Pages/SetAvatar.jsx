import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setAvatarRoute } from "../utils/APIRoutes";
import loader from "../assets/loader.gif";

function SetAvatar() {
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("User"));
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
      fetchAvatars();
    }
  }, []);

  const fetchAvatars = async () => {
    setIsLoading(true);
    const avatarArray = [];
    const imagePromises = [];

    for (let i = 0; i < 4; i++) {
      const seed = Math.random().toString(36).substring(7);
      const url = `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}`;
      avatarArray.push(url);

      const img = new Image();
      img.src = url;
      imagePromises.push(
        new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        })
      );
    }

    await Promise.all(imagePromises);
    setAvatars(avatarArray);
    setIsLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedAvatar === null) {
      toast.error("Please select an avatar");
      return;
    }

    try {
      const response = await fetch(setAvatarRoute, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          avatarImage: avatars[selectedAvatar],
        }),
      });

      const data = await response.json();

      if (data.status === true) {
        const updatedUser = {
          ...user,
          isAvatarImageSet: true,
          avatarImage: avatars[selectedAvatar],
        };
        toast.success("Avatar updated successfully")
        sessionStorage.setItem("User", JSON.stringify(updatedUser));
        navigate("/");
      } else {
        toast.error("Error setting avatar. Try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to set avatar.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h1 className="text-xl font-bold mb-4">Pick an Avatar</h1>
        {isLoading ? (
          <img src={loader} alt="Loading" className="mx-auto" />
        ) : (
          <div className="grid grid-cols-2 gap-4 mb-4">
            {avatars.map((avatar, index) => (
              <img
                key={index}
                src={avatar}
                alt={`avatar-${index}`}
                className={`cursor-pointer rounded-full border-4 ${
                  selectedAvatar === index
                    ? "border-blue-500"
                    : "border-transparent"
                }`}
                onClick={() => setSelectedAvatar(index)}
              />
            ))}
          </div>
        )}
        <button
          onClick={handleSubmit}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Set Avatar
        </button>
      </div>
    </div>
  );
}

export default SetAvatar;
