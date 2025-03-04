import { Listbox, ListboxItem, cn } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { CompanyIcon } from "../../icons/companyIcon";
export const AccountsIcon = (props) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M7.1998 2.40002C6.56328 2.40002 5.95284 2.65288 5.50275 3.10297C5.05266 3.55306 4.7998 4.1635 4.7998 4.80002V19.2C4.7998 19.8365 5.05266 20.447 5.50275 20.8971C5.95284 21.3472 6.56328 21.6 7.1998 21.6H18.5998C18.7589 21.6 18.9115 21.5368 19.0241 21.4243C19.1366 21.3118 19.1998 21.1592 19.1998 21C19.1998 20.8409 19.1366 20.6883 19.0241 20.5758C18.9115 20.4632 18.7589 20.4 18.5998 20.4H7.1998C6.88154 20.4 6.57632 20.2736 6.35128 20.0486C6.12623 19.8235 5.9998 19.5183 5.9998 19.2H17.9998C18.3181 19.2 18.6233 19.0736 18.8483 18.8486C19.0734 18.6235 19.1998 18.3183 19.1998 18V4.80002C19.1998 4.1635 18.9469 3.55306 18.4969 3.10297C18.0468 2.65288 17.4363 2.40002 16.7998 2.40002H7.1998ZM11.9998 15.6C9.4282 15.6 8.3998 14.4744 8.3998 13.35C8.3998 12.6048 9.091 12 9.943 12H14.0566C14.9086 12 15.5998 12.6048 15.5998 13.35C15.5998 14.4708 14.5714 15.6 11.9998 15.6ZM13.7998 9.00002C13.7998 9.47741 13.6102 9.93525 13.2726 10.2728C12.935 10.6104 12.4772 10.8 11.9998 10.8C11.5224 10.8 11.0646 10.6104 10.727 10.2728C10.3894 9.93525 10.1998 9.47741 10.1998 9.00002C10.1998 8.52263 10.3894 8.0648 10.727 7.72723C11.0646 7.38967 11.5224 7.20002 11.9998 7.20002C12.4772 7.20002 12.935 7.38967 13.2726 7.72723C13.6102 8.0648 13.7998 8.52263 13.7998 9.00002Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const PaymentIcon = (props) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M3 20C2.45 20 1.97933 19.8043 1.588 19.413C1.19667 19.0217 1.00067 18.5507 1 18V7H3V18H20V20H3ZM7 16C6.45 16 5.97933 15.8043 5.588 15.413C5.19667 15.0217 5.00067 14.5507 5 14V6C5 5.45 5.196 4.97933 5.588 4.588C5.98 4.19667 6.45067 4.00067 7 4H21C21.55 4 22.021 4.196 22.413 4.588C22.805 4.98 23.0007 5.45067 23 6V14C23 14.55 22.8043 15.021 22.413 15.413C22.0217 15.805 21.5507 16.0007 21 16H7ZM9 14C9 13.45 8.80433 12.9793 8.413 12.588C8.02167 12.1967 7.55067 12.0007 7 12V14H9ZM19 14H21V12C20.45 12 19.9793 12.196 19.588 12.588C19.1967 12.98 19.0007 13.4507 19 14ZM14 13C14.8333 13 15.5417 12.7083 16.125 12.125C16.7083 11.5417 17 10.8333 17 10C17 9.16667 16.7083 8.45833 16.125 7.875C15.5417 7.29167 14.8333 7 14 7C13.1667 7 12.4583 7.29167 11.875 7.875C11.2917 8.45833 11 9.16667 11 10C11 10.8333 11.2917 11.5417 11.875 12.125C12.4583 12.7083 13.1667 13 14 13ZM7 8C7.55 8 8.021 7.80433 8.413 7.413C8.805 7.02167 9.00067 6.55067 9 6H7V8ZM21 8V6H19C19 6.55 19.196 7.021 19.588 7.413C19.98 7.805 20.4507 8.00067 21 8Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const DashboardIocn = (props) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M13 9V3H21V9H13ZM3 13V3H11V13H3ZM13 21V11H21V21H13ZM3 21V15H11V21H3Z" fill="currentColor" />
    </svg>
  );
};

export const IconWrapper = ({ children, className }) => (
  <div className={cn(className, "flex items-center rounded-small justify-center w-8 h-8")}>{children}</div>
);

export default function ListItem() {
  const router = useRouter();

  const handleNavigation = (key: string) => {
    switch (key) {
      case "dashboard":
        router.push("/partner"); // Navigates to the About page
        break;
      case "accounts":
        router.push("/partner/accounts/"); // Navigates to the About page
        break;
      case "payments":
        router.push("/partner/payments"); // Navigates to the Contacts page
        break;
      case "company":
        router.push("/partner/about"); // Navigates to the Contacts page
        break;
    }
  };

  return (
    <Listbox
      aria-label="User Menu"
      className="p-0 gap-0 divide-y max-w-[300px] overflow-visible"
      itemClasses={{
        base: "px-3  gap-5 h-12 data-[hover=true]:bg-default-100/80",
      }}
      onAction={handleNavigation}
    >
      <ListboxItem
        key="dashboard"
        startContent={
          <IconWrapper className="bg-[#56FF9C]/10 text-[#56FF9C]">
            <DashboardIocn className="text-lg" />
          </IconWrapper>
        }
      >
        Dashboard
      </ListboxItem>

      <ListboxItem
        key="accounts"
        startContent={
          <IconWrapper className="bg-[#4690FF]/10 text-[#4690FF]">
            <AccountsIcon className="text-lg" />
          </IconWrapper>
        }
      >
        Аккаунты
      </ListboxItem>
      <ListboxItem
        key="payments"
        startContent={
          <IconWrapper className="bg-[#F41CFF]/10 text-[#F41CFF]">
            <PaymentIcon className="text-lg " />
          </IconWrapper>
        }
      >
        Выплаты
      </ListboxItem>

      <ListboxItem
        key="company"
        startContent={
          <IconWrapper className="bg-[#F9B850]/10 text-[#F9B850]">
            <CompanyIcon className="text-lg" />
          </IconWrapper>
        }
      >
        О компании
      </ListboxItem>
    </Listbox>
  );
}
