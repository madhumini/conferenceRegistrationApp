import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Registration from "../src/components/Registration";
import Dashboard from "../src/components/Dashboard";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/matchers";
import "@testing-library/jest-dom";
import { toBeInTheDocument } from "@testing-library/jest-dom/matchers";
import GroupRegistrationDetailsView from "../src/components/GroupRegistrationDetailsView";

test("renders RegistrationForm component", () => {
  render(
    <BrowserRouter>
      <Registration />
    </BrowserRouter>
  );
  const registrationFormElement = screen.getByTestId("registration-form");
  expect(registrationFormElement).toBeInTheDocument();
});

test("submits single attendee registration form", () => {
  render(
    <BrowserRouter>
      <Registration />
    </BrowserRouter>
  );
  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const submitButton = screen.getByRole("button", { name: /register/i });

  fireEvent.change(nameInput, { target: { value: "John Doe" } });
  fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
  fireEvent.click(submitButton);

  // Your test assertions for the submission of a single attendee registration form go here
});

test("submits group registration form", async () => {
  render(
    <BrowserRouter>
      <Registration />
    </BrowserRouter>
  );
  const registrationTypeSelect = screen.getByLabelText(/registration type/i);
  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);
  fireEvent.change(registrationTypeSelect, { target: { value: "group" } });

  const addAttendeeButton = screen.getByRole("button", { name: /add/i });
  expect(addAttendeeButton).toBeInTheDocument();

  const submitButton = screen.getByRole("button", { name: /register/i });

  fireEvent.change(nameInput, { target: { value: "Group Leader" } });
  fireEvent.change(emailInput, {
    target: { value: "group.leader@example.com" },
  });

  // Add an attendee
  fireEvent.click(addAttendeeButton);
  const attendeeNameInput = screen.getByLabelText(/attendee name/i);
  const attendeeEmailInput = screen.getByLabelText(/attendee email/i);
  fireEvent.change(attendeeNameInput, { target: { value: "Attendee 1" } });
  fireEvent.change(attendeeEmailInput, {
    target: { value: "attendee1@example.com" },
  });
  fireEvent.click(submitButton);

  // Your test assertions for the submission of a group registration form go here
});

test("renders Dashboard component", () => {
  const user = {
    attendees: [
      {
        name: "john",
        email: "john@getDefaultNormalizer.com",
        registrationType: "group",
      },
    ],
  };
  render(
    <BrowserRouter>
      <Dashboard user={user} />
    </BrowserRouter>
  );
  const name = screen.getByLabelText(/name/i);
  const email = screen.getByLabelText(/email/i);
  expect(name).toBeInTheDocument();
  expect(email).toBeInTheDocument();
  if (user.attendees.length > 0 && user.registrationType == "group") {
    const attendeeName = screen.getByTestId("attendeeName");
    const attendeeEmail = screen.getByTestId("attendeeEmail");
    expect(attendeeName).toBeInTheDocument();
    expect(attendeeEmail).toBeInTheDocument();
  }
});

test("renders GroupRegistrationDetailsView component", () => {
  const user = {
    attendees: [
      {
        name: "john",
        email: "john@getDefaultNormalizer.com",
        registrationType: "group",
      },
    ],
  };
  render(
    <BrowserRouter>
      <GroupRegistrationDetailsView user={user} />
    </BrowserRouter>
  );
  const name = screen.getByLabelText(/name/i);
  const email = screen.getByLabelText(/email/i);
  expect(name).toBeInTheDocument();
  expect(email).toBeInTheDocument();
  if (user.attendees.length > 0 && user.registrationType == "group") {
    const attendeeName = screen.getByTestId("attendeeName");
    const attendeeEmail = screen.getByTestId("attendeeEmail");
    expect(attendeeName).toBeInTheDocument();
    expect(attendeeEmail).toBeInTheDocument();
  }
});