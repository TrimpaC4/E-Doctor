'use client'
import React, { useEffect } from 'react'
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';
import Navbar from "../navbar/page";
import { useSearchParams } from 'next/navigation';
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store";
import {
  getAllDoctors,
  removeDoctor,
  updateDoctorVerification,
} from "../store/doctorSlice";
import "./style.css";

const page = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllDoctors());
  }, []);
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    console.log("this is doctor",searchParams.get('id'))
    const doctor = useSelector((state: RootState) =>
    state.doctor.allDoctors.find((doctor) => doctor.id === Number(id) )
    
  );
  return (
    <div>
        <Navbar />
        <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
              <MDBBreadcrumbItem active>{doctor?.name} Profile</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src={doctor?.avatarUrl}
                  alt="avatar"
                  className="image"
                  style={{ width: '150px' }}
                  fluid />
                <p className="text-muted mb-1">{doctor?.department}</p>
                <p className="text-muted mb-4">{doctor?.address}</p>
                <div className="d-flex justify-content-center mb-2">
                  {!!doctor?.isVerified ? (
                <i style={{fontSize:"24px"}} className  ="fa">&#xf058;</i>
              ) : (
                  <MDBBtn outline className="ms-1" onClick={() => {
                    dispatch(
                      updateDoctorVerification({
                        doctorId: doctor?.id,
                        isVerified: true,
                      })
                    );
                  }}>Verify</MDBBtn>
                  )}
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{doctor?.name}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{doctor?.email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{doctor?.phone}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>CIN</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{doctor?.cin}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Age</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{doctor?.age}</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
    </div>
  )
}

export default page


