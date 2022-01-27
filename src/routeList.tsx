import { Home } from "./@pages/Home";
import NotFound from "./@pages/NotFound";

export interface IRouterList {
  path: string;
  component: any;
}

const RouterList = () => {
  return [
    { path: "/", component: Home },
    { path: "*", component: NotFound },
  ];
};
export default RouterList;
