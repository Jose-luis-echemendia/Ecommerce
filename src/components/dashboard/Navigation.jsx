import { NavLink } from "react-router-dom";
import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  CreditCardIcon,
  ClipboardDocumentListIcon,
  UserIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  {
    name: "Personal Information",
    to: "/Dashboard-User/Information",
    icon: HomeIcon,
  },
  { name: "Profile", to: "/Dashboard-User/Profile", icon: UserIcon },
  {
    name: "Orders",
    to: "/Dashboard-User/ListOrders",
    icon: ClipboardDocumentListIcon,
  },
  {
    name: "View Dollar",
    to: "/Dashboard-User/ViewDollar",
    icon: CreditCardIcon,
  },
  {
    name: "Payment History",
    to: "/Dashboard-User/HistoryPayment",
    icon: FolderIcon,
  },
  { name: "Favorite products", to: "/Dashboard-User/FavoriteProducts", icon: HeartIcon },
  { name: "Calendar", to: "#", icon: CalendarIcon },
  { name: "Documents", to: "#", icon: InboxIcon },
  { name: "Reports", to: "#", icon: ChartBarIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Navigation = () => {
  return (
    <>
      <nav className="px-2 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            className={classNames(
              "text-gray-600 group flex items-center px-2 py-2 text-base font-medium rounded-md"
            )}
          >
            <item.icon
              className={classNames(
                "mr-4 flex-shrink-0 h-6 w-6"
              )}
              aria-hidden="true"
            />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </>
  );
};
