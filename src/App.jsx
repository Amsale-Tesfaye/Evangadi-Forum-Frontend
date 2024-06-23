import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState, createContext } from "react";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Header from "./pages/Header/Header";
import axios from "./axiosConfig";
import DetailQuestion from "./pages/DetalQuestionPage/DetailQuestion";
import PostQuestion from "./pages/PostQuestion/PostQuestion";
import Footer from "./pages/Footer/Footer";


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
        <Route path="/header" element={<Header />} />

        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ask-question" element={<PostQuestion />} />
        <Route path="/questions/:questionid" element={<DetailQuestion />} />

        <Route path="/footer" element={<Footer />} />
      </Routes>
    </AppState.Provider>
  );
}

export default App;
