// components/Navbar.tsx
import { useRouter } from "next/router";
import { logout } from "@/utils/auth";

const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  return (
    <nav>
      <button onClick={() => router.push("/dashboard")}>Dashboard</button>
      <button onClick={() => router.push("/event/create")}>Buat Event</button>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
