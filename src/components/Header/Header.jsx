import React from "react";
import style from "./Header.module.scss";
import UserLogin from "./UserLogin/UserLogin";
const Header = (props) => {
  return (
    <div className={style.Header}>
      <UserLogin
        user={props.user}
        signOut={props.signOut}
        signInWithGoogle={props.signInWithGoogle}
      />
    </div>
  );
};

export default Header;
