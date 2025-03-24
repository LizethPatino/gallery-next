import { signIn } from "next-auth/react";

export default function LoginButton() {
  return (
    <button onClick={() => signIn("google")} className="p-2 bg-blue-500 text-white rounded">
      Iniciar sesión con Google
    </button>
  );
}
