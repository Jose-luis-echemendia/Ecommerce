import {useEffect, useState} from "react";
import { Layout } from "../../hocs/layout";
import { Oval } from "react-loader-spinner";
import { initialResetPasswordForm } from "../../helpers/formInitialState";
import { useForm } from "../../hooks/useForm";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";

export const ResetPassword = () => {
  const { formState, onInputChange } = useForm(initialResetPasswordForm);
  const { email } = formState;
    
  const [ requestSent, setRequestSent ] = useState(false)
  const { stateAuth, resetPassword } = useAuth()
  
  useEffect(() => {
    window.scrollTo(0,0)
  }, [])

  const onSubmit = (event) =>{
    event.preventDefault()
    resetPassword(email)
    setRequestSent(true)
  }

  if(requestSent && !stateAuth.loading){
    return <Navigate to='/'></Navigate>
  }

  return (
    <Layout>
      {" "}
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Recover you password
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={onSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    name="email"
                    value={email}
                    onChange={onInputChange}
                    type="email"
                    placeholder="Email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                {stateAuth.loading ? (
                  <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <Oval type="Oval" color="#fff" width={20} height={20} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Send Email
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};
