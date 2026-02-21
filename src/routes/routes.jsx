import { createBrowserRouter } from "react-router-dom";
import NavbarContainer from "../components/navbarblocks/navbarcontainer";
import Layout from "../Layout/Layout";
import Home from "../auth/Home";
import AlbumLandingContainer from "../albumlanding/AlbumLandingContainer";
import Login from "../auth/Login";
import Register from "../auth/Register";
import ResetPassword from "../auth/ResetPassword";
import ProfileContainer from "../components/userprofile/ProfileContainer";
import MyAccount from "../components/userprofile/MyAccount";
import AddProfile from "../components/userprofile/AddProfile";
import UploadProfilePhoto from "../components/userprofile/UploadProfilePhoto";
import ChangePassword from "../components/userprofile/ChangePassword";
import DeleteAccount from "../components/userprofile/DeleteAccount";
import AdminContainer from "../admin/AdminContainer";
import CreateAlbum from "../admin/album/CreateAlbum";
import PopularAlbums from "../albumlanding/PopularAlbums";
import AlbumDetails from "../albumlanding/AlbumDetails";



const myRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: "/",
        element: <AlbumLandingContainer/>,
        children:[
          {
            index:true,
            element:<PopularAlbums/>
          },
          {
            path:"album-details/:title",
            element:<AlbumDetails/>
          }
        ]
      },
      {
        path: "/auth/login",
        element: 

        <Login/>,
      },
      {
        path: "/auth/signup",
        element: <Register/>,
      },
      {
        path:"/auth/reset-password",
        element: <ResetPassword/>
      },
      {
        path:"/admin",
        element:<AdminContainer/>,
        children:[
          {
            path:"create-album",
            element:<CreateAlbum/>
          }
        ]
      },
     {
      path:"/user/profile",
      element: <ProfileContainer/>,
      children: [
        {
          index: true,
          element: <MyAccount/>
        },
        {
          path:"add-profile",
          element: <AddProfile/>
        },
        {
          path:"upload-profile-photo",
          element: <UploadProfilePhoto/>
        },
        {
          path:"change-password",
          element: <ChangePassword/>
        },
        {
          path:"delete-account",
          element: <DeleteAccount/>
        },


      ]
     },
      {
        path: "*",
        element: <h1>Wrong Path Provided</h1>,
      },
    ],
  },
]);

export default myRoutes;
