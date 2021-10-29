import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-200 flex w-full">
      <ul className="flex w-full justify-around my-6">
        <li>Logo</li>
        <li>Productos</li>
        <li>Usuarios</li>
        <li>Ventas</li>
        <li className="px-3">
          <Link to="/login">
            <button className="bg-blue-900 p-2 text-white rounded-lg shadow-md hover:bg-blue-400">
              Iniciar Sesión
            </button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
