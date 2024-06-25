import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import classes from "./Register.module.css"

function Register() {
  const navigate = useNavigate();
  const usernameDom = useRef();
  const firstnameDom = useRef();
  const lastnameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const usernameValue = usernameDom.current.value;
    const firstValue = firstnameDom.current.value;
    const lastValue = lastnameDom.current.value;
    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;

    if (
      !usernameValue ||
      !firstValue ||
      !lastValue ||
      !emailValue ||
      !passValue
    ) {
      alert("please provide all required information");
      return;
    }
    try {
      await axios.post("/users/register", {
        username: usernameValue,
        firstname: firstValue,
        lastname: lastValue,
        email: emailValue,
        password: passValue,
      });
      alert("register sucessful. Please login");
      navigate("/login");
    } catch (error) {
      alert("something went wrong!");
      console.log(error.response);
    }
  }

  return (
    <section>
      <Header />
      <div className={classes.main_section}>
        <div className={classes.rightContainer}>
          <h3>Join the Network </h3>
          <p>
            Already have an account? <Link to={"/login"}> Sign In </Link>
          </p>

          <form onSubmit={handleSubmit}>
            <div>
              {/* <span>Username :---</span> */}
              {/* <input ref={usernameDom} type="text" placeholder="username" />
               */}
              <textarea
                ref={usernameDom}
                type="usertname"
                rows="2"
                cols="60"
                placeholder="User name"
              ></textarea>
            </div>

            <div className="classes.names">
              <div>
                {/* <span>First name :---</span> */}
                {/* <input ref={firstnameDom} type="text" placeholder="First name" /> */}
                <textarea
                  ref={firstnameDom}
                  type="firstname"
                  rows="2"
                  cols="60"
                  placeholder="First name"
                ></textarea>
              </div>

              <div>
                {/* <span>Last name :---</span> */}
                {/* <input ref={lastnameDom} type="text" placeholder="Last name" /> */}
                <textarea
                  ref={lastnameDom}
                  type="lasttname"
                  rows="2"
                  cols="60"
                  placeholder="Last name"
                ></textarea>
              </div>
            </div>

            <div>
              {/* <span>Email :---</span> */}
              {/* <input ref={emailDom} type="email" placeholder="Email Adress" /> */}
              <textarea
                ref={emailDom}
                type="email"
                rows="2"
                cols="60"
                placeholder="Your  Email"
              ></textarea>
            </div>

            <div>
              {/* <span>Password :---</span> */}
              {/* <input ref={passwordDom} type="password" placeholder="Password" /> */}
              <textarea
                ref={passwordDom}
                type="password"
                rows="2"
                cols="60"
                placeholder="Password"
              ></textarea>
            </div>
            <button type="submit">Agree and Join</button>
            <p>I agree to the privacy policy and terms of service. </p>
            <Link to={"/login"}> Already have an account </Link>
          </form>
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

export default Register;
