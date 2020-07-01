import FrontPage from "../../pages/FrontPage/Front";
import Artboard from "../../pages/SelectArtboard/Artboard";
import Drag from "../../pages/Drag/Drag";

const Routes = [
  {
    id: 1,
    name: "Artboard",
    path: "/Artboard",
    exact: false,
    component: Artboard,
  },
  {
    id: 2,
    name: "FrontPage",
    path: "/",
    exact: true,
    component: FrontPage,
  },
  {
    id: 3,
    name: "Drag",
    path: "/Drag",
    exact: false,
    component: Drag,
  },
];

export { Routes };
