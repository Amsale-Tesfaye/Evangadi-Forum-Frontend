import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState, createContext } from "react";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import axios from "./axiosConfig";
import DetailQuestion from "./pages/DetalQuestionPage/DetailQuestion";
import PostQuestion from "./pages/PostQuestion/PostQuestion";



export const AppState = createContext();

function App() {
  const [user, setuser] = useState({});

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  async function checkUser() {
    try {
      const { data } = await axios.get("/users/check", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setuser(data);
    } catch (error) {
      console.log(error.response);
      navigate("/login");
    }
  }

  useEffect(() => {
    checkUser();
  }, [navigate]);

  return (
    <AppState.Provider value={{ user, setuser }}>
      <Routes>
        {/* <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
        <Route path="/ask-question" element={<PostQuestion />} />
        <Route path="/questions/:questionid" element={<DetailQuestion />} />

      </Routes>
    </AppState.Provider>
  );
}

export default App;
