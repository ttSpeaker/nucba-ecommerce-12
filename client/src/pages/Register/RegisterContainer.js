import Navbar from "../../components/Navbar/Navbar";
import RegisterComponent from "./RegisterComponent";
import { useState } from "react";
import { BACK_URL } from "../../config/config";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [isSubmitting, setSubmitting] = useState();
  const navigate = useNavigate();

  const submit = async (value) => {
    try {
      setSubmitting(true);
      const response = await axios.post(
        BACK_URL + "/auth/register",
        value
      );
      setSubmitting(false);
      navigate('/login')
    } catch (error) {
      setSubmitting(false);
      console.log(error);
    }
  };
  return (
    <div>
      <Navbar />
      <RegisterComponent submit={submit} isSubmitting={isSubmitting} />
    </div>
  );
}
