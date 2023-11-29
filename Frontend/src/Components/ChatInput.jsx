import { useState } from "react";
import classes from "./Assets/ChatInput.module.css";
import { BsEmojiSmileFill } from "react-icons/bs";

import Picker from "emoji-picker-react"

const ChatInput = props => {

    const [msg, setMsg]=useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const handleEmojiPicker = () => {
        setShowEmojiPicker(!showEmojiPicker)
    };

    const handleEmojiClick = (event, emojiObject) => {
        let message=msg;
        message+=emojiObject.emoji;
        setMsg(message);
    };

    const sendChat = event => {
        event.preventDefault();
        if(msg.trim().length>0){
            props.handleSendMsg(msg);
            setMsg("");
        }
    };

    return(
        <div className={classes.Container}>
        <div className={classes.buttonContainer}>
          <div className={classes.emoji}>
            <BsEmojiSmileFill onClick={handleEmojiPicker} />
            {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
          </div>
        </div>
        <form className={classes.innerContainer} onSubmit={(event) => sendChat(event)}>
          <input
            type="text"
            placeholder="type your message here"
            onChange={(e) => setMsg(e.target.value)}
            value={msg}
          />
          <button type="submit">
            Send
          </button>
        </form>
      </div>
    );
};

export default ChatInput;