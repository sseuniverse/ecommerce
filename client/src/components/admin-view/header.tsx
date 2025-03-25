import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { logoutUser } from "@/store/auth-slice";
import { useAppDispatch } from "@/store/store";

interface AdminHeaderProps {
  setOpen: (open: boolean) => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ setOpen }) => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button
          onClick={handleLogout}
          className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow"
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
