import { useEffect, useState } from "react";
import Logo from "../Assets/Chat Icon.gif";
import classes from "./Assets/Contacts.module.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import axios from "axios";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Stack from "react-bootstrap/Stack";
import { addContactRoute } from "../Utils/APIRoutes";

const Contacts = (props) => {
  const [enteredContact, setEnteredContact] = useState("");
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    async function settingData() {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_HOST_KEY)
      );
      console.log(data);
      if (data) {
        setCurrentUserName(data.username);
        setCurrentUserImage(data.avatarImage);
      }
    }
    settingData();
  }, [process.env.REACT_APP_HOST_KEY]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    props.changeChat(contact);
  };

  const contactDataChangeHandler = (event) => {
    setEnteredContact(event.target.value);
  };

  const searchContactHandler = async (event) => {
    event.preventDefault();

    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_HOST_KEY)
    );

    const res = await axios.post(`${addContactRoute}/${data._id}`, {
      contact: enteredContact,
    });
    console.log(res);
    const updatedData = data;
    console.log(updatedData);
    updatedData.contacts = res.data.contacts;
    localStorage.setItem(
      process.env.REACT_APP_HOST_KEY,
      JSON.stringify(updatedData)
    );
    // setEnteredContact("");
  };

  return (
    <>
      {currentUserImage && (
        <div className={classes.contactsContainer}>
          <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <div className={classes.Container}>
                  <div className={classes.brand}>
                    <img src={Logo} alt="logo" />
                    <h3>Chat Fusion</h3>
                  </div>

                  <div className={classes.contacts}>
                    {props.contacts.map((contact, index) => {
                      console.log(contact);
                      return (
                        <Stack
                          gap={2}
                          className="col-md-8 mx-auto"
                          width="10rem"
                        >
                          <Button
                            variant="secondary"
                            onClick={() => changeCurrentChat(index, contact)}
                          >
                            <div>
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
                          </Button>
                        </Stack>
                      );
                    })}
                  </div>
                  <div className={classes.userInfo}>
                    <form onSubmit={searchContactHandler}>
                      <input
                        placeholder="Search contacts..."
                        type="text"
                        onChange={contactDataChangeHandler}
                      />
                      <button type="submit">Add</button>
                    </form>
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
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      )}
    </>
  );
};

export default Contacts;
