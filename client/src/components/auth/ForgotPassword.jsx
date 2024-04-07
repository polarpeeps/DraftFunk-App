/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import withAuth from "../../hocs/withAuth";
import axios from "../../utils/axios";
import { toast } from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = React.useState("");
  const [loader, setLoader] = React.useState(false);

  const handleSubmit = async (e) => {
    try {
      setLoader(true);
      e.preventDefault();
      const response = await axios.post("/auth/forgot-password", {
        email,
      });
      console.log(response.data);
      toast.success("Check your email for the reset link");

      console.log({
        email,
      });
    } catch (error) {
      toast.error(error.message)
      console.log(error);
    } finally {
      setLoader(false);
    }
  };
  return (
    <section >
      
      <div className="relative py-16 bg-teal-900 h-screen
      ">
        <div className="container relative m-auto px-6 md:px-12 xl:px-40">
          <div className="m-auto space-y-8 md:w-8/12 lg:w-6/12 xl:w-6/12">
            <div className="rounded-3xl bg-gray-100 shadow-inner border border-gray-200">
              <div className="p-8 py-12 sm:p-16">
                <h2 className="mb-8 text-2xl font-bold text-gray-800">Enter your email</h2>
                <form onSubmit={handleSubmit} action="" className="space-y-8">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-gray-600">Email</label>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      name="email"
                      id="email"
                      placeholder="name@company.com"
                      required=""
                      className="focus:outline-none block w-full rounded-md border border-gray-300 bg-gray-100 px-4 py-3 text-gray-600 shadow-sm focus:ring-2 focus:ring-blue-300"
                    />
                  </div>

                  
                  <button type="submit" className="relative flex h-11 w-full items-center justify-center px-6 rounded-full bg-primary text-white font-semibold hover:bg-teal-800  focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-md bg-amber-600">
                    <span className="relative "> Send password reset email
                {loader && (
                  <svg
                    aria-hidden="true"
                    class="w-4 h-4 mr-2 ml-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                )}</span>
                  </button>

                  <p className="border-t border-gray-200 pt-6 text-sm text-gray-500">
                    Don’t have an account? &nbsp;
                    <Link to="/signup" className="text-primary">Log In </Link>
                  </p>
                </form>
              </div>
            </div>
            <div className="space-x-4 text-center text-gray-500">
              <span>&copy;draftpunk</span>
              <Link to="/" className="text-sm hover:text-primary">Contact</Link>
              <Link to="/" className="text-sm hover:text-primary">Privacy & Terms</Link>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default withAuth(ForgotPassword);
