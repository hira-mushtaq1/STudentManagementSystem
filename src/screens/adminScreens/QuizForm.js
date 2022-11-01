import React from "react";
import { useEffect, useState } from "react";
import SMInput from "../../components/SMInput";
import { sendData } from "../../config/firebasemethods";
import SMButton from "../../components/SMButton";
import { Container } from "@mui/system";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";

export default function QuizForm() {
  let [quizFormData, setQuizFormData] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [options, setOptions] = useState([]);

  let fillData = (key, value) => {
    quizFormData[key] = value;
    setQuizFormData({ ...quizFormData });
  };

  let sendQuizData = (data, node) => {
    setLoading(true);
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
    console.log(quizFormData);
  }, [quizFormData]);

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
        Quiz Form
      </Typography>

      <Container maxWidth="md" style={{ padding: "20px" }}>
        <Grid container spacing={6}>
          <Grid item md={12}>
            <SMInput
              label="Question"
              required={true}
              fullWidth={true}
              value={quizFormData.question}
              onChange={(e) => {
                fillData("Question", e.target.value);
              }}
            />
          </Grid>
          <Grid item md={12}>
            <SMInput
              label="Correct Answer"
              required={true}
              fullWidth={true}
              value={quizFormData.correctAnswer}
              onChange={(e) => {
                fillData("correctAnswer", e.target.value);
              }}
            />
          </Grid>
          <Grid item md={12}>
            <SMInput
              label="Option1"
              required={true}
              fullWidth={true}
              onChange={(e) => {
                options.push(e.target.value);
              }}
            />
          </Grid>
          <Grid item md={12}>
            <SMInput
              label="Option2"
              required={true}
              fullWidth={true}
              onChange={(e) => {
                options.push(e.target.value);
              }}
            />
          </Grid>
          <Grid item md={12}>
            <SMInput
              label="Option3"
              required={true}
              fullWidth={true}
              onChange={(e) => {
                options.push(e.target.value);
              }}
            />
          </Grid>
          <Grid item md={12}>
            <SMInput
              label="Option4"
              required={true}
              fullWidth={true}
              onChange={(e) => {
                options.push(e.target.value);
                setOptions([...options]);
                fillData("options", options);
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
