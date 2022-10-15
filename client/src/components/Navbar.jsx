import React, { useState,useEffect } from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Upload from "./Upload";
import axios from "axios";
import bellImg from "../img/notification.png"
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
// import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Notifications from "react-notifications-menu";
// import { width } from "@mui/system";
// import { Card } from "@mui/material";
const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};

`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;
const not = {
  image:bellImg,
  message: "",
  detailPage: "/",
  receivedTime:"",
}
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const [notifications, setnotification] = useState([]);
  const handlelogout = async () => {
    // console.log(document.cookie);

    const result = await axios.post('/auth/signout')
      .catch((Err) => console.log(Err));
    console.log(result);
    if (result.data.success) {
      dispatch(logout());
    }
  };
  useEffect(() => {
    const handleNotification = async () => {
      const result = await axios
        .get(`users/getNotification/${currentUser._id}`)
        .catch((err) => console.log(err));
      console.log(result.data);
      const newNotifications = []
      result.data.forEach(element => {
        const newMessage = not;
        newMessage.message = element;
        newNotifications.push(newMessage)
      });
      
      setnotification(newNotifications);
      console.log(notifications)
    }
    handleNotification();
  }, [])// eslint-disable-line react-hooks/exhaustive-deps
  
  
    return (
      <>
      <Container>
        <Wrapper>
          <Search>
            <Input
              placeholder="Search"
              onChange={(e) => setQ(e.target.value)}
            />
            <SearchOutlinedIcon onClick={()=>navigate(`/search?q=${q}`)}/>
          </Search>
          {currentUser ? (
            <User>
                {currentUser.is_creator && <VideoCallOutlinedIcon onClick={() => setOpen(true)} />}
                <Notifications  icon={bellImg} data={notifications} />
                {/* <NotificationsNoneIcon onClick={handleNotification} />
                {showNotifications && 
                  notifications.map((notif)=>{
                    return (
                      <><div className="notifClass"
                      style={{display:"block"}}>{notif}</div><br/></>
                    )
                  })
                } */}
              
              <Avatar src={currentUser.img} />
              {currentUser.name}
                <Button onClick={handlelogout}>
                  <AccountCircleOutlinedIcon />
                  Signout
              </Button>
              
            </User>
          ) : (
            <Link to="signin" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleOutlinedIcon />
                Sign in
              </Button>
            </Link>
          )}
         
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
    </>
  );
};

export default Navbar;
