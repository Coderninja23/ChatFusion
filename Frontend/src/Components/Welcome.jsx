import classes from "./Assets/Welcome.module.css";
import ChatGIF from "../Assets/Chat Icon.gif";
import { useState } from "react";
import { useEffect } from "react";

const Welcome = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    async function gettingUserName() {
      const res = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_HOST_KEY)
      )?.username;
      setUserName(res);
    }
    gettingUserName();
  }, []);

  return (
    <div className={classes.container}>
      {/* <img src={ChatGIF} alt="" /> */}
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </div>
  );
};

export default Welcome;
