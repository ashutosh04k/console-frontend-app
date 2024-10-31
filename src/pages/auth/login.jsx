import CommonForm from "@/components/common/form";
// import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice/authslice";
import { message } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

const AuthLogin =() => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  // const { toast } = useToast();

  function onSubmit(event){
    event.preventDefault();
    dispatch(loginUser(formData)).then((data) =>{
      if(data?.payload?.success){
        message.success(data?.payload?.message);
      }else{
        message.error(data?.payload?.message); 
      }
    })
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground text-primaryyellow">
          Sign in to your account
        </h1>
        <p className="mt-2 text-xl text-secondaryyellow">
          Don't have an account !
          <Link
            className="font-medium ml-2 text-primarygreen hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthLogin;