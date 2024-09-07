import { Layout } from 'react-feather'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Oval } from 'react-loader-spinner'
import {Navigate, useParams} from 'react-router'
import { useForm } from '../../hooks/useForm'
import { initialResetPasswordConfirmForm } from '../../helpers/formInitialState'
import { useAuth } from '../../hooks/useAuth'

export const ResetPasswordConfirm = () => {
  const params = useParams()
  

  const [ requestSent, setRequestSent ] = useState(false)
  const { stateAuth, resetPasswordConfirm } = useAuth()
  
  const { formState, onInputChange } = useForm(initialResetPasswordConfirmForm)
    const { newPassword, repeatNewPassword } = formState


  useEffect(() => {
    window.scrollTo(0,0)
  }, [])

  const onSubmit = (event) =>{
    event.preventDefault()
    const uid = params.uid
    const token = params.token
    console.log(token)
    console.log(uid)
    resetPasswordConfirm(uid, token, newPassword, repeatNewPassword)
    if(newPassword === repeatNewPassword){
        setRequestSent(true)
    }
  }

  if (requestSent && !stateAuth.loading)
        return <Navigate to='/' />;

  return (
    <Layout>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Set your new password</h2>
          
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={onSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    name="newPassword"
                    value={newPassword}
                    onChange={onInputChange}
                    type="password"
                    placeholder="Password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Repeat Password
                </label>
                <div className="mt-1">
                  <input
                    name="repeatNewPassword"
                    value={repeatNewPassword}
                    onChange={onInputChange}
                    type="password"
                    placeholder="Repeat Password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                {stateAuth.loading ? 
                <button
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Oval
                type="Oval"
                color="#fff"
                width={20}
                height={20}
                />
              </button>:
              <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Reset password
            </button>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}
