import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import "./index.css";
import { BiRupee } from "react-icons/bi";
import { listingController } from "../../api/listing";
import { Carousel } from "react-responsive-carousel";
import { AiOutlineEdit } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { showModal } from "../../redux/reducer/modal";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
const Order = () => {
  const tabelHeader = [
    {
      name: "Buyer Name",
    },
    {
      name: "Product Name",
    },
    {
      name: " Image",
    },
    {
      name: "Price (in Rupees)",
    },
    {
      name: "Payment Status",
    },
    {
      name: "Payment Method",
    },
    {
      name: "Status",
    },
    {
      name: "Actions",
    },
  ];
  const dispatch = useDispatch();
  let [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const getAllOrderList = () => {
    listingController
      .getAlllOrder("")
      .then((res) => {
        toast.success("Welcome order list");
        setData(res.data.response.message);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Error in order list");
        if (err.response.data.status === 401) {
          navigate("/");
        }
      });
  };
  useEffect(() => {
    getAllOrderList();
  }, []);

  //   const Orderdetail = (value) => {
  //     console.log(value);
  //     return (
  //       <div>
  //         <div>Test</div>
  //       </div>
  //     );
  //   };
  const OrderDispatchModal = ({ value }) => {
    console.table("table", value);
    return (
      <div className="">
        <h3
          className=""
          style={{ fontSize: "23px", color: "black", textAlign: "center" }}
        >
          Order Detail's
        </h3>

        <div className="container ">
          <div className="row mt-4">
            <div className="col-sm-6">
              <label
                htmlFor="sno"
                className="bst"
                style={{ fontSize: "14px", color: "black" }}
              >
                order_id
              </label>
              <input
                type="text"
                id="sno"
                value={value.order_id}
                disabled
                className="form-control mt-1"
                style={{ fontSize: "12px", color: "black" }}
              />
            </div>
            <div className="col-sm-6">
              <label
                htmlFor="buyerName"
                className="bst"
                style={{ fontSize: "14px", color: "black" }}
              >
                Buyer's Name
              </label>
              <input
                type="text"
                id="buyerName"
                value={value.users.name}
                className="form-control mt-1"
                style={{ fontSize: "12px", color: "black" }}
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-sm-6">
              <label
                htmlFor="price"
                className="bst"
                style={{ fontSize: "14px", color: "black" }}
              >
                Price
              </label>
              <input
                type="text"
                id="price"
                value={value.cart_items.map((product) => product.price)}
                className="form-control mt-1"
                style={{ fontSize: "12px", color: "black" }}
              />
            </div>

            <div className="col-sm-6">
              <label
                htmlFor="quantity"
                className="bst"
                style={{ fontSize: "14px", color: "black" }}
              >
                quantity
              </label>
              <input
                type="text"
                id="quantity"
                value={value.cart_items.map((quantity) => quantity.quantity)}
                className="form-control mt-1"
                style={{ fontSize: "12px", color: "black" }}
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-sm-6">
              <label
                htmlFor="state"
                className="bst"
                style={{ fontSize: "14px", color: "black" }}
              >
                State
              </label>
              <input
                type="text"
                id="state"
                value={value.users.state}
                className="form-control mt-1"
                style={{ fontSize: "12px", color: "black" }}
              />
            </div>

            <div className="col-sm-6">
              <label
                htmlFor="city"
                className="bst"
                style={{ fontSize: "14px", color: "black" }}
              >
                City
              </label>
              <input
                type="text"
                id="city"
                value={value.users.city}
                className="form-control mt-1"
                style={{ fontSize: "12px", color: "black" }}
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-sm-6">
              <label
                htmlFor="phoneNumber"
                className="bst"
                style={{ fontSize: "14px", color: "black" }}
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                value={value.users.contact_no}
                className="form-control mt-1"
                style={{ fontSize: "12px", color: "black" }}
              />
            </div>
            <div className="col-sm-6">
              <label
                htmlFor="pinCode"
                className="bst"
                style={{ fontSize: "14px", color: "black" }}
              >
                Pin code
              </label>
              <input
                type="text"
                id="pinCode"
                value={value.users.pin}
                className="form-control mt-1"
                style={{ fontSize: "12px", color: "black" }}
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-sm-12">
              <label
                htmlFor="addresses"
                className="bst"
                style={{ fontSize: "14px", color: "black" }}
              >
                Addresses
              </label>
              <input
                type="text"
                id="addresses"
                value={`${value.users.address1}, ${value.users.address2}`}
                className="form-control mt-1"
                style={{ fontSize: "12px", color: "black" }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };
  const Orderdetails = (item) => {
    dispatch(showModal(<OrderDispatchModal value={item} />));
  };
  return (
    <div className="main-wrapper">
      {loading ? (
        <div class="spinner">
          <div class="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>

          <div>Loading...</div>
        </div>
      ) : (
        <div className="table-container p-2">
          <h5 className="P-2">Order Listing</h5>
          <Table hover bordered width="100%">
            <thead className="table_head">
              <tr>
                {tabelHeader.map((val, i) => (
                  <th className="title" key={i}>
                    {val.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item, id) => (
                  <tr key={id}>
                    <td
                      className="responsive-cell"
                      style={{ fontSize: "12px" }}
                    >
                      {item.users.name}
                    </td>
                    <td
                      className="responsive-cell"
                      style={{ fontSize: "12px" }}
                    >
                      {item.cart_items.map((val, id) => {
                        return <p>{val.product_name}</p>;
                      })}
                    </td>
                    <td
                      className="responsive-cell"
                      style={{ fontSize: "12px" }}
                    >
                      {item.cart_items.map((val, id) => {
                        return (
                          <td className="">
                            <img
                              src={val.image_url}
                              style={{
                                maxWidth: "70px",
                              }}
                            />
                          </td>
                        );
                      })}
                    </td>
                    <td
                      className="responsive-cell"
                      style={{ fontSize: "12px" }}
                    >
                      {item.cart_items.map((val, id) => {
                        return <p className="">{val.price}</p>;
                      })}
                    </td>
                    <td
                      className="col-sm-2 responsive-cell"
                      style={{ fontSize: "12px" }}
                    >
                      {item.payment_status == "" ||
                      item.payment_status == null ||
                      item.payment_status == "null"
                        ? "Pending"
                        : item.payment_status == true
                        ? "Done"
                        : item.payment_status == false
                        ? "Cancel"
                        : "-"}
                    </td>
                    <td
                      className="col-sm-2 responsive-cell"
                      style={{ fontSize: "12px" }}
                    >
                      {item.payment_method
                        ? item.payment_method.slice(0, 15)
                        : ""}
                    </td>
                    <td
                      className="col-sm-1 responsive-cell"
                      style={{ fontSize: "12px" }}
                    >
                      {item.status == "" ||
                      item.status == null ||
                      item.status == "null"
                        ? "-"
                        : item.status}
                    </td>
                    <td className="col-sm-1 " style={{ fontSize: "12px" }}>
                      <FaEdit
                        size={18}
                        className="pointer"
                        onClick={() => {
                          Orderdetails(item);
                        }}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      )}
      ;
    </div>
  );
};

export default Order;
