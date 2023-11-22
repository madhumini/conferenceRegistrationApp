import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";

const Registration = () => {
  const [registrationType, setRegistrationType] = useState("single");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [attendees, setAttendees] = useState([]);
  const navigate = useNavigate()

  const handleAddAttendee = () => {
    setAttendees([...attendees, { name: "", email: "" }]);
  };

  const handleRemoveAttendee = (index) => {
    const updatedAttendees = [...attendees];
    updatedAttendees.splice(index, 1);
    setAttendees(updatedAttendees);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputs = { registrationType, name, email, attendees };
    const res = await axios.post("http://localhost:8800/api/auth/register", inputs);
                navigate(`/dashboard/${res?.data?.user?._id}`)
  };

  return (
    <>
      <Nav/>
    <div className="container mt-5 d-flex" data-testid="registration-form">
      <div className="col-lg-5 me-5">
        <form onSubmit={handleSubmit}>
          <h1>Registration</h1>
          <div className="mb-3 mt-5">
            <label className="form-label">Registration Type:</label>
            <select
              aria-label="registration type"
              className="form-select"
              value={registrationType}
              onChange={(e) => setRegistrationType(e.target.value)}
              >
              <option value="single">Single Attendee</option>
              <option value="group">Group</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="name-input" className="form-label">
              Name:
            </label>
            <input
              id="name-input"
              className="form-control"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              />
          </div>
          <div className="mb-3">
            <label htmlFor="email-input" className="form-label">
              Email:
            </label>
            <input
              id="email-input"
              className="form-control"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
          </div>

          {registrationType === "group" && (
            <div>
              <p>Attendees:</p>
              {attendees.map((attendee, index) => (
                <div key={index}>
                  <div className="mb-3">
                    <label htmlFor="attendee-name-input" className="form-label">
                      Attendee Name:
                    </label>
                    <input
                      id="attendee-name-input"
                      className="form-control"
                      type="text"
                      value={attendee.name}
                      onChange={(e) => {
                        const updatedAttendees = [...attendees];
                        updatedAttendees[index].name = e.target.value;
                        setAttendees(updatedAttendees);
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      className="form-label"
                      htmlFor="attendee-email-input"
                      >
                      Attendee Email:
                    </label>
                    <input
                      id="attendee-email-input"
                      className="form-control"
                      type="email"
                      value={attendee.email}
                      onChange={(e) => {
                        const updatedAttendees = [...attendees];
                        updatedAttendees[index].email = e.target.value;
                        setAttendees(updatedAttendees);
                      }}
                    />
                  </div>
                  <button
                    aria-label="Remove Attendee"
                    type="button"
                    onClick={() => handleRemoveAttendee(index)}
                    className="btn btn-danger m-3"
                    >
                    Remove Attendee
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddAttendee}
                className="btn btn-success m-3"
                aria-label="add"
                >
                Add Attendee
              </button>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary m-3"
            aria-label="register"
            >
            Register
          </button>
        </form>
      </div>
      <div className="mx-auto d-block">
        <img
          src="https://img.freepik.com/free-vector/business-conference-banners-set_1284-23088.jpg?size=626&ext=jpg&ga=GA1.1.109744881.1681130945&semt=sph"
          alt=""
          className="img-fluid rounded mx-auto top-100"
          width="500"
          height="600"
          style={{ objectFit: "cover" }}
          />
      </div>
    </div>
          </>
  );
};

export default Registration;
