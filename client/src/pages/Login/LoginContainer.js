import Navbar from "../../components/Navbar/Navbar";
import LoginComponent from "./LoginComponent";
import { useState } from "react";
import { BACK_URL } from "../../config/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isSubmitting, setSubmitting] = useState();
  const navigate = useNavigate();

  const submit = async (value) => {
    try {
      setSubmitting(true);
      const response = await axios.post(BACK_URL + "/auth/login", value);
      setSubmitting(false);
      
      if (response.data && response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
      }
      navigate("/");
    } catch (error) {
      setSubmitting(false);
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <LoginComponent submit={submit} isSubmitting={isSubmitting} />
    </div>
  );
}
