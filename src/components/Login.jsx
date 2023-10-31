import React from "react";
import TextBox from "./TextBox";
import Button from "./Button";

const Login = () => {
  return (
    <div className="bg-slate-700 rounded shadow-lg h-96 w-80 flex flex-col justify-start items-center gap-2 p-8">
      <TextBox ph="password" newclass="bg-red-600" />
      <div className="grow"></div>
      <Button
        title="Login"
        onClick={() => {
          console.log("salam");
        }}
      />
    </div>
  );
};

export default Login;
