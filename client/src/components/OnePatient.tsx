import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import "../../app/style.css"
interface appProps {
  appo: any
}
const OnePatient = ({ appo }: appProps) => {
  console.log(appo);
  
  const ellipsis = faEllipsisVertical as IconProp;
  return (

    <div className='OnePatient'>
      <div className='OnePatient-details'>
        <div className="DoctorProfile-th">
          <div className="DoctorProfile-patient-done">
            <div className="DoctorProfile-image-frame3">
              <img
                src={appo.patients.avatarUrl}
                alt="patinet-image"
              />
            </div>
            <div className="DoctorProfile-appointment-requests-list-container-request-details">
              <span className="DoctorProfile-appointment-requests-list-container-request-details-name">
                {appo.patients.name}
              </span>
            </div>
          </div>
        </div>
        <span>{appo.id}</span>
        <span>{appo.date}</span>
        <span>{appo.patients.gender.toUpperCase()}</span>
        <span>{appo.disease.slice(0, 14)}...</span>
        <span>Out-Patient</span>
      </div>

      <FontAwesomeIcon icon={ellipsis} />

    </div>
  )
}

export default OnePatient