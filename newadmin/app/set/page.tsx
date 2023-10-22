"use client";
import React, { useState } from "react";
// import Image from 'next/image';
import "./set.css";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

const Page = () => {
  const [imageUrl, setImageUrl] = useState<any>("");
  const [adminName, setAdminName] = useState<any>("");
  const [oldPassword, setOldPassword] = useState<any>("");
  const [newPassword, setNewPassword] = useState<any>("");
  const [message, setMessage] = useState<any>("");
  const [update, setUpdate] = useState<any>("");

  const profileUpload = async (e: any) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", "oztadvnr");
    await axios
      .post("https://api.cloudinary.com/v1_1/dl4qexes8/upload", formData)
      .then((response) => {
        console.log(response.data["secure_url"]);
        setImageUrl(response.data["secure_url"]);
      })
      .catch((error) => {
        throw error;
      });
  };

  const handleUpdatePassword = async (body: any) => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/AdminDoc/update-password",
        body
      );
      setUpdate("true");
    } catch (error) {
      setUpdate("false");
    }
  };
  const handleError = () => {
    if (update === "true") {
      return (
        <div
          className="card"
          style={{ width: "8rem !important", textAlign: "center" }}
        >
          <div className="card-body">
            <h5 className="card-title">Password updated succesfully</h5>
          </div>
        </div>
      );
    } else if (update === "false") {
      return (
        <div
          className="card"
          style={{ width: "8rem !important", textAlign: "center" }}
        >
          <div className="card-body">
            <h5 className="card-title"> Password or user name wrong </h5>
          </div>
        </div>
      );
    } else {
      return null;
    }
  };
  return (
    <div>
      <div className="container-xl px-4 mt-4">
        <nav className="nav nav-borders">
          <button className="btn btn-primary" type="button" >
           <Link href='/homee' id="homeebtn"> home </Link>
          </button>
        </nav>
        <hr className="mt-0 mb-4" />
        <div className="row">
          <div className="col-xl-4">
            <div className="card mb-4 mb-xl-0">
              <div className="card-header">Profile Picture</div>
              <div className="card-body text-center">
                <div className="small font-italic text-muted mb-4">
                  JPG or PNG no larger than 5 MB
                </div>

                <img
                  src={imageUrl}
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                  }}
                  alt=""
                />

                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    profileUpload(e);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-xl-8">
            <div className="card mb-4">
              <div className="card-header">Account Details</div>
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="inputUsername">
                      {" "}
                      UserName{" "}
                    </label>
                    <input
                      className="form-control"
                      id="inputUsername"
                      type="email"
                      placeholder="Enter your new address Email"
                      onChange={(e: any) => {
                        setAdminName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="row gx-3 mb-3">
                    <div className="col-md-6"></div>
                  </div>
                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputLocation">
                        old Password
                      </label>
                      <input
                        className="form-control"
                        id="inputLocation"
                        type="password"
                        placeholder="Enter your password"
                        onChange={(e: any) => {
                          setOldPassword(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputLocation">
                        {" "}
                        new Password
                      </label>
                      <input
                        className="form-control"
                        id="inputLocation"
                        type="password"
                        placeholder="Enter your password"
                        onChange={(e: any) => {
                          console.log(e.target.value);
                          setNewPassword(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => {
                      handleUpdatePassword({
                        adminName,
                        oldPassword,
                        newPassword,
                      });
                    }}
                  >
                    Update Profile
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {handleError()}
    </div>
  );
};

export default Page;
