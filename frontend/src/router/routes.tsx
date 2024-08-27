import { useRoutes } from "react-router-dom";
import ContentLayout from "../layout/MainLayout";
import MyPage from "../pages/MyPage";


let routes = [
  {
    path: "/",
    element: <ContentLayout />,
    children: [
      {
        path: "",
        name: "MyPage",
        element: <MyPage />,
      },
    ],
  },
];

function RouteLink() {
  return useRoutes(routes);
}

export default RouteLink
