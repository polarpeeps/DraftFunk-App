/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import withAuth from "../../hocs/withAuth";
import { useDispatch } from "react-redux";
import { signupUser } from "../../redux/actions/auth";

const Signup = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstname] = React.useState("");
  const [lastName, setLastname] = React.useState("");
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      dispatch(signupUser({ email, firstName,
        lastName,password }));
      console.log({
        email,
        password,
        firstName,
        lastName,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="relative py-16 bg-teal-900">
        <div className="container relative m-auto px-6 md:px-12 xl:px-40">
          <div className="m-auto space-y-8 md:w-8/12 lg:w-6/12 xl:w-6/12">
            <div className="rounded-3xl bg-gray-100  shadow-inner border border-gray-200">
              <div className="p-8 py-12 sm:p-16">
                <h2 className="mb-8 text-2xl font-bold text-gray-800">Sign in to your account</h2>
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

                  <div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="text-gray-600">Password</label>
                      
                    </div>
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      autoComplete="current-password"
                      required=""
                      className="focus:outline-none block w-full rounded-md border border-gray-300 bg-gray-100 px-4 py-3 text-gray-600 shadow-sm focus:ring-2 focus:ring-blue-300 "
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="firstname" className="text-gray-600">First Name</label>
                    <input
                      onChange={(e) => setFirstname(e.target.value)}
                      type="text"
                      name="firstname"
                      id="firstname"
                      placeholder="John"
                      required=""
                      className="focus:outline-none block w-full rounded-md border border-gray-300 bg-gray-100 px-4 py-3 text-gray-600 shadow-sm focus:ring-2 focus:ring-blue-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-gray-600">Last Name</label>
                    <input
                      onChange={(e) => setLastname(e.target.value)}
                      type="text"
                      name="lastName"
                      id="lastName"
                      placeholder="name@company.com"
                      required=""
                      className="focus:outline-none block w-full rounded-md border border-gray-300 bg-gray-100 px-4 py-3 text-gray-600 shadow-sm focus:ring-2 focus:ring-blue-300"
                    />
                  </div>

                  <button type="submit" className="relative flex h-11 w-full items-center justify-center px-6 rounded-full bg-primary text-white font-semibold hover:bg-teal-800  focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-md bg-amber-600">
                    <span className="relative ">SignIn</span>
                  </button>

                  <p className="border-t border-gray-200 pt-6 text-sm text-gray-500">
                    Already have an account? &nbsp;
                    <Link to="/login" className="text-primary">Log In </Link>
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

export default withAuth(Signup);