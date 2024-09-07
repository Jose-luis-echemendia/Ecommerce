import { Layout } from "../../hocs/Layout";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";

import { Oval } from "react-loader-spinner";

export const Activate = () => {
  const params = useParams();
  const { activate, stateAuth } = useAuth();

  const [activated, setActivated] = useState(false);

  const activateAccount = () => {
    const uid = params.uid;
    const token = params.token;
    activate(uid, token);
    setActivated(true);
  };

  if (activated && !stateAuth.loading) return <Navigate to="/"></Navigate>;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
        <div className="max-w-3xl mx-auto">
          {stateAuth.loading ? (
            <button className="inline-flex mt-12 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <Oval
                visible={true}
                height="20"
                width="20"
                color="#fff"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </button>
          ) : (
            <button
              onClick={activateAccount}
              className="inline-flex ml-64 mt-12 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Activate Account
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};
