import React, { useState, useEffect, useRef } from "react";
import { getUsers, getProducts, createSell } from "../../utils/api.js";
import { nanoid } from "nanoid";

const Ventas = () => {
  const form = useRef(null);
  const [vendedores, setVendedores] = useState([]);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const obtenerVendedores = async () => {
      await getUsers(
        (response) => {
          console.log("Ventas: ", response);
          setVendedores(response.data);
        },
        (error) => {
          console.error(error);
        }
      );
    };
    const obtenerProductos = async () => {
      await getProducts(
        (response) => {
          console.log("Productos: ", response);
          setProductos(response.data);
        },
        (error) => {
          console.error(error);
        }
      );
    };
    obtenerProductos();
    obtenerVendedores();
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);

    const formData = {};
    fd.forEach((value, key) => {
      formData[key] = value;
    });

    const infoConsolidada = {
      valor: formData.valor,
      producto: productos.filter((el) => el._id === formData.producto)[0],
      vendedor: vendedores.filter((el) => el._id === formData.vendedor)[0],
    };

    console.log(infoConsolidada);

    await createSell(
      infoConsolidada,
      (response) => {
        console.log("Productos infoConsol: ", response);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  return (
    <div>
      <form
        ref={form}
        onSubmit={submitForm}
        className="flex flex-col w-full items-center justify-center"
      >
        <h1 className="m-9 text-center text-3xl font-extrabold text-gray-900">
          Crear una nueva venta
        </h1>
        <label className="flex flex-col" htmlFor="vendedor">
          <span className="text-2xl font-bg-gray-900">Vendedor</span>
          <select name="vendedor" className="p-2" defaultValue={-1}>
            <option disabled value={-1}>
              Seleccione un Vendedor
            </option>
            {vendedores.map((el) => {
              return (
                <option key={nanoid()} value={el._id}>{`${el.nombre}`}</option>
              );
            })}
          </select>
        </label>
        <label className="flex flex-col" htmlFor="producto">
          <span className="text-2xl font-bg-gray-900">Producto</span>
          <select name="producto" className="p-2" defaultValue={-1}>
            <option disabled value={-1}>
              Seleccione un Producto
            </option>
            {productos.map((el) => {
              return (
                <option
                  key={nanoid()}
                  value={el._id}
                >{`${el.descripcion}`}</option>
              );
            })}
          </select>
        </label>
        <label className="flex flex-col">
          <span className="text-2xl font-bg-gray-900">Valor Total Venta</span>
          <input
            className="border bg-gray-50 border-gray-600 p-2 rounded-lg m-2"
            type="number"
            name="valor"
          ></input>
        </label>
        <button
          type="submit"
          className="bg-green-400 p-2 text-white rounded-lg shadow-md hover:bg-green-900"
        >
          REGISTRAR
        </button>
      </form>
    </div>
  );
};

export default Ventas;
