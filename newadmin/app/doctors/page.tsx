"use client";
import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store";
import {
  getAllDoctors,
  removeDoctor,
  updateDoctorVerification,
} from "../store/doctorSlice";
import Navbar from "../navbar/page";
import "./style.css";
import Link from 'next/link'
interface doctorType {
  id: number;
  name: string;
  avatarUrl: string;
  department: string;
  isVerified: boolean;
}
const DoctorsList = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllDoctors());
  }, []);
  const allDoctors: Array<doctorType> = useSelector(
    (state: RootState) => state.doctor.allDoctors
  );
  console.log("doctors", allDoctors);

  return (
    <div>
      <Navbar />
      <div
        style={{
          display: "grid",
          flexWrap: "wrap",
          justifyContent: "center",
          gridTemplateColumns: "auto auto auto auto",
        }}
      >
        {allDoctors.map((doctor: any) => (
          <Link href={{
            pathname: '/doctorprofile/',
            query: { id : doctor.id }, 
          }}>
          <Card key={doctor.id} sx={{ maxWidth: 345, margin: "10px" }}>
            <CardMedia
              component="img"
              image={doctor.avatarUrl}
              alt={doctor.name}
              className="images"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {doctor.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {doctor.department}
              </Typography>
            </CardContent>
            <CardActions>
              {/* {!!doctor.isVerified ? (
                <i style={{fontSize:"24px"}} className  ="fa">&#xf058;</i>
              ) : (
                <Button
                  size="small"
                  onClick={() => {
                    dispatch(
                      updateDoctorVerification({
                        doctorId: doctor.id,
                        isVerified: true,
                      })
                    );
                  }}
                >
                  Verify
                </Button>
              )} */}
              <Button
                size="small"
                onClick={() => {
                  dispatch(removeDoctor(doctor.id));
                }}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
