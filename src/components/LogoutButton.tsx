import { signOut } from "next-auth/react";

export default function LogoutButton () {
    return(
        <button onClick={() => signOut()} className="p-2 mt-4 bg-red-500 text-white rounded">
    Log out
       </button>
    );
}