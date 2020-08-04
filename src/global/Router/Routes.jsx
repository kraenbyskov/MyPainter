import FrontPage from "../../pages/FrontPage/Front";
import VieweArtboard from "../../pages/VieweArtboard/VieweArtboard";
import Artboard from "../../pages/Artboard/Artboard";

const Routes = [
  {
    id: 1,
    name: "VieweArtboard",
    path: "/VieweArtboard",
    exact: false,
    Component: VieweArtboard,
  },
  {
    id: 3,
    name: "Artboard",
    path: "/Artboard/:id",
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
