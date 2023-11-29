const request = require("supertest");
const app = require("../../backend"); 

describe("Registration Endpoints", () => {
  let RegistrationId; 

  it("should register a single attendee", async () => {
    const response = await request(app).post("/api/auth/register").send({
      name: "John Doe",
      email: "john.doe@example.com",
      registrationType: "single",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("user");
    expect(response.body.user.name).toBe("John Doe");
    expect(response.body.user.email).toBe("john.doe@example.com");

  });

  it("should register a group of attendees", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Group Leader",
        email: "group.leader@example.com",
        registrationType: "group",
        attendees: [
          { name: "Attendee 1", email: "attendee1@example.com" },
          { name: "Attendee 2", email: "attendee2@example.com" },
        ],
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("user");
    expect(response.body.user.name).toBe("Group Leader");
    expect(response.body.user.email).toBe("group.leader@example.com");
    expect(response.body.user.attendees).toHaveLength(2);
    expect(response.body.user.attendees[0].name).toBe("Attendee 1");
    expect(response.body.user.attendees[1].name).toBe("Attendee 2");

    RegistrationId = response.body.user._id;

  });

  it("should get Group Registration details", async () => {

    const response = await request(app).get(
      `/api/user/getRegistrationDetails/${RegistrationId}`
    );

    expect(response.status).toBe(200);
  });
});

