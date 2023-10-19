 'use client'
import React, {useState}from 'react';
// import Image from 'next/image';
import "./set.css";
import axios from 'axios';
// import Link from 'next/link'



const Page = () => {
  
  const [imageUrl, setImageUrl] = useState("");

  const handleFileUpload = async (event:any) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ntdxso9x");
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/ddsp5aq1k/image/upload",
      formData
    );
    setImageUrl(response.data.secure_url);
  };

  return (
    <div>
      <div className="container-xl px-4 mt-4">
        <nav className="nav nav-borders">
          <a className="nav-link active ms-0" href="https://www.bootdey.com/snippets/view/bs5-edit-profile-account-details" target="__blank"> Profile</a>
          <a className="nav-link active ms-0" href="/homee" target="__blank">Exit </a>

        </nav>
        <hr className="mt-0 mb-4" />
        <div className="row">
          <div className="col-xl-4">
            <div className="card mb-4 mb-xl-0">
              <div className="card-header">Profile Picture</div>
              <div className="card-body text-center">
                <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                {/* <Image src='/newadmin/src/Assets/LoginBg.jpg' alt ="pic" publicId={imageUrl || "default_avatar" }
                width="100"
                height="100"
                crop="fill"
                className="avatar"
              /> */}
              
                <input  id="file-input"  type="file"  accept="image/*"  onChange={(e)=>{
                handleFileUpload(e.target.value)}} />
              
              </div>
            </div>
          </div>
          <div className="col-xl-8">
            <div className="card mb-4">
              <div className="card-header">Account Details</div>
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="inputUsername"> UserName </label>
                    <input className="form-control" id="inputUsername" type="email" placeholder="Enter your new address Email" />
                  </div>
                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                    </div>
                  </div>
                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputLocation">old Password</label>
                      <input className="form-control" id="inputLocation" type="password" placeholder="Enter your password" />
                    </div>
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputLocation"> new Password</label>
                      <input className="form-control" id="inputLocation" type="password" placeholder="Enter your password" />
                    </div>
                   
                  </div>
                  <button className="btn btn-primary" type="button">Update Profile</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page; 
