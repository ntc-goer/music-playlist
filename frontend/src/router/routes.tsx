import { useRoutes } from "react-router-dom";
import ContentLayout from "../layout/MainLayout";
import MyPage from "../pages/MyPage";
import MyPlayList from "../pages/MyPlayList";


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
      {
        path: "playlist",
        name: "Playlist",
        element: <MyPlayList />,
      },
    ],
  },
];

function RouteLink() {
  return useRoutes(routes);
}

export default RouteLink
