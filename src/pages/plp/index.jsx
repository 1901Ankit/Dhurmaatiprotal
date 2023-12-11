import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import "./index.css";
import { BiRupee } from "react-icons/bi";
import { listingController } from "../../api/listing";
import { Carousel } from "react-responsive-carousel";
import { AiOutlineEdit } from "react-icons/ai";
import { GrFormView  } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { hideModal, showModal } from "../../redux/reducer/modal";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const PLP = () => {
  let farmImage = "";

  const tabelHeader = [
    {
      name: "Seller Name",
      style: { backgroundColor: "#bbff00", color: "#fff" },
    },
    {
      name: "Product Name",
      style: { backgroundColor: "#bbff00", color: "#fff" },
    },
    {
      name: "Product Image",
      style: { backgroundColor: "#bbff00", color: "#fff" },
    },
    {
      name: "Price (in Rupees)",
      style: { backgroundColor: "#bbff00", color: "#fff" },
    },
    {
      name: "Availability",
      style: { backgroundColor: "#bbff00", color: "#fff" },
    },
    {
      name: "Description",
      style: { backgroundColor: "#bbff00", color: "#fff" },
    },
    {
      name: "View-Farm",
      style: { backgroundColor: "#bbff00", color: "#fff" },
    },
    {
      name: "Actions",
      style: { backgroundColor: "#bbff00", color: "#fff" },
    },
  ];

  const [products, setproducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const getAllProductsList = () => {
    listingController
      .getAllProducts()
      .then((res) => {
        toast.success("Welcome product list");
        setproducts(res.data.response.message.products);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Error in Product list");
        if (err.response.data.status === 401) {
          navigate("/");
        }
        console.log(err);
      });
  };
  useEffect(() => {
    getAllProductsList();
  }, []);
  const dispatch = useDispatch();
  const ProductDispatchModal = ({ value }) => {
    let [editProduct, setEditProduct] = useState({
      product_id: value.product_id,
      product_name: value.product_name,
      unit: value.unit,
      net_wt: value.net_wt,
      quantity: value.quantity,
      unit_price: value.unit_price,
      discount: value.discount,
      status: value.status,
      subscription: value.subscription,
      description: value.description,
    });

    const [errors, setErrors] = useState({
      product_name: "",
      net_wt: "",
      quantity: "",
      unit_price: "",
      discount: "",
    });

    const handleEditProduct = (e) => {
      const { id, value } = e.target;
      setEditProduct({ ...editProduct, [id]: value });

      const newErrors = { ...errors };
      if (id === "product_name" && value.trim() === "") {
        newErrors.product_name = "Please enter product name";
      } else if (id === "net_wt" && (isNaN(value) || value <= 0)) {
        newErrors.net_wt = "Please enter net worth";
      } else if (id === "quantity" && (isNaN(value) || value <= 0)) {
        newErrors.quantity = "Please enter quantity";
      } else if (id === "unit_price" && (isNaN(value) || value <= 0)) {
        newErrors.unit_price = "Please enter unit price";
      } else if (
        id === "discount" &&
        (isNaN(value) || value < 0 || value > 100)
      ) {
        newErrors.discount = "Please enter discount";
      } else {
        newErrors[id] = "";
      }
      setErrors(newErrors);
    };

    const addeditProduct = () => {
      const body = {
        product_id: editProduct.product_id,
        product_name: editProduct.product_name,
        unit: editProduct.unit,
        net_wt: editProduct.net_wt,
        quantity: editProduct.quantity,
        unit_price: editProduct.unit_price,
        discount: editProduct.discount,
        status: editProduct.status,
        subscription: editProduct.subscription,
        description: editProduct.description,
      };

      listingController
        .editproducts(body)
        .then((res) => {
          toast.success("Successfully Product Edit");
          window.location.reload();
          dispatch(hideModal());
          getAllProductsList();
        })
        .catch((err) => {
          toast.error(err.message);
          console.log(err);
        });
    };

    return (
      <div>
        <h2
          className=""
          style={{ fontSize: "23px", color: "black", textAlign: "center" }}
        >
          Product Edit
        </h2>

        <div className="container">
          <div className="row mt-4">
            <div className="col-sm-4">
              <label
                htmlFor="sno"
                className="bst"
                style={{ fontSize: "14px", color: "black" }}
              >
                Product-Id
              </label>
              <input
                type="text"
                id="product_id"
                value={editProduct.product_id}
                disabled
                className="form-control mt-1"
                style={{ fontSize: "12px", color: "black" }}
              />
            </div>

            <div className="col-sm-4">
              <div className="form-group">
                <label
                  className="bst"
                  style={{ fontSize: "14px", color: "black" }}
                >
                  Product Name
                </label>
                <input
                  id="product_name"
                  type="text"
                  onChange={handleEditProduct}
                  value={editProduct.product_name}
                  className="form-control mt-1"
                  style={{ fontSize: "12px", color: "black" }}
                  maxLength={20}
                />

                {errors.product_name && (
                  <div className="text-danger" style={{ fontSize: "13px" }}>
                    {errors.product_name}
                  </div>
                )}
              </div>
            </div>

            <div className="col-sm-4">
              <div className="form-group">
                <label
                  className="bst"
                  style={{ fontSize: "14px", color: "black" }}
                >
                  Unit
                </label>
                <select
                  id="unit"
                  onChange={handleEditProduct}
                  value={editProduct.unit}
                  className="form-control mt-1"
                  style={{ fontSize: "12px", color: "black" }}
                >
                  {/* <option value="">choose any option</option> */}
                  <option value="ML">ML</option>
                  <option value="Litre">Litre</option>
                </select>
              </div>
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-sm-4">
              <div className="form-group">
                <label
                  className="bst"
                  style={{ fontSize: "14px", color: "black" }}
                >
                  Net-Worth
                </label>
                <input
                  type="number"
                  id="net_wt"
                  onChange={handleEditProduct}
                  value={editProduct.net_wt}
                  className="form-control mt-1"
                  style={{ fontSize: "12px", color: "black" }}
                  // onInput={(e) => {
                  //   const value = e.target.value;
                  //   if (value < 0) {
                  //     e.target.value = 0;
                  //   } else if (value > 1000) {
                  //     e.target.value = 1000;
                  //     alert("You cannot enter more than 1000");
                  //   }
                  // }}
                ></input>

                {errors.net_wt && (
                  <div className="text-danger" style={{ fontSize: "13px" }}>
                    {errors.net_wt}
                  </div>
                )}
              </div>
            </div>

            <div className="col-sm-4">
              <div className="form-group">
                <label
                  className="bst"
                  style={{ fontSize: "14px", color: "black" }}
                >
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  onChange={handleEditProduct}
                  value={editProduct.quantity}
                  className="form-control mt-1"
                  style={{ fontSize: "12px", color: "black" }}
                  // onInput={(e) => {
                  //   const value = e.target.value;
                  //   if (value < 0) {
                  //     e.target.value = 0;
                  //   } else if (value > 50) {
                  //     e.target.value = 50;
                  //     alert("You cannot enter more than 50");
                  //   }
                  // }}
                ></input>
                {errors.quantity && (
                  <div className="text-danger" style={{ fontSize: "13px" }}>
                    {errors.quantity}
                  </div>
                )}
              </div>
            </div>

            <div className="col-sm-4">
              <div className="form-group">
                <label
                  className="bst"
                  style={{ fontSize: "14px", color: "black" }}
                >
                  Unit-Price
                </label>
                <input
                  type="number"
                  id="unit_price"
                  onChange={handleEditProduct}
                  value={editProduct.unit_price}
                  className="form-control mt-1"
                  style={{ fontSize: "12px", color: "black" }}
                  // onInput={(e) => {
                  //   const value = e.target.value;
                  //   if (value < 0) {
                  //     e.target.value = 0;
                  //   } else if (value > 1000) {
                  //     e.target.value = 1000;
                  //     alert("You cannot enter more than 1000");
                  //   }
                  // }}
                ></input>
                {errors.unit_price && (
                  <div className="text-danger" style={{ fontSize: "13px" }}>
                    {errors.unit_price}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-sm-4">
              <div className="form-group">
                <label
                  className="bst"
                  style={{ fontSize: "14px", color: "black" }}
                >
                  Discount
                </label>
                <div style={{ display: "flex" }}>
                  <input
                    type="number"
                    id="discount"
                    onChange={handleEditProduct}
                    value={editProduct.discount}
                    className="form-control mt-1"
                    style={{
                      fontSize: "12px",
                      width: "100%",
                      color: "black",
                      borderTopRightRadius: "0",
                      borderBottomRightRadius: "0",
                    }}
                  ></input>

                  <span
                    className="form-control mt-1"
                    style={{
                      fontSize: "12px",
                      color: "black",
                      width: "20%",
                      background: "#eee",
                      borderTopLeftRadius: "0",
                      borderBottomLeftRadius: "0",
                      padding: "10px 10px",
                    }}
                  >
                    %
                  </span>
                </div>
                {/* {errors.discount && (
                  <div className="text-danger" style={{ fontSize: "13px" }}>
                    {errors.discount}
                  </div>
                )} */}
              </div>
            </div>

            <div className="col-sm-4">
              <div className="form-group">
                <label
                  className="bst"
                  style={{ fontSize: "14px", color: "black" }}
                >
                  Status
                </label>
                <select
                  id="status"
                  value={editProduct.status}
                  onChange={handleEditProduct}
                  className="form-control mt-1"
                  style={{ fontSize: "12px", color: "black" }}
                >
                  {/* <option value="">choose any option</option> */}
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
            </div>

            <div className="col-sm-4">
              <div className="form-group">
                <label
                  className="bst"
                  style={{ fontSize: "14px", color: "black" }}
                >
                  Subscription
                </label>
                <select
                  id="subscription"
                  value={editProduct.subscription}
                  onChange={handleEditProduct}
                  className="form-control mt-1"
                  style={{ fontSize: "12px", color: "black" }}
                >
                  {/* <option value="">choose any option</option> */}
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
            </div>
          </div>

          <div className="row mt-1">
            <div className="col-sm-12">
              <div className="form-group">
                <label
                  className="bst"
                  style={{ fontSize: "14px", color: "black" }}
                >
                  Description
                </label>

                <textarea
                  id="description"
                  value={editProduct.description}
                  rows={5}
                  onChange={handleEditProduct}
                  className="form-control mt-1"
                  style={{
                    fontSize: "12px",

                    color: "black",
                  }}
                ></textarea>
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-sm-3">
              <div className="form-group">
                <button
                  className="form-control btn btn-success"
                  type="submit"
                  onClick={addeditProduct}
                  style={{
                    fontSize: "12px",
                    color: "white",
                    backgroundColor: " #b22222",
                    border: "none",
                  }}
                >
                  submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const productDetails = (item) => {
    // console.log("fghjk", item);
    dispatch(showModal(<ProductDispatchModal value={item} />));
  };

  let HandleViewClik = (item) => {
    dispatch(showModal(<HandleViewCliks value={item.contact_no} />));
  };
  const HandleViewCliks = (val) => {
    const [viewStory, setViewStory] = useState([]);
    const viewStorys = (value) => {
      listingController
        .viewstory(value)
        .then((res) => {
          setViewStory(res.data.response.message);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };

    useEffect(() => {
      // console.log("cfvgbhnj", val);
      viewStorys(9167102936);
    }, []);

    return (
      <div className="frmssa">
        {/* <h3 className="h3">Farms Adopted </h3> */}
        <h2
          className=""
          style={{ fontSize: "23px", color: "black", textAlign: "center" }}
        >
       Farms Adopted
        </h2>
        <table className="table table-bordered mt-5">
          <thead className="bg-dark text-white">
            <tr>
              <td className="" style={{ fontSize: "15px", color: "black", fontWeight:"500" }}>Farmer Name</td>
              <td className="" style={{ fontSize: "15px", color: "black", fontWeight:"500" }}>Crop</td>
              <td className="" style={{ fontSize: "15px", color: "black", fontWeight:"500" }}>Harvest_Month</td>
              <td className="" style={{ fontSize: "15px", color: "black", fontWeight:"500" }}>Sowing_Month</td>
              <td className="" style={{ fontSize: "15px", color: "black", fontWeight:"500" }}>Farm Pic</td>
              {/* <td className="bst">Details</td> */}
            </tr>
          </thead>

          {viewStory.map((val, id) => {
            val.farm_pics.map((val, id) => {
              farmImage = val.url;
              // console.log("first", farmImage);
            });

            return (
              <tbody key={id}>
                <tr key={id}>
                  <td className="postby">
                    {val.users.name ? val.users.name : "-"}
                  </td>
                  <td className="rlsa">{val.crop ? val.crop : "-"}</td>
                  <td className="rlsa">
                    {val.harvest_month ? val.harvest_month : "-"}
                  </td>
                  <td className="rlsa">
                    {val.sowing_month ? val.sowing_month : "-"}
                  </td>
                  <td className="">
                    <img
                      src={farmImage}
                      className="rlssa"
                      style={{ width: "200px", height: "120px" }}
                    />
                  </td>

                  {/* <td>
                    <button
                      className="btn btn-success"
                      type="submit"
                      onClick={() => handleEditFarm(val)}
                    >
                      Edit
                    </button>
                  </td> */}
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    );
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
        <div className="table-container p-2 ">
          {/* <div className="contact_bg">
          <div className="contact_overlay">
            <h4 className="f-49">Products Listing</h4>
          </div>
        </div> */}
          <h5 className="p-2">Products Listing</h5>
          {/* <div className="dfgh"> */}
          <Table hover bordered width="200%" className="table table-bordered">
  <colgroup>
    {tabelHeader.map((_, i) => (
      <col key={i}/>
    ))}
  </colgroup>
  <thead className="">
    <tr>
      {tabelHeader.map((val, i) => (
        <th className="title" key={i}>
          {val.name}
        </th>
      ))}
    </tr>
  </thead>
  <tbody>
    {products.map((val, i) => (
      <tr key={i}>
        <td style={{ fontSize: "12px" }}>
          {val.users.name}
        </td>
        <td style={{ fontSize: "12px" }}>{val.product_name}</td>
        <td style={{ fontSize: "12px" }}>
                    {/* <Carousel
                    showThumbs={false}
                    showIndicators={false}
                    showArrows={false}
                  > */}
                    {val.product_images.map((img, index) => (
                      <img
                        key={index}
                        src={img.url}
                        className=""
                        style={{
                          maxWidth: "70px",
                        }}
                      />
                    ))}
                    {/* </Carousel> */}
                  </td>

                  <td style={{ fontSize: "12px", width: `${100 / tabelHeader.length}%` }}>
                    <BiRupee /> {val.new_mrp}
                  </td>
                  <td style={{ fontSize: "12px" }}>{val.availability}</td>
                  <td
                    className="col-sm-4"
                    style={{
                      fontSize: "12px",
                      textAlign: "justify",
                      wordWrap: "break-word",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {val.description ? val.description : ""}
                    {/* {val.description
                                ? val.description.slice(0, 59) + "...."
                                : ""} */}
                  </td>
                  <td style={{ fontSize: "22px" }}>
                    < GrFormView 
                      className="pointer"
                      onClick={() => {
                        HandleViewClik(val);
                      }}
                    />
                  </td>
                  <td style={{ fontSize: "22px" }}>
                    <AiOutlineEdit
                      className="pointer"
                      onClick={() => {
                        productDetails(val);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* </div> */}
        </div>
      )}
      ;
    </div>
  );
};

export default PLP;
