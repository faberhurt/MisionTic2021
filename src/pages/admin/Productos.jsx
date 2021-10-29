import React, { useEffect, useState } from "react";

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

  useEffect(() => {
    setProductos(productosBackend);
  }, []);

  useEffect(() => {
    if (mostrarTabla) {
      setTextoBoton("Agregar Producto");
    } else {
      setTextoBoton("Mostrar Productos");
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
          className="bg-blue-900 p-3 text-white rounded-lg shadow-md hover:bg-blue-400 m-6 w-28 self-end"
        >
          {textoBoton}
        </button>
      </div>
      {mostrarTabla ? (
        <TablaProductos listaProductos={productos} />
      ) : (
        <FormularioProductos />
      )}
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

              {listaProductos.map((producto)=>{
                  return(
                    <tr>
                    <td>{producto.identificador}</td>
                    <td>{producto.valor}</td>
                    <td>{producto.estado}</td>
                    <td>{producto.descripcion}</td>
                  </tr>
                  )
              })}
          </tbody>
      </table>
    </div>
  );
};

const FormularioProductos = () => {
  return (
    <form className="flex flex-col w-full items-center justify-center">
      <h2 className="m-9 text-center text-3xl font-extrabold text-gray-900">
        Formulario de registro de productos
      </h2>
      <input
        className="border bg-gray-50 border-gray-900 p-2 rounded-lg m-2"
        type="text"
        name="identificador"
        placeholder="Identificador del producto"
      />
      <input
        className="border bg-gray-50 border-gray-600 p-2 rounded-lg m-2"
        type="number"
        name="valor"
        placeholder="Valor Unitario"
      />
      <div class="block">
        <span className="text-gray-700">Radio Buttons</span>
        <div className="mt-2">
          <div>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="estado"
                value="available"
                checked
              />
              <span className="ml-2">Disponible</span>
            </label>
          </div>
          <div>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="estado"
                value="unavailable"
              />
              <span class="ml-2">No Disponible</span>
            </label>
          </div>
        </div>
      </div>
      <input
        className="border bg-gray-50 border-gray-600 p-2 rounded-lg m-2"
        type="text"
        name="descripcion"
        placeholder="Descripcion del producto"
      />
      <button className="bg-green-400 p-2 text-white rounded-lg shadow-md hover:bg-green-900">
        Registrar
      </button>
    </form>
  );
};

export default Productos;
