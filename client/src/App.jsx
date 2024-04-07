/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect,  } from "react";

import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
// import { TodoContextProvider } from "./contexts/Todo";
import { Route,Routes,useLocation } from "react-router";
import Gallery from "./components/Gallery";
import PostView from "./components/PostView";
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import ResetPassword from './components/auth/ResetPassword'
import ForgotPassword from './components/auth/ForgotPassword'
import{Toaster} from "react-hot-toast";
import { useDispatch } from "react-redux";
import { loadUser } from "./redux/actions/auth";
import CreatePost from "./components/post/CreatePost";
import EditPost from "./components/post/EditPost"
import { SearchProvider } from "./contexts/searchContext";
const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    // dispatch an action to load auth
    dispatch(loadUser());
  }, []);
  const isAuthRoute = ["/login", "/signup", "/forgot-password", "/reset-password/*"].includes(location.pathname);

  return (
    <div
    style={{
      height: "auto",
    }}
  >
    <Toaster />
    <SearchProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/createPost" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostView />} />
          <Route path="/post/edit/:id" element={<EditPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </SearchProvider>
      {!isAuthRoute && <Footer />}
  </div>
  );
};

export default App;