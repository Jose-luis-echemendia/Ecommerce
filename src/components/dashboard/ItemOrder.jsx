import { Link } from "react-router-dom";
import { useDate } from "../../hooks/useDate";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const ItemOrder = ({ order }) => {
  const { stateAuth } = useAuth();
  const [step, setStep] = useState(0);

  const date = useDate(order.date_issued);
  const email =
    stateAuth.user.email.charAt(0) +
    "••••••" +
    stateAuth.user.email.substring(stateAuth.user.email.indexOf("@"));

  useEffect(() => {
    if (order.status === "Not Processed") {
      setStep(0);
    } else if (order.status === "Processed") {
      setStep(1);
    } else if (order.status === "Shipping") {
      setStep(2);
    } else if (order.status === "Delivered") {
      setStep(3);
    } else if (order.status === "completed") {
      setStep(4);
    }
  }, [order.status]);

  console.log(order.status);

  return (
    <>
      <div className="text-sm border-b border-gray-200 mt-2 pb-5 sm:flex sm:justify-between">
        <dl className="flex">
          <dt className="text-gray-500">Order number :&nbsp;</dt>
          <dd className="font-medium text-gray-900">{order.transaction_id}</dd>
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
        <div className="mt-4 sm:mt-0">
          <Link
            to={`/Dashboard-User/DetailsOrder/${order.transaction_id}`}
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            View details order<span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="sr-only">Products purchased</h2>

        <div className="space-y-24">
          <div
            key={order.id}
            className="grid grid-cols-2 text-sm sm:grid-rows-1 sm:grid-cols-12 sm:gap-x-6 md:gap-x-8 lg:gap-x-8"
          >
            <div className=" bg-gray-100 rounded-lg p-4 sm:col-span-4 md:col-span-5 md:row-end-2 md:row-span-2">
              <div className="space-y-2">
                <div className="grid grid-cols-3 space-x-10 border-2 font-semibold border-l-0 border-r-0 border-t-0 border-dashed border-gray-300 py-1">
                  <div className="mx-auto">
                    <h3 className="">Product name</h3>
                  </div>
                  <div className="mx-auto">
                    <h3 className="">Count</h3>
                  </div>
                  <div className="mx-auto">
                    <h3 className="">Price</h3>
                  </div>
                </div>

                {order.products_information.map((product) => (
                  <div className="grid grid-cols-3 space-x-10 border-2 border-l-0 border-r-0 border-t-0 border-dashed border-gray-300 py-1">
                    <div>
                      <p className="text-sm">{product.product_name}</p>
                    </div>
                    <div>
                      <p className="text-sm">{product.count}</p>
                    </div>
                    <div>
                      <p className="text-sm">{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="sm:col-span-12 md:col-span-7">
              <dl className="grid grid-cols-1 gap-y-8 border-b py-8 border-gray-200 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
                <div>
                  <dt className="font-medium text-gray-900">
                    Delivery address
                  </dt>
                  <dd className="mt-3 text-gray-500">
                    <span className="block">{order.address_line_1}</span>
                    <span className="block">{order.province}</span>
                    <span className="block">{order.city}</span>
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">
                    Shipping updates
                  </dt>
                  <dd className="mt-3 text-gray-500 space-y-3">
                    <p>{email}</p>
                    <p>{"1•••••••••40"}</p>
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Edit
                    </button>
                  </dd>
                </div>
              </dl>
              <p className="font-medium text-gray-900 mt-6 md:mt-10">
                {order.status} on <time>{date}</time>
              </p>
              <div className="mt-6">
                <div className="bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-2 bg-indigo-600 rounded-full"
                    style={{
                      width: `calc((${step} * 2 + 1) / 8 * 100%)`,
                    }}
                  />
                </div>
                <div className="hidden sm:grid grid-cols-5 font-medium text-gray-600 mt-6">
                  <div className="text-indigo-600">Not Processing</div>
                  <div
                    className={classNames(
                      step > 0 ? "text-indigo-600" : "",
                      "text-center"
                    )}
                  >
                    Processing
                  </div>
                  <div
                    className={classNames(
                      step > 1 ? "text-indigo-600" : "",
                      "text-center"
                    )}
                  >
                    Shipped
                  </div>
                  <div
                    className={classNames(
                      step > 2 ? "text-indigo-600" : "",
                      "text-right"
                    )}
                  >
                    Delivered
                  </div>
                  <div
                    className={classNames(
                      step > 3 ? "text-indigo-600" : "",
                      "text-right"
                    )}
                  >
                    Completed
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Billing */}
      <div className="mt-16">
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
              <dt className="font-medium text-gray-900">Payment information</dt>
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
                ${order.amount_products}
              </dd>
            </div>
            <div className="py-4 flex items-center justify-between">
              <dt className="text-gray-600">Shipping</dt>
              <dd className="font-medium text-gray-900">
                ${order.shipping_price}
              </dd>
            </div>
            <div className="py-4 flex items-center justify-between">
              <dt className="text-gray-600">Tax</dt>
              <dd className="font-medium text-gray-900">${order.tax}</dd>
            </div>
            <div className="pt-4 flex items-center justify-between">
              <dt className="font-medium text-gray-900">Order total</dt>
              <dd className="font-medium text-indigo-600">
                ${order.amount_total}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
};
