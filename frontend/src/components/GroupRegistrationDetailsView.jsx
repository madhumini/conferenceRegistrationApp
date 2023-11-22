import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "./Nav";

const GroupRegistrationDetailsView = () => {
  const [user, setUser] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getDashboardDetails = async () => {
      const res = await axios.get(
        `http://localhost:8800/api/user/getRegistrationDetails/${id}`
      );
      setUser(res.data);
    };
    getDashboardDetails();
  }, [id]);

  return (
    <>
      <Nav/>
    <div className="container mt-5 d-flex">
      <div className="col-lg-5">
        <h1 className="mt-5">User Dashboard</h1>
        <p className="m-5" aria-label="name">
          <b className="me-3">Name :</b> {user.name}
        </p>
        <p className="m-5" aria-label="email">
          <b className="me-3">Email :</b> {user.email}
        </p>

        {user.registrationType === "group" && (
          <div>
            <p>Group Registration Details :</p>
            <ul>
              {user.attendees.map((attendee, index) => (
                <li key={index}>
                  <p>
                    <b> Attendee {index + 1} : </b>
                    <br />
                  </p>
                  <p data-testid="attendeeName">
                    name : {attendee.name} <br />
                  </p>

                  <p data-testid="attendeeEmail"> email : {attendee.email}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mx-auto d-block">
        <img
          src="https://media.istockphoto.com/id/1184657554/vector/group-of-businesspeople-at-the-video-conference-call-vector-flat-cartoon-illustration-online.jpg?s=612x612&w=0&k=20&c=eOiHz9R4XxIsBcBfE87TVYfy9FehRjXHI4QFE0MtLQ0="
          alt=""
          className="img-fluid rounded mx-auto top-100"
          width="900"
          height="600"
          style={{ objectFit: "cover" }}
          />
      </div>
    </div>
          </>
  );
};

export default GroupRegistrationDetailsView;
