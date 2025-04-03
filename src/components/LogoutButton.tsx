import { signOut } from "next-auth/react";

export default function LogoutButton () {
    const handleLogout = () => {
        signOut({ callbackUrl: "/" });
      };

    return(
        <button onClick={handleLogout}>
    Log out
       </button>
    );
}