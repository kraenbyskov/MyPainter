import FrontPage from "../../pages/FrontPage/Front";
import Artboard from "../../pages/SelectArtboard/Artboard";

const Routes = [
  {
    id: 1,
    name: "Artboard",
    path: "/Artboard",
    exact: false,
    Component: Artboard,
  },
  {
    id: 2,
    name: "FrontPage",
    path: "/",
    exact: true,
    Component: FrontPage,
  },
];

export { Routes };
