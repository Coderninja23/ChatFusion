import { useState } from "react";
import loader from "./Assets/loader.gif";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import { useEffect } from "react";
import { setAvatarRoute } from "../Utils/APIRoutes";
import classes from "./Assets/setAvatar.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SetAvatar = () => {
  const navigate = useNavigate();
  const api = `https://api.multiavatar.com/4645646`;
  const [isLoading, setIsLoading] = useState(true);
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    theme: "dark",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
  };

  useEffect(() => {
    async function gettingInfo() {
      if (!localStorage.getItem(process.env.REACT_APP_HOST_KEY)) {
        navigate("/login");
      }
    }
    gettingInfo();
  }, [navigate]);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an Avatar", toastOptions);
    } else {
      const user = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_HOST_KEY)
      );
      // console.log("Hello");
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });
      // console.log(data);

      if (!data.isSet) {
        toast.error("Error setting the avatar. Try again", toastOptions);
      } else {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem(
          process.env.REACT_APP_HOST_KEY,
          JSON.stringify(user)
        );
        navigate("/");
        console.log("Again");
      }
    }
  };

  useEffect(() => {
    async function showingAvatars() {
      const data = [];
      for (let i = 0; i < 1; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        // console.log(i);
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64")); //Check Working
      }
      setAvatars(data);
      setIsLoading(false);
    }
    showingAvatars();
  }, [api]);

  return (
    <>
      {isLoading ? (
        <div className={classes.Container}>
          <img src={loader} alt="loader" className={classes.loader} />
        </div>
      ) : (
        <div className={classes.Container}>
          <div className={classes.titleContainer}>
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className={classes.avatars}>
            {avatars.map((avatar, index) => {
              return (
                <div
                  className={`${classes.avatar} ${
                    selectedAvatar === index ? classes.selected : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button onClick={setProfilePicture} className={classes.submitButton}>
            Set as Profile Picture
          </button>
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default SetAvatar;
