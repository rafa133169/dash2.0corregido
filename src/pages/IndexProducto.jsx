import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import 'bootstrap/dist/css/bootstrap.min.css';



import { useNavigate } from 'react-router-dom'; //Servira para editar y busque por Id


 const IndexProductos = () => {
  const [productos, setProductos] = useState([]);
  const [fabricantes, setFabricantes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState({});
  const [fabricanteSeleccionado, setFabricanteSeleccionado] = useState("");

  const [showModalEditar, setShowModalEditar] = useState(false);
  const [productoSeleccionadoEditar, setProductoSeleccionadoEditar] = useState(
    {}
  );

  // Función para obtener los productos desde la API
  const obtenerProductos = async () => {
    try {
      const response = await fetch("http://localhost:3001/productos");
      if (response.ok) {
        const data = await response.json();
        setProductos(data);
        console.log(data);
      } else {
        console.error("Error al obtener los productos");
      }
    } catch (error) {
      console.error("Error al comunicarse con la API", error);
    }
  };

 

  // Llamada a obtenerProductos y obtenerFabricantes cuando el componente se monta
  useEffect(() => {
    obtenerProductos();
    
  }, []);

  const handleAgregarProducto = async (event) => {
    event.preventDefault();

    try {
      const nuevoProducto = {
        nombre: productoSeleccionado.nombre,
        precio: productoSeleccionado.precio,
        cantidad: productoSeleccionado.cantidad,
        imagen: productoSeleccionado.imagen

      };

      const response = await fetch("http://localhost:3001/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoProducto),
      });

      if (response.ok) {
        const data = await response.json();
        setProductos([...productos, data]);
        setProductoSeleccionado({});
        
        setShowModal(false);
      } else {
        console.error("Error al agregar el producto");
      }
    } catch (error) {
      console.error("Error al comunicarse con la API", error);
    }
  };

  const handleActualizarProducto = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3001/productos/${productoSeleccionadoEditar.id_producto}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productoSeleccionadoEditar),
        }
      );

      if (response.ok) {
        obtenerProductos();
        setShowModalEditar(false);
        setProductoSeleccionadoEditar({});
      } else {
        console.error("Error al actualizar el producto");
      }
    } catch (error) {
      console.error("Error al comunicarse con la API", error);
    }
  };

  const handleEliminarProducto = async (producto) => {
    try {
      const response = await fetch(
        `http://localhost:3001/productos/${producto.id_producto}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Si la solicitud fue exitosa, actualiza el estado de los productos sin el producto eliminado
        const productosActualizados = productos.filter(
          (p) => p.id_producto !== producto.id_producto
        );
        setProductos(productosActualizados);
      } else {
        // Maneja el caso en que la solicitud no sea exitosa
        console.error("Error al eliminar el producto");
      }
    } catch (error) {
      console.error("Error al comunicarse con la API", error);
    }
  };

  const handleAbrirModalEditar = (producto) => {
    setProductoSeleccionadoEditar(producto);
    setShowModalEditar(true);
  };

  return (
    <>
      <Container>
        <Row>
          
            <Form onSubmit={handleAgregarProducto}>
              <Form.Group className="mb-3">
                <Form.Label>Producto</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nombre Producto"
                  value={productoSeleccionado.nombre || ""}
                  onChange={(event) =>
                    setProductoSeleccionado({
                      ...productoSeleccionado,
                      nombre: event.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Precio"
                  value={productoSeleccionado.precio || ""}
                  onChange={(event) =>
                    setProductoSeleccionado({
                      ...productoSeleccionado,
                      precio: event.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Cantidad en Stock"
                  value={productoSeleccionado.cantidad || ""}
                  onChange={(event) =>
                    setProductoSeleccionado({
                      ...productoSeleccionado,
                      cantidad: event.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Imagen</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa la URL de la imagen"
                  value={productoSeleccionado.imagen || ""}
                  onChange={(event) =>
                    setProductoSeleccionado({
                      ...productoSeleccionado,
                      imagen: event.target.value,
                    })
                  }
                />
              </Form.Group>

              
              <Button variant="outline-primary" type="onSubmit">
                Registrar
              </Button>
            </Form>
            
          <Col xs lg="8" className="mt-2">
          <br /><br /><br /><br />
          <table class="border-separate border-spacing-2 border border-slate-400 ...">
     <thead>
    <tr>
    <th class="border border-slate-300 ...">#</th>
                  <th class="border border-slate-300 ...">Nombre</th>
                  <th class="border border-slate-300 ...">Precio</th>
                  <th class="border border-slate-300 ...">Stock</th>
                  <th class="border border-slate-300 ...">imagen</th>
                  <th class="border border-slate-300 ...">Actualizar</th>
                  <th class="border border-slate-300 ...">Eliminar</th>
    </tr>
  </thead>
  <tbody>
  {productos.map((producto) => (
  <tr key={producto.id_producto}>
    <td class="border border-slate-300 ...">{producto.id_producto}</td>
                    <td class="border border-slate-300 ...">{producto.nombre}</td>
                    <td class="border border-slate-300 ...">{producto.precio}</td>
                    <td class="border border-slate-300 ...">{producto.cantidad}</td>
                    <td class="border border-slate-300 ...">{producto.imagen}</td>
                    <td class="border border-slate-300 ...">
                      <Button variant="outline-success"
                        
                        onClick={() => handleAbrirModalEditar(producto)}
                       
                      >
                        Actualizar
                      </Button>
                    </td>
                    <td class="border border-slate-300 ...">
                       <Button
                        variant="outline-danger"
                        onClick={() => handleEliminarProducto(producto)}
                      >
                        Eliminar
                      </Button> 
                      
                      
                    </td>
                    
    </tr>
    ))}
  </tbody>
</table>
          </Col>
        </Row>
      </Container>
      
      {/* Modal para editar producto */}
      <Modal show={showModalEditar} onHide={() => setShowModalEditar(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleActualizarProducto}>
            <Form.Group className="mb-3">
              <Form.Label>Producto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre Producto"
                value={productoSeleccionadoEditar.nombre || ""}
                onChange={(event) =>
                  setProductoSeleccionadoEditar({
                    ...productoSeleccionadoEditar,
                    nombre: event.target.value,
                  }) }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                placeholder="5000"
                value={productoSeleccionadoEditar.precio || ""}
                onChange={(event) =>
                  setProductoSeleccionadoEditar({
                    ...productoSeleccionadoEditar,
                    precio: event.target.value,
                  })  }
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Cantidad en Stock"
                  value={productoSeleccionadoEditar.cantidad || ""}
                  onChange={(event) =>
                    setProductoSeleccionadoEditar({
                      ...productoSeleccionadoEditar,
                      cantidad: event.target.value,
                    }) }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Imagen</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa la URL de la imagen"
                  value={productoSeleccionadoEditar.imagen || ""}
                  onChange={(event) =>
                    setProductoSeleccionadoEditar({
                      ...productoSeleccionadoEditar,
                      imagen: event.target.value,
                    }) }
                />
              </Form.Group>
            <Button variant="outline-primary" type="submit">
              Actualizar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      

      
    </>
  );
};

export default IndexProductos;