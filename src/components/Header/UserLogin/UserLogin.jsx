import React from "react";
import style from "./UserLogin.module.scss";

const UserLogin = (props) => {
  console.log(props);
  return (
    <div>
      {props.user ? (
        <h3 className={style.UserLogin_Profile} onClick={props.signOut}>
          <span style={{ backgroundImage: `url(${props.user.photoURL})` }} />
          {props.user.displayName}
        </h3>
      ) : (
        <p onClick={props.signInWithGoogle}>Log ind med Google</p>
      )}
    </div>
  );
};

export default UserLogin;
