import axios from "axios";
import { nanoid } from "nanoid";
import { Option } from "rc-select";
import React, { useEffect, useState, useRef } from "react";
import { getProducts, obtenerUsuarios } from "../utils/api";
import { ToastContainer, toast } from "react-toastify";

const Test = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [productos, setProductos] = useState([]);
  const form = useRef(null);

  useEffect(() => {
    getProducts(setProductos);
    obtenerUsuarios(setUsuarios);
  }, []);
  useEffect(() => {
    console.log(productos);
  }, [productos]);

  useEffect(() => {
    console.log(usuarios);
  }, [usuarios]);

  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);

    const nuevaVenta = {};
    fd.forEach((value, key) => {
      nuevaVenta[key] = value;
    });

    const informacionConsolidada = {
      valor: nuevaVenta.cantidadVenta,
      producto: productos.filter((el) => el._id === nuevaVenta.producto)[0],
      vendedor: usuarios.filter((el) => el._id === nuevaVenta.usuario)[0],
    };
    console.log(informacionConsolidada);

    const options = {
      method: "POST",
      url: "http://localhost:5000/ventas/",
      headers: { "Content-Type": "application/json" },
      data: nuevaVenta,
    };

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        toast.success("Producto Agregado!! ");
      })
      .catch(function (error) {
        console.error(error);
        toast.error("Producto No agregado!! ");
      });
  };

  return (
    <div className="flex flex-col w-full items-center justify-center">
      <h2 className="m-9 text-center text-3xl font-extrabold text-gray-900">
        Crear venta
      </h2>
      <form ref={form} onSubmit={submitForm} className="flex flex-col">
        <label className="flex flex-col items-center m-3">
          Seleccionar Usuario
          <select
            name="usuario"
            className="bg-gray-50 border-gray-900 border-2 p-2 rounded-lg m-2"
          >
            {usuarios.map((user) => {
              return (
                <option disabled value={0} key={nanoid()} value={user._id}>
                  {user.email}
                </option>
              );
            })}
          </select>
        </label>

        <label className="flex flex-col items-center m-3">
          Seleccionar Producto
          <select
            name="producto"
            className="bg-gray-50 border-gray-900 border-2 p-2 rounded-lg m-2"
          >
            {productos.map((product) => {
              return (
                <option disabled value={0} key={nanoid()} value={product._id}>
                  {product.descripcion}
                </option>
              );
            })}
          </select>
        </label>

        <label className="flex flex-col items-center m-3">
          Cantidad Venta
          <input
            className="border bg-gray-50 border-gray-600 p-2 rounded-lg m-2"
            type="number"
            name="cantidadVenta"
            min={0}
          />
        </label>
        <button type="submit">Enviar Venta</button>
      </form>
    </div>
  );
};

export default Test;
