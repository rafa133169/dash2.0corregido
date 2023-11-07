import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";

const AddProductos = () => {
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

  // Función para obtener los fabricantes desde la API
  const obtenerFabricantes = async () => {
    try {
      const response = await fetch("http://localhost:3001/fabricantes");
      if (response.ok) {
        const data = await response.json();
        setFabricantes(data);
      } else {
        console.error("Error al obtener los fabricantes");
      }
    } catch (error) {
      console.error("Error al comunicarse con la API", error);
    }
  };

  // Llamada a obtenerProductos y obtenerFabricantes cuando el componente se monta
  useEffect(() => {
    obtenerProductos();
    obtenerFabricantes();
  }, []);

  const handleAgregarProducto = async (event) => {
    event.preventDefault();

    try {
      const nuevoProducto = {
        nombre: productoSeleccionado.nombre,
        precio: productoSeleccionado.precio,
        id_fabricante_id: fabricanteSeleccionado,
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
        setFabricanteSeleccionado("");
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
          <Col xs lg="4" className="mt-2">
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
                  placeholder="5000"
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
                <Form.Label>Fabricante</Form.Label>
                <Form.Select value={fabricanteSeleccionado} onChange={(event) => setFabricanteSeleccionado(event.target.value) }>
                  <option value="">Selecciona un fabricante</option>
                  {fabricantes.map((fabricante) => (
                    <option key={fabricante.id_fabricante} value={fabricante.id_fabricante}>
                      {fabricante.nombre}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Button variant="outline-primary" type="submit">
                Registrar
              </Button>
            </Form>
          </Col>
          <Col xs lg="8" className="mt-2">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Fabricante</th>
                  <th>Actualizar</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto) => (
                  <tr key={producto.id_producto}>
                    <td>{producto.id_producto}</td>
                    <td>{producto.nombre}</td>
                    <td>{producto.precio}</td>
                    <td>{producto.fabricante}</td>
                    <td>
                      <Button
                        variant="outline-warning"
                        onClick={() => handleAbrirModalEditar(producto)}
                      >
                        Actualizar
                      </Button>
                    </td>
                    <td>
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
            </Table>
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
                  })
                }
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
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fabricante</Form.Label>
              <Form.Select
                value={productoSeleccionadoEditar.id_fabricante_id || ""}
                onChange={(event) =>
                  setProductoSeleccionadoEditar({
                    ...productoSeleccionadoEditar,
                    id_fabricante_id: event.target.value,
                  })
                }
              >
                <option value="">Selecciona un fabricante</option>
                {fabricantes.map((fabricante) => (
                  <option
                    key={fabricante.id_fabricante}
                    value={fabricante.id_fabricante}
                  >
                    {fabricante.nombre}
                  </option>
                ))}
              </Form.Select>
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

export default AddProductos;