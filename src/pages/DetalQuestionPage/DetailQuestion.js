import React, {useEffect, useState, useRef} from 'react'
import { useParams } from 'react-router-dom';
import axios from "../../axiosConfig";
import classes from "./DetailQuestion.module.css"
import { CgProfile } from "react-icons/cg";
import Header from "../Header/Header"

function DetailQuestion() {
  const [question, setQuestion] = useState(null);
const [values, setValues] = useState();
const { questionid } = useParams()
  const token = localStorage.getItem("token");
  const [isloading, setIsloading] = useState(false);



                /////////////////////
                //DETAIL QUESTION

  useEffect(() => {
    console.log("/questions/get-detail-questions/:questionid", questionid);
    async function QuestionDetails() {
      try {
        const response = await axios.get(
          `/questions/get-detail-questions/${questionid}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
       console.log(response.data[0]);
        setQuestion(response.data[0]);
      } catch (error) {
        console.error("Error with question details:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
        }
      }
    }
    QuestionDetails();
  }, [questionid]);


            ////////////////////////////
            //POST ANSWER

const answerName = useRef();
async function sendAnswer(e) {
  e.preventDefault();
  const answerValue = answerName.current.value;
  if (!answerValue) {
    alert("Please provide all required information");
    return;
  }
  try {
    setIsloading(true);
    await axios.post(
      `/answers/post-answer/${questionid}`,
      {
        answer: answerValue,
        questionid: questionid,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    alert("Your answer has been posted");

    //empty answer
    answerName.current.value = "";
    setIsloading(false);
  } catch (error) {
    console.log(error);
    setIsloading(false);
  }
}

        ///////////////////////
        /// GET ANSWERS
async function getAllAnswer() {
  try {
    const respond = await axios.get(`/answers/get-all-answers/${questionid}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    setValues(respond.data);
  } catch (error) {
    console.error("Error with question details:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
    }
  }
}
useEffect(() => {
  getAllAnswer();
}, [isloading]);

console.log(values)


  return (
    <div>
      <Header />
      <h1>Question</h1>
      <h4>{question?.title}</h4>
      <br />
      <p>{question?.description}</p>
      <hr />
      <br />
      <div className={classes.community}>
        <h3>Answer From Community</h3>
      </div>

      <hr />
      <div className={classes.answers_section}>
        <CgProfile size={70} />
        {values?.map((value, i) => (
          <div key={i} className={classes.answer}>
            <div className={classes.answer_username}>{value.username}</div>

            <div className={classes.answer_text}> {value.answer}</div>
          </div>
        ))}
      </div>

      <form onSubmit={sendAnswer} className={classes.answer_form}>
        <h2>Answer The Top Question </h2>
        <p>Go to Question page</p>
        <textarea
          ref={answerName}
          rows="5"
          cols="90"
          placeholder="Enter your answer"
          className={classes.textarea}
        ></textarea>

        <button type="submit" className={classes.submit_button}>
          {isloading ? "posting..." : " Post Answer"}
        </button>
      </form>
    </div>
  );
}

export default DetailQuestion