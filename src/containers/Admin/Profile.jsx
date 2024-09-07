import { useEffect, useState } from "react";
import { Dashboard } from "../../hocs/Dashboard";
import { useProfile } from "../../hooks/useProfile";
import { Oval } from "react-loader-spinner";
import { initialProfileForm } from "../../helpers/formInitialState";
import { useForm } from "../../hooks/useForm";
import { countries } from "../../helpers/fixedCountry";
import { Modal } from "../../components/Modal";
import { PencilSquareIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

export const Profile = () => {
  const { stateProfile, getProfile, updatedProfile } = useProfile();

  const [openModal, setOpenModal] = useState({ open: false, type: "verify" });

  useEffect(() => {
    getProfile();
  }, []);

  const { profile } = stateProfile;

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { formState, onInputChange, setFormState } =
    useForm(initialProfileForm);

  const {
    addressLine1,
    addressLine2,
    apartament,
    city,
    province,
    zipcode,
    phone,
    country,
  } = formState;

  const onSubmit = () => {
    setLoading(true);
    updatedProfile(
      addressLine1,
      addressLine2,
      apartament,
      city,
      province,
      zipcode,
      phone,
      country
    );
    setLoading(false);
    window.scrollTo(0, 0);
  };

  const verify = () => {
    if (
      addressLine1.length < 1 ||
      addressLine2.length < 1 ||
      apartament.length < 1 ||
      city.length < 1 ||
      province.length < 1 ||
      zipcode.length < 1 ||
      country.length < 1
    ) {
      setOpenModal({
        ...openModal,
        open: true,
        type: "verify",
      });
    } else {
      setOpenModal({
        ...openModal,
        open: true,
        type: "change",
      });
    }
  };

  return (
    <Dashboard>
      {profile && (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              Profile
            </h1>
          </div>
          <form onSubmit={onSubmit} className="max-w-3xl mx-auto mt-5">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Address Line 1:
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="addressLine1"
                    placeholder={`${profile.address_line_1}`}
                    onChange={onInputChange}
                    value={addressLine1}
                    className="flex-1 block w-full px-2 focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-500"
                  />
                </div>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Address Line 2:
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="addressLine2"
                    placeholder={`${profile.address_line_2}`}
                    onChange={onInputChange}
                    value={addressLine2}
                    className="flex-1 block w-full px-2 focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-500"
                  />
                </div>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                apartament
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="apartament"
                    placeholder={`${profile.apartament}`}
                    onChange={onInputChange}
                    value={apartament}
                    className="flex-1 block w-full px-2 focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-500"
                  />
                </div>
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                City
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="city"
                    placeholder={`${profile.city}`}
                    onChange={onInputChange}
                    value={city}
                    className="flex-1 block w-full px-2 focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-500"
                  />
                </div>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                State/Province:
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="province"
                    placeholder={`${profile.province}`}
                    onChange={onInputChange}
                    value={province}
                    className="flex-1 block w-full px-2 focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-500"
                  />
                </div>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Postal Code/Zipcode:
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="zipcode"
                    placeholder={`${profile.zipcode}`}
                    onChange={onInputChange}
                    value={zipcode}
                    className="flex-1 block w-full px-2 focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-500"
                  />
                </div>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Phone:
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="phone"
                    placeholder={`${profile.phone}`}
                    onChange={onInputChange}
                    value={phone}
                    className="flex-1 block w-full px-2 focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-500"
                  />
                </div>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Country
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <select id="country" name="country" onChange={onInputChange}>
                  <option value={country}>{profile.country}</option>
                  {countries &&
                    countries.map((country, index) => (
                      <option key={index} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {loading ? (
              <button className="inline-flex mt-4 float-right items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
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
                type="button"
                className="inline-flex mt-4 mb-10 float-right items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => verify(true)}
              >
                Save
              </button>
            )}
            <Modal
              open={openModal.open}
              onClose={() => setOpenModal({ ...openModal, open: false })}
            >
              <div className="text-center w-56">
                <CheckCircleIcon size={56} className="mx-auto text-red-500" />
                <div className="mx-auto my-4 w-48">
                  <h3 className="text-lg font-black text-gray-800">
                    {openModal.type === "change"
                      ? "Confirm Update"
                      : "Action Fail"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {openModal.type === "change"
                      ? "Are you sure you want updated your profile information?"
                      : "please fill in the empty fields"}
                  </p>
                </div>
                <div className="flex gap-4">
                  <button
                    className="btn btn-danger w-full"
                    type="button"
                    onClick={
                      openModal.type === "change"
                        ? (e) => (
                            e.preventDefault(),
                            onSubmit(),
                            setOpenModal({ ...openModal, open: false })
                          )
                        : () => setOpenModal({ ...openModal, open: false })
                    }
                  >
                    {openModal.type === "change" ? "Change" : "Accept"}
                  </button>
                  <button
                    className="btn btn-light w-full"
                    type="button"
                    onClick={
                      openModal.type === "change"
                        ? (e) => (
                            e.preventDefault(),
                            setOpenModal({ ...openModal, open: false })
                          )
                        : () => setOpenModal({ ...openModal, open: false })
                    }
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Modal>
          </form>
        </>
      )}
    </Dashboard>
  );
};
