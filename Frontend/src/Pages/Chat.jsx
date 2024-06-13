import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
// import styled from "styled-components";
import { allUsersRoute, host } from "../Utils/APIRoutes";
import ChatContainer from "../Components/ChatContainer";
import Contacts from "../Components/Contacts";
import Welcome from "../Components/Welcome";
import classes from "./Assets/Chat.module.css";

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    console.log("CHecking");
    if (!localStorage.getItem(process.env.REACT_APP_HOST_KEY)) {
      navigate("/login");
    } else {
      async function settingUser() {
        const res = await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_HOST_KEY)
        );
        setCurrentUser(res);
      }
      settingUser();
      console.log(currentUser);
    }
  }, [navigate]);
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    async function gettingChat() {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          console.log(currentUser.isAvatarImageSet + "Yes");
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          // console.log("Data---------",data.data);
          console.log(currentUser);
          console.log(data);
          const updatedData = [];
          console.log("------------------------", currentUser.contacts);
          const emails = [];
          for (let i = 0; i < currentUser.contacts.length; i++) {
            console.log(currentUser.contacts[i]);
            emails.push(currentUser.contacts[i]);
          }
          console.log(emails);
          const availableEmails=[];
          for (let i = 0; i < data.data.length; i++) {
            console.log(data.data[i].email);
            if (emails.includes(data.data[i].email)) {
              console.log("YESSSSSSSSSSSS");
              updatedData.push(data.data[i]);
              availableEmails.push(data.data[i].email);
              console.log(data.data[i].email);
            }
          }
          console.log("--------------------",updatedData);
          setContacts(availableEmails);
          // console.log()
          console.log(availableEmails);
        } else {
          navigate("/setAvatar");
        }
      }
    }
    gettingChat();
  }, [currentUser, navigate]);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <>
      <div className={classes.Container}>
        <div className={classes.container_inner}>
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </div>
      </div>
    </>
  );
}
