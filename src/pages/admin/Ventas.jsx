import React, { useState, useEffect, useRef } from "react";
import { getUsers, getProducts, createSell } from "../../utils/api.js";
import { nanoid } from "nanoid";

const Ventas = () => {
  const form = useRef(null);
  const [vendedores, setVendedores] = useState([]);
  const [productos, setProductos] = useState([]);
  const [productosTabla, setProductosTabla] = useState([]);

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
    console.log("formData:", formData);

    const listaProductos = Object.keys(formData)
      .map((k) => {
        if (k.includes("producto")) {
          return productosTabla.filter((p) => p._id === formData[k])[0];
        } else {
          return null;
        }
      })
      .filter((p) => p);

    const datosVenta = {
      valor: formData.valor,
      producto: listaProductos,
      vendedor: vendedores.filter((el) => el._id === formData.vendedor)[0],
    };
    console.log("lista: ", listaProductos);

    Object.keys(formData).forEach((k) => {
      if (k.includes("cantidad")) {
        const inidice = parseInt(k.split("_")[1]);
        listaProductos[inidice]["cantidad"] = formData[k];
      }
    });

    await createSell(
      datosVenta,
      (response) => {
        console.log("datosVenta : ", response);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  return (
    <div className="flex h-full w-full overflow-y-scroll justify-center">
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
          <select name="vendedor" className="p-2" defaultValue="" required>
            <option disabled value="">
              Seleccione un Vendedor
            </option>
            {vendedores.map((el) => {
              return (
                <option key={nanoid()} value={el._id}>{`${el.nombre}`}</option>
              );
            })}
          </select>
        </label>

        {/* #### Registro de productos a la factura ######## */}
        <TablaProductos
          productos={productos}
          setProductos={setProductos}
          setProductosTabla={setProductosTabla}
        />

        {/* #### Registro de productos a la factura ######## */}

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
          className="bg-green-400 p-2 text-white rounded-lg shadow-md hover:bg-green-900 m-10"
        >
          REGISTRAR
        </button>
      </form>
    </div>
  );
};
const TablaProductos = ({ productos, setProductos, setProductosTabla }) => {
  const [productoAAgregar, setProductoAAgregar] = useState({});
  const [filasTabla, setFilasTabla] = useState([]);

  useEffect(() => {
    console.log("producto a agregar: ", productoAAgregar);
  }, [productoAAgregar]);

  useEffect(() => {
    console.log("FilasTabla: ", filasTabla);
    setProductosTabla(filasTabla);
  }, [filasTabla, setProductosTabla]);

  const agregarNuevoProducto = () => {
    setFilasTabla([...filasTabla, productoAAgregar]);
    setProductos(productos.filter((p) => p._id !== productoAAgregar._id));
    setProductoAAgregar({});
  };

  const eliminarFila = (productoAEliminar) => {
    setFilasTabla(filasTabla.filter((p) => p._id !== productoAEliminar._id));
    setProductos([...productos, productoAEliminar]);
  };

  return (
    <div>
      <div className="flex m-10">
        <label className="flex flex-col" htmlFor="listaproducto">
          <select
            className="p-3"
            value={productoAAgregar._id ?? ""}
            onChange={(e) =>
              setProductoAAgregar(
                productos.filter((p) => p._id === e.target.value)[0]
              )
            }
          >
            <option disabled value="">
              Seleccione un producto de la lista
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

        <button
          onClick={() => agregarNuevoProducto()}
          className="bg-green-400 p-2 text-white rounded-xl shadow-md hover:bg-green-900 m-1"
        >
          Agregar producto a la lista
        </button>
      </div>
      <table className="tabla">
        <thead>
          <tr>
            <th>Identificador</th>
            <th>Precio Unitario</th>
            <th>Estado</th>
            <th>Descripcion</th>
            <th>Cantidad</th>
            <th>Eliminar</th>
            <th className="hidden">Input</th>
          </tr>
        </thead>
        <tbody>
          {filasTabla.map((el, index) => {
            return (
              <tr key={nanoid()}>
                <td>{el.identificador}</td>
                <td>{el.valor}</td>
                <td>{el.estado}</td>
                <td>{el.descripcion}</td>
                <td>
                  <label htmlFor={`cantidad_producto_${index}`}>
                    <input type="number" name={`cantidad_${index}`} />
                  </label>
                </td>
                <td>
                  <i
                    onClick={() => {
                      eliminarFila(el);
                    }}
                    className="fas fa-trash hover:text-red-500"
                  />
                </td>
                <input
                  hidden
                  defaultValue={el._id}
                  name={`producto_${index}`}
                />
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Ventas;
