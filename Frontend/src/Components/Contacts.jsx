import { useEffect, useState } from "react";
import Logo from "../Assets/Chat Icon.gif";
import classes from "./Assets/Contacts.module.css";

const Contacts = (props) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    async function settingData() {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_HOST_KEY)
      );
      setCurrentUserName(data.username);
      setCurrentUserImage(data.avatarImage);
    };
    settingData();
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    props.changeChat(contact);
  };

  return (
    <>
      {currentUserImage && (
        <div className={classes.Container}>
          <div className={classes.brand}>
            <img src={Logo} alt="logo" />
            <h3>Chat Fusion</h3>
          </div>
          <div className={classes.contacts}>
            {props.contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`${classes.contact} ${
                    index === currentSelected ? classes.selected : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className={classes.avatar}>
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                    />
                  </div>
                  <div className={classes.username}>
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={classes.currentUser}>
            <div className={classes.avatar}>
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className={classes.username}>
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Contacts;
