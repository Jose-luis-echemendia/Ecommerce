import React, { useEffect, useState } from "react";
import { Dashboard } from "../../hocs/Dashboard";
import { useParams } from "react-router-dom";
import { useOrders } from "../../hooks/useOrders";
import { useDate } from "../../hooks/useDate";
import { useAuth } from "../../hooks/useAuth";

const products = {
  id: 1,
  name: "Distant Mountains Artwork Tee",
  price: "$36.00",
  description:
    "You awake in a new, mysterious land. Mist hangs low along the distant mountains. What does it mean?",
  address: ["Floyd Miles", "7363 Cynthia Pass", "Toronto, ON N3Y 4H8"],
  email: "f•••@example.com",
  phone: "1•••••••••40",
  href: "#",
  status: "Processing",
  step: 1,
  date: "March 24, 2021",
  datetime: "2021-03-24",
  imageSrc:
    "https://tailwindui.com/img/ecommerce-images/confirmation-page-04-product-01.jpg",
  imageAlt:
    "Off-white t-shirt with circular dot illustration on the front of mountain ridges that fade.",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const DetailsOrder = () => {
  const params = useParams();
  const { stateOrders, getOrderDetail } = useOrders();
  const { stateAuth } = useAuth();

  const [date, setDate] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
    const orderId = params.orderId;

    getOrderDetail(orderId);
  }, [params]);

  const { orderDetail } = stateOrders;

  useEffect(() => {
    if (orderDetail !== null) {
      setDate(useDate(orderDetail.date_issued));
    }
  }, [orderDetail]);

  const email =
    stateAuth.user.email.charAt(0) +
    "••••••" +
    stateAuth.user.email.substring(stateAuth.user.email.indexOf("@"));

  console.log(orderDetail);

  return (
    <Dashboard>
      <div className="bg-white">
        <div className="max-w-7xlmx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Order Details
          </h1>

          <div className="text-sm border-b border-gray-200 mt-2 pb-5 sm:flex sm:justify-between">
            <dl className="flex">
              <dt className="text-gray-500">Order number&nbsp;</dt>
              <dd className="font-medium text-gray-900">
                {orderDetail && orderDetail.transaction_id}
              </dd>
              <dt>
                <span className="sr-only">Date</span>
                <span className="text-gray-400 mx-2" aria-hidden="true">
                  &middot;
                </span>
              </dt>
              <dd className="font-medium text-gray-900">
                <time dateTime="2021-03-22">{date}</time>
              </dd>
            </dl>
          </div>

          <div className="mt-8">
            <h2 className="mb-10 font-semibold text-xl">Products orders:</h2>

            <div className="space-y-24">
              <div className="grid grid-cols-2 text-sm sm:grid-rows-1 sm:grid-cols-4 sm:gap-x-6 md:gap-x-8 lg:gap-x-8">
                {orderDetail &&
                  orderDetail.order_items.map((item) => (
                    <div
                      key={item.transaction_id}
                      className="bg-gray-100 p-2 rounded-lg shadow-md"
                    >
                      <div className="sm:col-span-4 md:col-span-5 md:row-end-2 md:row-span-2 mb-4">
                        <div className="aspect-w-1 aspect-h-1 bg-gray-50 rounded-lg overflow-hidden">
                          <img
                            src={item.photos[0]}
                            alt={item.name}
                            className="object-center object-cover h-40 w-40  rounded-3xl"
                          />
                        </div>
                      </div>
                      <div className="mt-6 sm:col-span-7 sm:mt-0 md:row-end-1 flex flex-col items-center">
                        <h3 className="text-medium font-medium text-gray-900">
                          name: {item.name}
                        </h3>
                        <p className="font-medium text-gray-900 mt-1">
                          count: {item.count}
                        </p>
                        <p className="font-medium text-gray-900 mt-1">
                          price: {item.price}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="sm:col-span-12 md:col-span-7">
            <h2 className="font-semibold text-xl mt-10">Information orders:</h2>
            <dl className="grid grid-cols-1 gap-y-8 border-b py-8 border-gray-200 sm:grid-cols-3 sm:gap-x-6 sm:py-6 md:py-10">
              <div>
                <dt className="font-medium text-gray-900">Delivery address</dt>
                <dd className="mt-3 text-gray-500">
                  <span className="block">
                    {orderDetail && orderDetail.address_line_1}
                  </span>
                  <span className="block">
                    {orderDetail && orderDetail.province}
                  </span>
                  <span className="block">
                    {orderDetail && orderDetail.city}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-900">Shipping updates</dt>
                <dd className="mt-3 text-gray-500 space-y-3">
                  <p>{email}</p>
                  <p>{products.phone}</p>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-900">Coupon Applicated</dt>
                <dd className="mt-3 text-gray-500 space-y-3">
                  {orderDetail && orderDetail.coupon_name !== "DEFAULT" && (
                    <p>{orderDetail.coupon_name}</p>
                  )}
                  {orderDetail && orderDetail.coupon_name === "DEFAULT" && (
                    <p>You not selected coupon to aplicated</p>
                  )}
                </dd>
              </div>
            </dl>
            <p className="font-medium text-gray-900 mt-6 md:mt-10">
              {products.status} on{" "}
              <time dateTime={products.datetime}>{date}</time>
            </p>
            <div className="mt-6">
              <div className="bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-2 bg-indigo-600 rounded-full"
                  style={{
                    width: `calc((${products.step} * 2 + 1) / 8 * 100%)`,
                  }}
                />
              </div>
              <div className="hidden sm:grid grid-cols-4 font-medium text-gray-600 mt-6">
                <div className="text-indigo-600">Order placed</div>
                <div
                  className={classNames(
                    products.step > 0 ? "text-indigo-600" : "",
                    "text-center"
                  )}
                >
                  Processing
                </div>
                <div
                  className={classNames(
                    products.step > 1 ? "text-indigo-600" : "",
                    "text-center"
                  )}
                >
                  Shipped
                </div>
                <div
                  className={classNames(
                    products.step > 2 ? "text-indigo-600" : "",
                    "text-right"
                  )}
                >
                  Delivered
                </div>
              </div>
            </div>
          </div>

          {/* Billing */}
          <div className="mt-24">
            <h2 className="sr-only">Billing Summary</h2>

            <div className="bg-gray-50 rounded-lg py-6 px-6 lg:px-0 lg:py-8 lg:grid lg:grid-cols-12 lg:gap-x-8">
              <dl className="grid grid-cols-1 gap-6 text-sm sm:grid-cols-2 md:gap-x-8 lg:pl-8 lg:col-span-5">
                <div>
                  <dt className="font-medium text-gray-900">Billing address</dt>
                  <dd className="mt-3 text-gray-500">
                    <span className="block">Floyd Miles</span>
                    <span className="block">7363 Cynthia Pass</span>
                    <span className="block">Toronto, ON N3Y 4H8</span>
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">
                    Payment information
                  </dt>
                  <dd className="mt-3 flex">
                    <div>
                      <svg
                        aria-hidden="true"
                        width={36}
                        height={24}
                        viewBox="0 0 36 24"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-auto"
                      >
                        <rect width={36} height={24} rx={4} fill="#224DBA" />
                        <path
                          d="M10.925 15.673H8.874l-1.538-6c-.073-.276-.228-.52-.456-.635A6.575 6.575 0 005 8.403v-.231h3.304c.456 0 .798.347.855.75l.798 4.328 2.05-5.078h1.994l-3.076 7.5zm4.216 0h-1.937L14.8 8.172h1.937l-1.595 7.5zm4.101-5.422c.057-.404.399-.635.798-.635a3.54 3.54 0 011.88.346l.342-1.615A4.808 4.808 0 0020.496 8c-1.88 0-3.248 1.039-3.248 2.481 0 1.097.969 1.673 1.653 2.02.74.346 1.025.577.968.923 0 .519-.57.75-1.139.75a4.795 4.795 0 01-1.994-.462l-.342 1.616a5.48 5.48 0 002.108.404c2.108.057 3.418-.981 3.418-2.539 0-1.962-2.678-2.077-2.678-2.942zm9.457 5.422L27.16 8.172h-1.652a.858.858 0 00-.798.577l-2.848 6.924h1.994l.398-1.096h2.45l.228 1.096h1.766zm-2.905-5.482l.57 2.827h-1.596l1.026-2.827z"
                          fill="#fff"
                        />
                      </svg>
                      <p className="sr-only">Visa</p>
                    </div>
                    <div className="ml-4">
                      <p className="text-gray-900">Ending with 4242</p>
                      <p className="text-gray-600">Expires 02 / 24</p>
                    </div>
                  </dd>
                </div>
              </dl>

              <dl className="mt-8 divide-y divide-gray-200 text-sm lg:mt-0 lg:pr-8 lg:col-span-7">
                <div className="pb-4 flex items-center justify-between">
                  <dt className="text-gray-600">Subtotal</dt>
                  <dd className="font-medium text-gray-900">
                    ${orderDetail && orderDetail.amount_products}
                  </dd>
                </div>
                <div className="py-4 flex items-center justify-between">
                  <dt className="text-gray-600">Shipping</dt>
                  <dd className="font-medium text-gray-900">
                    ${orderDetail && orderDetail.shipping_price}
                  </dd>
                </div>
                <div className="py-4 flex items-center justify-between">
                  <dt className="text-gray-600">Tax</dt>
                  <dd className="font-medium text-gray-900">
                    ${orderDetail && orderDetail.tax}
                  </dd>
                </div>
                <div className="pt-4 flex items-center justify-between">
                  <dt className="font-medium text-gray-900">Order total</dt>
                  <dd className="font-medium text-indigo-600">
                    ${orderDetail && orderDetail.amount_total}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};
