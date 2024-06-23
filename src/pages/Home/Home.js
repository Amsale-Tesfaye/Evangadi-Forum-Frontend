
import { useContext, useEffect, useState } from 'react';
import { AppState } from '../../App';
import { useNavigate, Link} from "react-router-dom";
import axios from '../../axiosConfig';
import { FaArrowRight } from "react-icons/fa";
import classes from "./Home.module.css"
 import Header from '../Header/Header';
// import Footer from "../Footer/Footer";
import { CgProfile } from "react-icons/cg";

function Home() {
  const {user} = useContext(AppState);
  const navigate= useNavigate ()
// const { questionid } = useParams();
// function getDetailQuestions(questionid) {
//   navigate(`/question/${questionid}`);
// }
const [question, setQuestion] = useState([]);
function moreDetail(questionid) {
  navigate(`/questions/${questionid}`);
}
useEffect(() => {
  async function fetchQuestions() {
    try {

      const { data } = await axios.get("/questions/get-all-questions", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log(data);
      setQuestion(data);
    } catch (error) {
      console.log(error.response);
    }
  }
  fetchQuestions();
}, [setQuestion]);

  return (
    <section className={classes.mainHome}>
      <Header />
      {/* <h1>Home</h1> */}
      <div className={classes.homeContainer}>
        <div>
          <div className={classes.subHeader}>
            <div className={classes.Ask}>
              <hr />
              <Link to="/ask-question"> Ask Question</Link>
            </div>
            <div className={classes.welcome}>
              <br />
              <h2> Wellcome: {user.username}</h2>
              <br />
              <hr />
            </div>
          </div>
        </div>

        <div className={classes.questionContainer}>
          <h4>Questions</h4>
          {question.map((q) => (
            <div
              className={classes.questionItem}
              onClick={() => moreDetail(q.questionid)}
              key={q.questionid}
            >
              <div className={classes.profileAndTitle}>
                <CgProfile size={60} />
                <hr />
                <p>{q.username}</p>
              </div>
              <div className={classes.questionTitle}>{q.title}</div>
              <div>
                <FaArrowRight />
              </div>

              <br />
            </div>
          ))}
        </div>
      </div>
      <br />

      {/* <Footer /> */}
    </section>
  );

}

export default Home;
