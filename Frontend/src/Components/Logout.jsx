import classes from "./Assets/Logout.module.css";
import { BiPowerOff } from "react-icons/bi";
import { logoutRoute } from "../Utils/APIRoutes";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";

const Logout = () => {
  const navigate = useNavigate();

  const handleClick = async () => {
    const id = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_HOST_KEY)
    )._id;
    const data = await axios.get(`${logoutRoute}/${id}`);
    if (data.status === 200) {
      localStorage.clear();
      navigate("/login");
    }
  };

  return (
    <>
      
      <button onClick={handleClick} className={classes.logoutButton}>
        <BiPowerOff />
      </button>
    </>
  );
};

export default Logout;
