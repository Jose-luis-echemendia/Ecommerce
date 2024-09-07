import React from "react";
import { useState, useId } from "react";
import { countries } from "../../helpers/fixedCountry";
import { RadioGroup } from "@headlessui/react";
import { CheckCircle } from "react-feather";

export const ContactInformation = ({ shipping, formState, onInputChange, selectedShipping, setSelectedShipping }) => {
  

  const emailId = useId();
  const firstNameId = useId();
  const lastNameId = useId();
  const companyId = useId();
  const addressId = useId();
  const aparamentId = useId();
  const cityId = useId();
  const countryId = useId();
  const provinceId = useId();
  const postalCodeId = useId();
  const phoneId = useId();
  const cardNumberId = useId();
  const nameCardId = useId();
  const expirationDateId = useId();
  const CVCId = useId();

  const {
    email,
    firstName,
    lastName,
    company,
    address,
    apartament,
    city,
    country,
    province,
    postalCode,
    phone,
    payment,
    cardNumber,
    nameCard,
    expirationDate,
    CVC,
  } = formState;

  return (
    <>
      <div>
        <h2 className="mb-5 pr-2 font-semibold text-xl">Contact Information</h2>
        <div className="grid gap-7">
          <div className="mb-6">
            <label htmlFor="email" aria-describedby={emailId}>
              Email address
            </label>
            <input
              type="email"
              name="email"
              id={emailId}
              value={email}
              onChange={onInputChange}
              className={`shadow-2x border-gray-300 border-2 rounded-lg w-full h-10 p-4 mt-1 ${
                email.length > 0 && "bg-sky-100"
              }`}
              placeholder="Enter your email address"
              required
              autoComplete="email"
            />
          </div>

          <h2 className="pr-2 border-t pt-12 font-semibold text-xl">
            Shipping information
          </h2>

          <div>
            <div className="grid grid-cols-2 gap-4" id="shipping-form">
              <label htmlFor="name" aria-describedby={firstNameId}>
                First Name
              </label>
              <label htmlFor="last name" aria-describedby={lastNameId}>
                Last Name
              </label>
              <input
                required
                type="text"
                name="firstName"
                value={firstName}
                id={firstNameId}
                onChange={onInputChange}
                placeholder="Enter your name"
                className={`shadow-2xl border-gray-300 border-2 rounded-lg w-full h-10 p-4 mt-1 ${
                  firstName.length > 0 && "bg-sky-100"
                }`}
              />
              <input
                required
                type="text"
                name="lastName"
                value={lastName}
                id={lastNameId}
                onChange={onInputChange}
                placeholder="Enter your last name"
                className={`shadow-2xl  border-gray-300 border-2 rounded-lg w-full h-10 p-4 mt-1 ${
                  lastName.length > 0 && "bg-sky-100"
                }`}
              />
            </div>
          </div>

          <div>
            <label htmlFor="company" aria-describedby={companyId}>
              Company
            </label>
            <input
              required
              type="text"
              name="company"
              value={company}
              id={emailId}
              onChange={onInputChange}
              className={`shadow-2xl  border-gray-300 border-2 rounded-lg w-full h-10 p-4 mt-1 ${
                company.length > 0 && "bg-sky-100"
              }`}
              placeholder="Enter your company name"
            />
          </div>
          <div>
            <label htmlFor="address" aria-describedby={addressId}>
              Address
            </label>
            <input
              required
              type="text"
              name="address"
              value={address}
              id={emailId}
              onChange={onInputChange}
              className={`shadow-2xl  border-gray-300 border-2 rounded-lg w-full h-10 p-4 mt-1 ${
                address.length > 0 && "bg-sky-100"
              }`}
              placeholder="Enter your address"
            />
          </div>
          <div>
            <label htmlFor="apartament" aria-describedby={aparamentId}>
              Apartment, suite, etc.
            </label>
            <input
              required
              type="text"
              name="apartament"
              value={apartament}
              id={emailId}
              onChange={onInputChange}
              className={`shadow-2xl  border-gray-300 border-2 rounded-lg w-full h-10 p-4 mt-1 ${
                apartament.length > 0 && "bg-sky-100"
              }`}
              placeholder="Enter your apartament"
            />
          </div>

          <div>
            <div className="grid grid-cols-2 gap-4">
              <label htmlFor="city" aria-describedby={cityId}>
                City
              </label>
              <label htmlFor="country" aria-describedby={countryId}>
                Country
              </label>
              <input
                required
                type="text"
                name="city"
                value={city}
                id={cityId}
                onChange={onInputChange}
                placeholder="Enter the city where you reside"
                className={`shadow-2xl  border-gray-300 border-2 rounded-lg w-full h-10 p-4 mt-1 ${
                  city.length > 0 && "bg-sky-100"
                }`}
              />

              <select
                name="country"
                onChange={onInputChange}
                id={countryId}
                className={`shadow-2xl  border-gray-300 border-2 rounded-lg w-full h-10 pl-2 mt-1 ${
                  country.length > 0 && "bg-sky-100"
                }`}
              >
                {countries.map((country, index) => (
                  <option name="country" value={country.name} key={index}>
                    {country.name}
                  </option>
                ))}
              </select>

              <label htmlFor="province" aria-describedby={provinceId}>
                State / Province
              </label>
              <label htmlFor="postalCode" aria-describedby={postalCodeId}>
                Postal code
              </label>
              <input
                required
                type="text"
                id={provinceId}
                name="province"
                value={province}
                onChange={onInputChange}
                placeholder="Enter the province where you reside"
                className={`shadow-2xl  border-gray-300 border-2 rounded-lg w-full h-10 p-4 mt-1 'bg-sky-100`}
              />

              <input
                required
                type="text"
                id={postalCodeId}
                name="postalCode"
                value={postalCode}
                onChange={onInputChange}
                placeholder="Enter the postal code of country"
                className={`shadow-2xl  border-gray-300 border-2 rounded-lg w-full h-10 p-4 mt-1 ${
                  postalCode.length > 0 && "bg-sky-100"
                }`}
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="email">Phone</label>
            <input
              required
              type="text"
              name="phone"
              value={phone}
              id={phoneId}
              onChange={onInputChange}
              className={`shadow-2xl  border-gray-300 border-2 rounded-lg w-full h-10 p-4 mt-1 ${
                phone.length > 0 && "bg-sky-100"
              }`}
              placeholder="Enter email"
            />
          </div>
          <h2 className="pr-2 border-t pt-12 font-semibold text-xl">
            Delivery method
          </h2>
          <div className="mb-6">
            <div className="w-full">
              <RadioGroup
                value={selectedShipping}
                onChange={setSelectedShipping}
              >
                <RadioGroup.Label className="sr-only">
                  shipping
                </RadioGroup.Label>
                <div className="flex flex-wrap space-x-4">
                  {shipping &&
                    shipping.map((shipping) => (
                      <RadioGroup.Option
                        key={shipping}
                        value={shipping}
                        className={
                          ({ active, checked }) =>
                            `${
                              active
                                ? "outline-none ring-2 ring-offset-2 ring-indigo-500"
                                : ""
                            }
                              ${checked ? "bg-indigo-600 text-white" : ""}
                              relative flex cursor-pointer rounded-lg px-5 py-2 shadow-md focus:outline-none w-48 h-28
                              ${
                                checked
                                  ? "border border-indigo-600"
                                  : "border border-gray-300"
                              }` // Agrega una clase de borde para crear el efecto de cuadrado
                        }
                      >
                        {({ active, checked }) => (
                          <div className="flex space-x-20">
                            <div className="flex flex-col justify-between">
                              <div className="font-serif text-md">
                                <RadioGroup.Label
                                  as="p"
                                  className={`font-medium ${
                                    checked ? "text-white" : "text-gray-900"
                                  }`}
                                >
                                  {shipping.name}
                                </RadioGroup.Label>
                                <div>{shipping.time_to_delivery}</div>
                              </div>
                              <div>
                                <p className="font-bold text-xl">
                                  ${shipping.price}
                                </p>
                              </div>
                            </div>
                            <div className="">
                              {checked && <CheckCircle size={15}></CheckCircle>}
                            </div>
                          </div>
                        )}
                      </RadioGroup.Option>
                    ))}
                </div>
              </RadioGroup>
            </div>
          </div>
          <h2 className="pr-2 border-t pt-12 font-semibold text-xl">Payment</h2>
          <div>
            <div className="flex justify-between">
              <div className="font-semibol text-lg">
                <input
                  required
                  type="radio"
                  name="payment"
                  value={payment}
                  id=""
                  onChange={onInputChange}
                  className="w-3 h-3"
                />
                <label className="ml-3 min-w-0 flex-1">PayPal</label>
              </div>
              <div className="font-semibol text-lg">
                <input
                  required
                  type="radio"
                  name="payment"
                  value={payment}
                  id=""
                  onChange={onInputChange}
                  className="w-3 h-3"
                />
                <label className="ml-3 min-w-0 flex-1">Credit card</label>
              </div>
              <div className="font-semibol text-lg">
                <input
                  required
                  type="radio"
                  name="payment"
                  value={payment}
                  id=""
                  onChange={onInputChange}
                  className="w-3 h-3"
                />
                <label className="ml-3 min-w-0 flex-1 ">eTransfer</label>
              </div>
            </div>
            <div className="mt-10 space-y-4">
              <div>
                <label htmlFor="company" aria-describedby={companyId}>
                  Card number
                </label>
                <input
                  required
                  type="text"
                  name="cardNumber"
                  value={cardNumber}
                  id={cardNumberId}
                  onChange={onInputChange}
                  className={`shadow-2xl  border-gray-300 border-2 rounded-lg w-full h-10 p-4 mt-1 ${
                    cardNumber.length > 0 && "bg-sky-100"
                  }`}
                  placeholder="Enter your card number"
                />
              </div>
              <div>
                <label htmlFor="company" aria-describedby={companyId}>
                  Name on card
                </label>
                <input
                  required
                  type="text"
                  name="nameCard"
                  value={nameCard}
                  id={nameCardId}
                  onChange={onInputChange}
                  className={`shadow-2xl  border-gray-300 border-2 rounded-lg w-full h-10 p-4 mt-1 ${
                    nameCard.length > 0 && "bg-sky-100"
                  }`}
                  placeholder="Enter your name on card"
                />
              </div>
              <div className="flex justify-between">
                <div className="w-3/4 mr-5">
                  <label htmlFor="company" aria-describedby={companyId}>
                    Expiration date (MM/YY)
                  </label>
                  <input
                    required
                    type="text"
                    name="expirationDate"
                    value={expirationDate}
                    id={expirationDateId}
                    onChange={onInputChange}
                    className={`shadow-2xl  border-gray-300 border-2 rounded-lg w-full h-10 p-4 mt-1 ${
                      expirationDate.length > 0 && "bg-sky-100"
                    }`}
                    placeholder="expiration date of card"
                  />
                </div>
                <div className="w-1/4">
                  <label htmlFor="company" aria-describedby={companyId}>
                    CVC
                  </label>
                  <input
                    required
                    type="text"
                    name="CVC"
                    value={CVC}
                    id={CVCId}
                    onChange={onInputChange}
                    className={`shadow-2xl  border-gray-300 border-2 rounded-lg w-full h-10 p-4 mt-1 ${
                      CVC.length > 0 && "bg-sky-100"
                    }`}
                    placeholder="CVC your card"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
