// import React, { useState, useEffect } from "react";
// import style from "./Artboard.module.scss";
// import { firebase } from "../../global/Firebase/config";

// const ArtboardSelector = () => {
//   const [GetArtboards, setArtboards] = useState(null);

//   const ref = firebase.firestore().collection("Users").doc("Kræn Byskov");

//   // useEffect(() => {
//   //   ref.get().then((doc) => {
//   //     if (doc.exists) {
//   //       const board = doc.data();
//   //       setArtboards(board);
//   //     } else {
//   //       console.log("No such document!");
//   //     }
//   //   });
//   // }, []);

//   firebase
//     .firestore()
//     .collection("Users")
//     .doc("Hans")
//     .collection("Pages")
//     .doc("Hans")
//     .set({
//       Test: "test",
//     });

//   console.log(GetArtboards);

//   return (
//     <div className={style.ArtboardSelector}>
//       <div className={style.ArtboardSelector_container}>
//         <h1>Select a Artboard</h1>
//       </div>
//     </div>
//   );
// };

// export default ArtboardSelector;
