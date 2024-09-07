import { Link } from "react-router-dom";
import { LogIn } from "react-feather";

export const GetAuthLink = () => {
  return (
    <>
      <div className="flex items-center md:ml-12">
        <div>
          <Link
            to="/login/"
            className="flex items-center text-base font-medium text-gray-500 hover:text-gray-900"
          >
            <LogIn/>
            <span className="ml-2" >Sign in</span>
          </Link>
        </div>
        <Link
          to="/signup/"
          className="ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Sign up
        </Link>
      </div>
    </>
  );
};
