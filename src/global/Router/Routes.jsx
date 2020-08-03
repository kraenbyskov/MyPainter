import FrontPage from "../../pages/FrontPage/Front";
import Artboard from "../../pages/SelectArtboard/Artboard";
import VieweArtboard from "../../pages/VieweArtboard/VieweArtboard";

const Routes = [
  {
    id: 1,
    name: "VieweArtboard",
    path: "/VieweArtboard",
    exact: false,
    Component: VieweArtboard,
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
