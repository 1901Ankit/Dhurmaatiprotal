import React, { useEffect, useState } from "react";
import "./index.css";
import Input from "../input";
import listingController from "../../api/listing";
import authControllers from "../../api/auth";
import { useDispatch } from "react-redux";
import { hideModal, showModal } from "../../redux/reducer/modal";
import { toast } from "react-toastify";
import { Link, Router, useLocation, useNavigate } from "react-router-dom";
import {
  AiOutlineLogout,
  AiOutlineMenu,
  AiOutlineSearch,
  AiOutlineUser,
} from "react-icons/ai";
import Button from "../button";

import { Tooltip } from "react-bootstrap";
const Header = () => {
  const [show, setShow] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [tooltip, setToolTip] = useState(false);
  let dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === "/") {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [show, location.pathname]);

  if (show) {
    const logout = () => {
      authControllers
        .logout()
        .then((res) => {
          toast.success("Successfully logout");
          dispatch(hideModal());
          localStorage.clear();
          navigate("/");
          // alert(res.data.response.message);
        })
        .catch((err) => {
          toast.error(err.message);
          localStorage.clear();
          navigate("/");
        });
    };
    return (
      <div className="wrapper_header">
        <div className="header p-2">
          <div className="wrapper_search">
            <form>
              <Input border="none" rounded="8px" placeholder="Search" />
              <Button bg="transparent" border="none" padding="5px">
                <AiOutlineSearch className="icon_search" />
              </Button>
            </form>
          </div>
          <Button
            border="none"
            bg="transparent"
            // width="0px"
            onClick={() => setToolTip(!tooltip)}
          >
            <AiOutlineLogout
            size={25}
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
            />
            {/* <AiOutlineMenu />
            <AiOutlineUser /> */}
          </Button>
          {tooltip ? <div className="tooltip">test</div> : <></>}
        </div>
      </div>
    );
  } else {
    <></>;
  }
};

export default Header;
