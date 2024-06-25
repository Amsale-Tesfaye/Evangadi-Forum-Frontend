import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../axiosConfig";
import classes from "./Login.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";




function Login() {
  const navigate = useNavigate();
  const emailDom = useRef();
  const passwordDom = useRef();

  async function handleSubmit(e) {
    e.preventDefault();

    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;

    if (!emailValue || !passValue) {
      alert("please provide all required information");
      return;
    }
    try {
      const { data } = await axios.post("/users/login", {
        email: emailValue,
        password: passValue,
      });
      alert("login sucessful. ");

      localStorage.setItem("token", data.token);

      navigate("/");
      console.log(data);
    } catch (error) {
      alert(error?.response?.data?.msg);
      console.log(error.response.data);
    }
  }

  return (
    <section>
      <Header />
      <div className={classes.main_section}>
        <div className={classes.rightContainer}>
          <button type="submit">
            <form onSubmit={handleSubmit}>
              <div>
                <h2>Login to your account</h2>
                <br />
                <p>
                  Don't have an account?
                  <Link to="/register"> Create a new account</Link>
                </p>
              
              </div>
              <div>
                <textarea
                  ref={emailDom}
                  type="email"
                  rows="3"
                  cols="60"
                  placeholder="Your  Email"
                ></textarea>
              </div>
              <br />

              <div>
                <textarea
                  ref={passwordDom}
                  type="password"
                  rows="3"
                  cols="60"
                  placeholder="Your Password"
                ></textarea>
                
                <button type="submit">Submit</button>
                <br />
                <div className="classes.forget">
                  <button type="submit">Forget Password?</button>
                </div>
              </div>
              
            </form>

            {/* <Link to="/register"> register</Link> */}
          </button>
        </div>

        <div className={classes.leftContainer}>
          <div>
            <h1>About</h1>
            <br />
            <h1>Evangadi Networks</h1>
            <br />
            <br />
            <h4>
              No matter what stage of life you are in, whether you're just
              starting elementery school or being promoted to CEO of a Fortune
              500 company, you have much to offer to those who are trying to
              follow in your footsteps. Wheather you are willing to share your
              knowledge or you are just looking to meet mentors of your own,
              please start by joining the network here.
            </h4>
            <br />
            <h3>HOW IT WORKS</h3>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default Login;
