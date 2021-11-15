import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ImagenLogo from "../components/ImagenLogo";

const Navbar = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <nav className="bg-blue-200 flex w-full">
      <ul className="flex w-full justify-around my-6">
        <li>
          <ImagenLogo />
        </li>
        <li>Productos</li>
        <li>Usuarios</li>
        <li>Ventas</li>
        <li className="px-3">
          <button
            onClick={() => loginWithRedirect()}
            className="bg-blue-900 p-4 text-white rounded-lg shadow-md hover:bg-blue-400"
          >
            Iniciar Sesión
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
