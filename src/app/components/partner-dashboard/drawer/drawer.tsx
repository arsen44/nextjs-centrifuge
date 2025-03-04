import React from "react";
import { connect } from "react-redux";
import { logout } from "../../../../../store/actions/auth";
import { Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, Button, cn, Divider } from "@nextui-org/react";
import ListItem from "../list/listItem";
import { ExitIcon } from "../../icons/ExitIcon";
import { useRouter } from "next/navigation";
import { ChevronDownIcon } from "../../icons/ChevronDownIcon";

export const IconWrapper = ({ children, className }) => (
  <div className={cn(className, "flex items-center rounded-small justify-center w-7 h-7")}>{children}</div>
);

function PartnerDrawer({ onPress, isOpen, onOpenChange, username, logout }) {
  const router = useRouter();

  const logoutApp = () => {
    logout();
    router.push("/");
  };

  return (
    <>
      <Button onPress={onPress} isIconOnly color="primary" variant="light">
        <IconWrapper className="bg-success/10 text-success">
          <ChevronDownIcon className="text-xs" />
        </IconWrapper>
      </Button>
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange} placement="left" size="xs">
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">{username}</DrawerHeader>
              <DrawerBody>
                <ListItem />
              </DrawerBody>
              <Divider />
              <DrawerFooter className="flex flex-col gap-1 justify-center">
                <button onClick={() => logoutApp()} className="flex flex-row gap-2 justify-center items-center">
                  <div className="max-w-fit justify-center items-center">
                    <ExitIcon />
                  </div>
                  <h2 className="text-[16px] font-semibold leading-tight">Выйти</h2>
                </button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}

const mapStateToProps = (state) => ({
  authenticated: state.auth.token !== null,
  username: state.auth.userData.username,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()), // Assuming logout action is defined
});

export default connect(mapStateToProps, mapDispatchToProps)(PartnerDrawer);
