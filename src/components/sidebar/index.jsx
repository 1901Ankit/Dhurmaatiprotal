import React, { useEffect, useState } from "react";
import "./index.css";
import { AiOutlineDashboard, AiOutlineUnorderedList } from "react-icons/ai";
import { BiLogoAndroid } from "react-icons/bi";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../assests/image/mati.png";
const Sidebar = () => {
  const [show, setShow] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [show, location.pathname]);
  const routeUrl = [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: <AiOutlineDashboard className="me-1" />,
    },
    {
      name: "Product List",
      url: "/product-list",
      icon: <AiOutlineUnorderedList className="me-1" />,
    },
    {
      name: "order list",
      url: "/order-list",
      icon: <AiOutlineUnorderedList className="me-1" />,
    },
  ];

  if (show) {
    return (
      <div className="wrapper">
        <div className="sidebar">
          <div className="border-bottom text-center p-2 mb-2">
            {/* <BiLogoAndroid size={50} /> */}
            <img src={logo} width={120} className="mt-3"/>
          </div>
          {routeUrl.map((val, i) => (
            <NavLink key={i} to={val.url} className="router_link mb-1 p-2">
              {val.icon}
              {val.name}
            </NavLink>
          ))}
        </div>
      </div>
    );
  } else {
    <></>;
  }
};

export default Sidebar;
