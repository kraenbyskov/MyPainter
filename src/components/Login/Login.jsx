import React from "react";
import style from "./Login.module.scss";

const Login = (props) => {
  return (
    <div className={style.Login}>
      {props.user ? (
        <p>Welcome {props.user.displayName}</p>
      ) : (
        <p
          className={style.button}
          style={{ background: "var(--red)" }}
          onClick={props.signInWithGoogle}
        >
          Log ind med Google
        </p>
      )}
    </div>
  );
};

export default Login;
