import CommonForm from "@/components/common/form";
// import { useToast } from "@/components/ui/use-toast";
import { registerFormControls } from "@/config";
import {message} from "antd";
// import { registerUser } from "@/store/auth-slice";
import { registerUser } from "@/store/auth-slice/authslice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(e){
    e.preventDefault();
    dispatch(registerUser(formData)).then((data) =>{
      if(data?.payload?.success){
        navigate('/auth/login')
        message.success(data?.payload?.message)
      }else{
        message.error(data?.payload?.message)
      }
      
    })
  }

  console.log(formData);

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primaryyellow">
          Create new account
        </h1>
        <p className="mt-2 text-xl text-secondaryyellow">
          Already have an account !
          <Link
            className="font-medium ml-2 text-primarygreen hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthRegister;