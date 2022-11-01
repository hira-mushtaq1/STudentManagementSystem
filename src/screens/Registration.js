import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import SMDatepicker from "../components/SMDatepicker";
import setValue from "../components/SMDatepicker";
import SMDropdown from "../components/SMDropdown";
import SMInput from "../components/SMInput";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import SMButton from "../components/SMButton";
import { Container } from "@mui/system";
import { sendData } from "../config/firebasemethods";

function Registration() {
  const [studentRegistration, setStudentRegistration] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  let currentDate = new Date();

  // method for data filling
  let fillData = (key, value) => {
    studentRegistration[key] = value;
    setStudentRegistration({ ...studentRegistration });
  };

  let sendRegistrationData = (data, node) => {
    setLoading(true);
    fillData(
      "age",
      currentDate.getFullYear() - studentRegistration.dateOfBirth.year
    );
    fillData("registrationDate", currentDate);
    fillData("registrationYear", currentDate.getFullYear());
    fillData("isFeesSubmitted", true);
    fillData("isApproved", true);
    fillData("isActive", true);

    sendData(data, node)
      .then((success) => {
        setLoading(false);
        console.log(success);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        setError(err);
      });
  };

  useEffect(() => {
    console.log(studentRegistration);
  }, [studentRegistration]);
  return (
    <>
      <Typography
        textAlign={"center"}
        variant="h2"
        gutterBottom
        margin={"10px"}
        color={"primary"}
        fontWeight="bolder"
      >
        Student Registration System
      </Typography>

      <Container maxWidth="lg">
        <Grid spacing={6} container>
          <Grid item md={4}>
            <SMInput
              label="First Name"
              required={true}
              value={studentRegistration.firstName}
              onChange={(e) => {
                fillData("firstName", e.target.value);
              }}
            />
          </Grid>
          <Grid item md={4}>
            <SMInput
              label="Last Name"
              required={true}
              value={studentRegistration.lastName}
              onChange={(e) => {
                fillData("lastName", e.target.value);
              }}
            />
          </Grid>
          <Grid item md={4}>
            <SMDropdown
              label="Course"
              value={studentRegistration.course}
              data={[
                {
                  id: "HTML",
                  displayName: "Hyper Text Markup Language",
                },
                {
                  id: "IELTS",
                  displayName: "English LAnguage",
                },
                {
                  id: "security",
                  displayName: "Cyber Security",
                },
                {
                  id: "networking",
                  displayName: "Networking",
                },
                {
                  id: "DS",
                  displayName: "Data Structures & Data Science",
                },
                {
                  id: "DBMS",
                  displayName: "Database Management System",
                },
                {
                  id: "warehouse",
                  displayName: "Data Warehousing",
                },
                {
                  id: "dataMining",
                  displayName: "Data Mining",
                },
              ]}
              onChange={(e) => {
                fillData("course", e.target.value);
              }}
            />
          </Grid>
          <Grid item md={4}>
            <SMDropdown
              label="Section"
              value={studentRegistration.section}
              data={[
                {
                  id: "a",
                  displayName: "Section A",
                },
                {
                  id: "b",
                  displayName: "Section B",
                },
              ]}
              onChange={(e) => {
                fillData("section", e.target.value);
              }}
            />
          </Grid>
          <Grid item md={4}>
            <SMInput
              label="Contact"
              required={true}
              value={studentRegistration.contact}
              onChange={(e) => {
                fillData("contact", e.target.value);
              }}
            />
          </Grid>
          <Grid item md={4}>
            <SMInput
              label="CNIC"
              required={true}
              value={studentRegistration.cnic}
              onChange={(e) => {
                fillData("cnic", e.target.value);
              }}
            />
          </Grid>
          <Grid item md={4}>
            <SMInput
              label="Father Name"
              required={true}
              value={studentRegistration.fatherName}
              onChange={(e) => {
                fillData("fatherName", e.target.value);
              }}
            />
          </Grid>
          <Grid item md={4}>
            <SMInput
              label="Father CNIC"
              value={studentRegistration.fatherCnic}
              onChange={(e) => {
                fillData("fatherCnic", e.target.value);
              }}
            />
          </Grid>
          <Grid item md={4}>
            <SMInput
              label="Father Contact"
              required={true}
              value={studentRegistration.fatherContact}
              onChange={(e) => {
                fillData("fatherContact", e.target.value);
              }}
            />
          </Grid>
          <Grid item md={4}>
            <SMInput
              label="Emergency Contact"
              required={true}
              value={studentRegistration.emergencyContact}
              onChange={(e) => {
                fillData("emergencyContact", e.target.value);
              }}
            />
          </Grid>
          <Grid item md={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date Of Birth"
                onChange={(newValue) => {
                  setValue(newValue);
                  fillData("dateOfBirth", {
                    day: newValue.$D,
                    month: newValue.$M,
                    year: newValue.$y,
                  });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "center", margin: "50px" }}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              <SMButton
                onClick={() => {
                  sendRegistrationData(studentRegistration, "studentsData/");
                }}
                label="Submit"
                color="primary"
                padding="10px 80px"
              />
              <Typography variant="caption" gutterBottom color={"error"}>
                {error}
              </Typography>
            </>
          )}
        </Box>
      </Container>
    </>
  );
}

export default Registration;
