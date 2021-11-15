import React, { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { nanoid } from "nanoid";
//import axios from "axios";
import { Tooltip } from "@material-ui/core";
import { Dialog } from "@material-ui/core";
import {
  createProduct,
  getProducts,
  editProduct,
  deleteProduct,
} from "../../utils/api.js";

const Productos = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [textoBoton, setTextoBoton] = useState("Agregar Producto");
  const [productos, setProductos] = useState([]);
  const [colorBoton, setColorBoton] = useState("");
  const [ejecutarConsulta, setEjecutarConsulta] = useState(true);

  useEffect(() => {
    console.log("consulta", ejecutarConsulta);
    if (ejecutarConsulta) {
      getProducts(
        (response) => {
          setProductos(response.data);
          setEjecutarConsulta(false);
        },
        (error) => {
          console.error(error);
        }
      );
      setEjecutarConsulta(false);
    }
  }, [ejecutarConsulta]);

  useEffect(() => {
    //obtener lista de productos desde el backend
    if (mostrarTabla) {
      setEjecutarConsulta(true);
    }
  }, [mostrarTabla]);

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
        <TablaProductos
          listaProductos={productos}
          setEjecutarConsulta={setEjecutarConsulta}
        />
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

const TablaProductos = ({ listaProductos, setEjecutarConsulta }) => {
  const [busqueda, setBusqueda] = useState("");
  const [productoFiltrado, setProductoFiltrado] = useState(listaProductos);

  useEffect(() => {
    setProductoFiltrado(
      listaProductos.filter((elemento) => {
        console.log("elemento", elemento);
        return JSON.stringify(elemento)
          .toLowerCase()
          .includes(busqueda.toLowerCase());
      })
    );
  }, [busqueda, listaProductos]);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <input
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar Producto"
        className="self-start border-2 bg-blue-100 border-gray-900 p-2 rounded-lg m-2"
      />
      <h2 className="m-9 text-center text-3xl font-extrabold text-gray-900">
        Todos lo Productos
      </h2>
      <table className="tabla">
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
            return (
              <FilaProducto
                key={nanoid()}
                producto={producto}
                setEjecutarConsulta={setEjecutarConsulta}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const FilaProducto = ({ producto, setEjecutarConsulta }) => {
  const [edit, setEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const [infoNuevoProducto, setInfoNuevoProducto] = useState({
    identificador: producto.identificador,
    valor: producto.valor,
    estado: producto.estado,
    descripcion: producto.descripcion,
  });

  const actualizarProducto = async () => {
    console.log(infoNuevoProducto);
    //enviar info a backend

    await editProduct(
      producto._id,
      infoNuevoProducto,
      (response) => {
        console.log(response.data);
        toast.success("Producto modificado con éxito");
        setEdit(false);
        setEjecutarConsulta(true);
      },
      (error) => {
        toast.error("Error modificando el producto");
        console.error(error);
      }
    );
  };

  const eliminarProducto = async () => {
    await deleteProduct(
      producto._id,
      (response) => {
        console.log(response.data);
        toast.success("producto eliminado con éxito");
        setEjecutarConsulta(true);
      },
      (error) => {
        console.error(error);
        toast.error("Error eliminando el producto");
      }
    );

    setOpenDialog(false);
  };

  return (
    <tr>
      {edit ? (
        <>
          <td>
            <input
              className="border bg-gray-50 border-gray-600 p-2 rounded-lg m-2"
              type="text"
              value={infoNuevoProducto.identificador}
              onChange={(e) =>
                setInfoNuevoProducto({
                  ...infoNuevoProducto,
                  identificador: e.target.value,
                })
              }
            />
          </td>
          <td>
            <input
              className="border bg-gray-50 border-gray-600 p-2 rounded-lg m-2"
              type="number"
              value={infoNuevoProducto.valor}
              onChange={(e) =>
                setInfoNuevoProducto({
                  ...infoNuevoProducto,
                  valor: e.target.value,
                })
              }
            />
          </td>
          <td>
            <select
              className="bg-gray-50 border-gray-600 p-2 rounded-lg m-2"
              name="estado"
              value={infoNuevoProducto.estado}
              onChange={(e) =>
                setInfoNuevoProducto({
                  ...infoNuevoProducto,
                  estado: e.target.value,
                })
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
              value={infoNuevoProducto.descripcion}
              onChange={(e) =>
                setInfoNuevoProducto({
                  ...infoNuevoProducto,
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
            <>
              <Tooltip title="Confirmar Edición">
                <i
                  onClick={() => actualizarProducto()}
                  className="fas fa-check hover:text-green-500"
                />
              </Tooltip>
              <Tooltip title="Cancelar Edición">
                <i
                  onClick={() => setEdit(!edit)}
                  className="fas fa-ban hover:text-red-500"
                />
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip title="Editar Producto">
                <i
                  onClick={() => setEdit(!edit)}
                  className="fas fa-pencil-alt hover:text-green-500"
                />
              </Tooltip>
              <Tooltip title="Eliminar Producto">
                <i
                  onClick={() => setOpenDialog(true)}
                  className="fas fa-trash hover:text-red-500"
                />
              </Tooltip>
            </>
          )}
        </div>
        <Dialog open={openDialog}>
          <div className="p-8 flex flex-col bg-gray-300 rounded">
            <h1 className="text-gray-900 text-2xl font-bold">
              Desea eliminar el producto
            </h1>
            <div
              onClick={() => eliminarProducto()}
              className="flex w-full items-center justify-center m-4"
            >
              <button className="mx-2 px-6 py-2 bg-green-500 text-white m-4 hover:bg-green-700 rounded-md shadow-md">
                SI
              </button>
              <button
                onClick={() => setOpenDialog(false)}
                className="mx-2 px-4 py-2 bg-red-500 text-white hover:bg-red-700 rounded-md shadow-md"
              >
                NO
              </button>
            </div>
          </div>
        </Dialog>
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

    await createProduct(
      {
        identificador: nuevoProducto.identificador,
        valor: nuevoProducto.valor,
        estado: nuevoProducto.estado,
        descripcion: nuevoProducto.descripcion,
      },
      (response) => {
        console.log(response.data);
        toast.success("Producto Agregado!! ");
      },
      (error) => {
        console.error(error);
        toast.error("Producto No agregado!! ");
      }
    );

    setMostrarTabla(true);
  };

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
        type="submit"
        className="bg-green-400 p-2 text-white rounded-lg shadow-md hover:bg-green-900"
      >
        Registrar
      </button>
    </form>
  );
};

export default Productos;
