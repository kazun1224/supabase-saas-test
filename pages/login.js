import { useEffect } from "react";
import { supabase } from "../utils/supabase";
import { useUser } from "../context/user";


const Login = () => {
  const { login } = useUser();
  useEffect(login,[]);

  return <p>Logging</p>
}

export default Login;
