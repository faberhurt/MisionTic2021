import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const productosBackend = [
  {
    identificador: "product001",
    valor: "1000",
    estado: "available",
    descripcion: "primer producto",
  },
  {
    identificador: "product002",
    valor: "2000",
    estado: "available",
    descripcion: "segundo producto",
  },
  {
    identificador: "product003",
    valor: "3000",
    estado: "unavailable",
    descripcion: "tercer producto",
  },
];

const Productos = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [textoBoton, setTextoBoton] = useState("Agregar Producto");
  const [productos, setProductos] = useState([]);
  const [colorBoton, setColorBoton] = useState("");

  useEffect(() => {
    setProductos(productosBackend);
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
          cambioTabla={setMostrarTabla}
          listaProductos={productos}
          AgregarProducto={setProductos}
        />
      )}
      <ToastContainer position="bottom-center" autoClose={1000} />
    </div>
  );
};

const TablaProductos = ({ listaProductos }) => {
  useEffect(() => {
    console.log("listado de productos Tabla:");
  }, [listaProductos]);

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="m-9 text-center text-3xl font-extrabold text-gray-900">
        Todos lo Productos
      </h2>
      <table>
        <thead>
          <tr>
            <th>Identificación Producto</th>
            <th>Valor Producto</th>
            <th>Estado Producto</th>
            <th>Descripción Producto</th>
          </tr>
        </thead>
        <tbody>
          {listaProductos.map((producto) => {
            return (
              <tr>
                <td>{producto.identificador}</td>
                <td>{producto.valor}</td>
                <td>{producto.estado}</td>
                <td>{producto.descripcion}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const FormularioProductos = ({
  cambioTabla,
  listaProductos,
  AgregarProducto,
}) => {
  const [identificador, setIdentificador] = useState("");
  const [valor, setValor] = useState(0);
  const [estado, setEstado] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const GuardarProducto = () => {
    console.log(
      "identificador:",
      identificador,
      "valor:",
      valor,
      "estado",
      estado,
      "descripcion:",
      descripcion
    );
    if (
      identificador === "" ||
      valor === 0 ||
      estado === "" ||
      descripcion === ""
    ) {
      toast.error("Ingresar Información Completa!", {
        position: "bottom-center",
        autoClose: 3000,
      });
    } else {
      toast.success("Producto Guardado!", {
        position: "bottom-center",
        autoClose: 1000,
      });
      cambioTabla(true);
      AgregarProducto([
        ...listaProductos,
        {
          identificador: identificador,
          valor: valor,
          estado: estado,
          descripcion: descripcion,
        },
      ]);
    }
  };

  return (
    <form className="flex flex-col w-full items-center justify-center">
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
          value={identificador}
          onChange={(e) => {
            setIdentificador(e.target.value);
          }}
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
          value={valor}
          onChange={(e) => {
            setValor(e.target.value);
          }}
          required
        />
      </label>

      <label htmlFor="estado" className="flex flex-col items-center m-3">
        Estado
        <select
          value={estado}
          onChange={(e) => {
            setEstado(e.target.value);
          }}
          className="bg-gray-50 border-gray-600 p-2 rounded-lg m-2"
          name="estado"
          required
        >
          <option disabled>Seleccione un Opción</option>
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
          value={descripcion}
          onChange={(e) => {
            setDescripcion(e.target.value);
          }}
          required
        />
      </label>
      <button
        type="submit"
        className="bg-green-400 p-2 text-white rounded-lg shadow-md hover:bg-green-900"
        onClick={() => {
          GuardarProducto();
        }}
      >
        Registrar
      </button>
    </form>
  );
};

export default Productos;
