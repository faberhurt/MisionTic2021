import React, { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { nanoid } from "nanoid";
import axios from "axios";

const Productos = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [textoBoton, setTextoBoton] = useState("Agregar Producto");
  const [productos, setProductos] = useState([]);
  const [colorBoton, setColorBoton] = useState("");

  useEffect(() => {
    const options = { method: "GET", url: "http://localhost:5000/productos" };

    axios
      .request(options)
      .then(function (response) {
        setProductos(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (mostrarTabla) {
      setTextoBoton("Agregar Producto");
      setColorBoton("blue-900");
    } else {
      setTextoBoton("Mostrar Productos");
      setColorBoton("green-500");
    }
  }, [mostrarTabla]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-start">
      <div className="flex flex-col">
        <h2 className="p-5 text-3xl font-extrabold text-gray-900  ">
          Administración de productos
        </h2>
        <button
          onClick={() => {
            setMostrarTabla(!mostrarTabla);
          }}
          className={`bg-${colorBoton} p-3 text-white rounded-lg shadow-md hover:bg-blue-400 m-6 w-28 self-end`}
        >
          {textoBoton}
        </button>
      </div>
      {mostrarTabla ? (
        <TablaProductos listaProductos={productos} />
      ) : (
        <FormularioProductos
          setMostrarTabla={setMostrarTabla}
          listaProductos={productos}
          setProductos={setProductos}
        />
      )}
      <ToastContainer position="bottom-center" autoClose={1000} />
    </div>
  );
};

const TablaProductos = ({ listaProductos }) => {
  const [busqueda, setBusqueda] = useState("");
  const [productoFiltrado, setProductoFiltrado] = useState(listaProductos);

  useEffect(() => {
    setProductoFiltrado(
      listaProductos.filter((elemento) => {
        return JSON.stringify(elemento)
          .toLowerCase()
          .includes(busqueda.toLowerCase());
      })
    );
  }, [busqueda]);

  useEffect(() => {}, [listaProductos]);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <input
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar Producto"
        className="self-start border-2 border-gray-800 bg-blue-100 border-gray-900 p-2 rounded-lg m-2"
      />
      <h2 className="m-9 text-center text-3xl font-extrabold text-gray-900">
        Todos lo Productos
      </h2>
      <table class="tabla">
        <thead>
          <tr>
            <th>Identificación Producto</th>
            <th>Valor Producto</th>
            <th>Estado Producto</th>
            <th>Descripción Producto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productoFiltrado.map((producto) => {
            return <FilaProducto key={nanoid()} producto={producto} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

const FilaProducto = ({ producto }) => {
  const [edit, setEdit] = useState(false);

  const [infoProducto, setInfoProducto] = useState({
    identificador: producto.identificador,
    valor: producto.valor,
    estado: producto.estado,
    descripcion: producto.descripcion,
  });
  const actualizarProducto = () => {
    console.log(infoProducto);
  };

  return (
    <tr>
      {edit ? (
        <>
          <td>
            <input
              className="border bg-gray-50 border-gray-600 p-2 rounded-lg m-2"
              type="text"
              placeholder={producto.identificador}
              value={infoProducto.identificador}
              onChange={(e) =>
                setInfoProducto({
                  ...infoProducto,
                  identificador: e.target.value,
                })
              }
            />
          </td>
          <td>
            <input
              className="border bg-gray-50 border-gray-600 p-2 rounded-lg m-2"
              type="number"
              placeholder={producto.valor}
              value={infoProducto.valor}
              onChange={(e) =>
                setInfoProducto({ ...infoProducto, valor: e.target.value })
              }
            />
          </td>
          <td>
            <select
              className="bg-gray-50 border-gray-600 p-2 rounded-lg m-2"
              required
              defaultValue={0}
              placeholder={producto.estado}
              value={infoProducto.estado}
              onChange={(e) =>
                setInfoProducto({ ...infoProducto, estado: e.target.value })
              }
            >
              <option disabled value={0}>
                Seleccione un Opción
              </option>
              <option>Disponible</option>
              <option>No Disponible</option>
            </select>
          </td>
          <td>
            <input
              className="border bg-gray-50 border-gray-600 p-2 rounded-lg m-2"
              type="text"
              placeholder={producto.identificador}
              value={infoProducto.descripcion}
              defaultValue={producto.descripcion}
              onChange={(e) =>
                setInfoProducto({
                  ...infoProducto,
                  descripcion: e.target.value,
                })
              }
            />
          </td>
        </>
      ) : (
        <>
          <td>{producto.identificador}</td>
          <td>{producto.valor}</td>
          <td>{producto.estado}</td>
          <td>{producto.descripcion}</td>
        </>
      )}

      <td>
        <div className="flex w-full justify-around">
          {edit ? (
            <i
              onClick={() => actualizarProducto()}
              className="fas fa-check hover:text-green-500"
            />
          ) : (
            <i
              onClick={() => setEdit(!edit)}
              className="fas fa-pencil-alt hover:text-green-500"
            />
          )}

          <i className="fas fa-trash hover:text-red-500" />
        </div>
      </td>
    </tr>
  );
};

const FormularioProductos = ({
  setMostrarTabla,
  listaProductos,
  setProductos,
}) => {
  const form = useRef(null);

  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);

    const nuevoProducto = {};
    fd.forEach((value, key) => {
      nuevoProducto[key] = value;
    });

    const options = {
      method: "POST",
      url: "http://localhost:5000/productos/nuevo",
      headers: { "Content-Type": "application/json" },
      data: {
        identificador: nuevoProducto.identificador,
        valor: nuevoProducto.valor,
        estado: nuevoProducto.estado,
        descripcion: nuevoProducto.descripcion,
      },
    };

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        toast.success("Producto Agregado!! ");
      })
      .catch(function (error) {
        console.error(error);
        toast.error("Producto No Agregado!! ");
      });

    setMostrarTabla(true);
  };

  const eliminarProducto = () => {};

  return (
    <form
      ref={form}
      onSubmit={submitForm}
      className="flex flex-col w-full items-center justify-center"
    >
      <h2 className="m-9 text-center text-3xl font-extrabold text-gray-900">
        Formulario de registro de productos
      </h2>
      <label htmlFor="identificador" className="flex flex-col items-center m-3">
        Identificador del Producto
        <input
          className="border bg-gray-50 border-gray-900 p-2 rounded-lg m-2"
          type="text"
          name="identificador"
          placeholder="Identificador del producto"
          required
        />
      </label>
      <label htmlFor="number" className="flex flex-col items-center m-3">
        Valor Unitario
        <input
          className="border bg-gray-50 border-gray-600 p-2 rounded-lg m-2"
          type="number"
          min={0}
          name="valor"
          placeholder="Valor Unitario"
          required
        />
      </label>

      <label htmlFor="estado" className="flex flex-col items-center m-3">
        Estado
        <select
          className="bg-gray-50 border-gray-600 p-2 rounded-lg m-2"
          name="estado"
          required
          defaultValue={0}
        >
          <option disabled value={0}>
            Seleccione un Opción
          </option>
          <option>Disponible</option>
          <option>No Disponible</option>
        </select>
      </label>

      <label htmlFor="descripcion" className="flex flex-col items-center m-3">
        Descripcion del Producto
        <input
          className="border bg-gray-50 border-gray-600 p-2 rounded-lg m-2"
          type="text"
          name="descripcion"
          placeholder="Descripcion del producto"
          required
        />
      </label>
      <button
        onClick={() => eliminarProducto()}
        className="bg-green-400 p-2 text-white rounded-lg shadow-md hover:bg-green-900"
      >
        Registrar
      </button>
    </form>
  );
};

export default Productos;
