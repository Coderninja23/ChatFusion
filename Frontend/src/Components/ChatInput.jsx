import { useState } from "react";
import classes from "./Assets/ChatInput.module.css";
import { BsEmojiSmileFill } from "react-icons/bs";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import Picker from "emoji-picker-react";

const ChatInput = (props) => {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.trim().length > 0) {
      props.handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <>
      <div className={classes.emoji}>
        {showEmojiPicker && (
          <Picker height={450} width="100%" onEmojiClick={handleEmojiClick} />
        )}
      </div>
      {/* <div className={classes.emojiDropdown}> */}
      {/*   <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Dropdown Button
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleEmojiPicker}>Emoji</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>*/}
      {/* </div> */}
      {/* <div className={classes.Container}>
        <form
          className={classes.innerContainer}
          onSubmit={(event) => sendChat(event)}
        >
          <input
            type="text"
            placeholder="type your message here"
            onChange={(e) => setMsg(e.target.value)}
            value={msg}
          />
          <button type="submit">Send</button>
        </form>
      </div> */}
      <>
        <form
          className={classes.formInput}
          onSubmit={(event) => sendChat(event)}
        >
          <InputGroup width="20%">
            <Form.Control
              placeholder="Type your message Here!"
              onChange={(e) => setMsg(e.target.value)}
              value={msg}
              className="formInputHandler"
            />
            <Button
              variant="outline-warning"
              onClick={handleEmojiPicker}
              className={classes.emojiButtonInput}
            >
              Emoji
              {/* <div className={classes.toolText}>
                <span className={classes.toolTipText}>
                  
                </span>
              </div> */}
            </Button>
            <Button
              variant="success"
              width={100}
              onClick={(event) => sendChat(event)}
            >
              Send
            </Button>
          </InputGroup>
        </form>
      </>
    </>
  );
};

export default ChatInput;
