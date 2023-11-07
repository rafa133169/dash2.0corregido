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


 const IndexUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);
 
  const [showModal, setShowModal] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({});

  const [showModalEditar, setShowModalEditar] = useState(false);
  const [usuarioSeleccionadoEditar, setUsuarioSeleccionadoEditar] = useState(
    {}
  );

  // Función para obtener los usuarios desde la API
  const obtenerUsuarios = async () => {
    try {
      const response = await fetch("http://localhost:3001/usuarios");
      if (response.ok) {
        const data = await response.json();
        setUsuarios(data);
        console.log(data);
      } else {
        console.error("Error al obtener los usuarios");
      }
    } catch (error) {
      console.error("Error al comunicarse con la API", error);
    }
  };

 

  // Llamada a obtenerUsuarios y obtenerFabricantes cuando el componente se monta
  useEffect(() => {
    obtenerUsuarios();
    
  }, []);

  const handleAgregarUsuario = async (event) => {
    event.preventDefault();

    try {
      const nuevoUsuario = {
        nombre_completo: usuarioSeleccionado.nombre_completo,
        nameUser: usuarioSeleccionado.nameUser,
        correo: usuarioSeleccionado.correo,
        password: usuarioSeleccionado.password

      };

      const response = await fetch("http://localhost:3001/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoUsuario),
      });

      if (response.ok) {
        const data = await response.json();
        setUsuarios([...usuarios, data]);
        setUsuarioSeleccionado({});
        
        setShowModal(false);
      } else {
        console.error("Error al agregar el usuario");
      }
    } catch (error) {
      console.error("Error al comunicarse con la API", error);
    }
  };

  const handleActualizarUsuario = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3001/usuarios/${usuarioSeleccionadoEditar.id_user}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(usuarioSeleccionadoEditar),
        }
      );

      if (response.ok) {
        obtenerUsuarios();
        setShowModalEditar(false);
        setUsuarioSeleccionadoEditar({});
      } else {
        console.error("Error al actualizar el usuaio");
      }
    } catch (error) {
      console.error("Error al comunicarse con la API", error);
    }
  };

  const handleEliminarUsuario = async (usuario) => {
    try {
      const response = await fetch(
        `http://localhost:3001/usuarios/${usuario.id_user}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Si la solicitud fue exitosa, actualiza el estado de los productos sin el producto eliminado
        const usuariosActualizados = usuarios.filter(
          (u) => u.id_user !== usuario.id_user
        );
        setUsuarios(usuariosActualizados);
      } else {
        // Maneja el caso en que la solicitud no sea exitosa
        console.error("Error al eliminar el usuario");
      }
    } catch (error) {
      console.error("Error al comunicarse con la API", error);
    }
  };

  const handleAbrirModalEditar = (usuario) => {
    setUsuarioSeleccionadoEditar(usuario);
    setShowModalEditar(true);
  };

  return (
    <>
      <Container>
        <Row>
          
            <Form onSubmit={handleAgregarUsuario}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre_completo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="nombre_completo"
                  value={usuarioSeleccionado.nombre_completo || ""}
                  onChange={(event) =>
                    setUsuarioSeleccionado({
                      ...usuarioSeleccionado,
                      nombre_completo: event.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Nombre_Usuario</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="NameUser"
                  value={usuarioSeleccionado.nameUser || ""}
                  onChange={(event) =>
                    setUsuarioSeleccionado({
                      ...usuarioSeleccionado,
                      nameUser: event.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Correo</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Correo"
                  value={usuarioSeleccionado.correo || ""}
                  onChange={(event) =>
                    setUsuarioSeleccionado({
                      ...usuarioSeleccionado,
                      correo: event.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Contraseña"
                  value={usuarioSeleccionado.password || ""}
                  onChange={(event) =>
                    setUsuarioSeleccionado({
                      ...usuarioSeleccionado,
                      password: event.target.value,
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
                  <th class="border border-slate-300 ...">Nombre_completo</th>
                  <th class="border border-slate-300 ...">Nombre_Usuario</th>
                  <th class="border border-slate-300 ...">correo</th>
                  <th class="border border-slate-300 ...">password</th>
                  <th class="border border-slate-300 ...">Actualizar</th>
                  <th class="border border-slate-300 ...">Eliminar</th>
    </tr>
  </thead>
  <tbody>
  {usuarios.map((usuario) => (
  <tr key={usuario.id_user}>
    <td class="border border-slate-300 ...">{usuario.id_user}</td>
                    <td class="border border-slate-300 ...">{usuario.nombre_completo}</td>
                    <td class="border border-slate-300 ...">{usuario.nameUser}</td>
                    <td class="border border-slate-300 ...">{usuario.correo}</td>
                    <td class="border border-slate-300 ...">{usuario.password}</td>
                    <td class="border border-slate-300 ...">
                      <Button variant="outline-success"
                        
                        onClick={() => handleAbrirModalEditar(usuario)}
                        // <Button variant="outline-success">Success</Button>{' '}
                        // <button class="rounded-full ...">Save Changes</button>
                        // <a className=" btn btn-warning mr-auto" onClick={()=> handleAbrirModalEditar(producto)}> Editar</a>
                      >
                        Actualizar
                      </Button>
                    </td>
                    <td class="border border-slate-300 ...">
                       <Button
                        variant="outline-danger"
                        onClick={() => handleEliminarUsuario(usuario)}
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
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleActualizarUsuario}>
            <Form.Group className="mb-3">
              <Form.Label>nombre_completo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre Completo"
                value={usuarioSeleccionadoEditar.nombre_completo || ""}
                onChange={(event) =>
                  setUsuarioSeleccionadoEditar({
                    ...usuarioSeleccionadoEditar,
                    nombre_completo: event.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nombre_Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="nameUser"
                value={usuarioSeleccionadoEditar.nameUser || ""}
                onChange={(event) =>
                  setUsuarioSeleccionadoEditar({
                    ...usuarioSeleccionadoEditar,
                    nameUser: event.target.value,
                  })
                }
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
                <Form.Label>Correo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Correo Electronico"
                  value={usuarioSeleccionadoEditar.correo || ""}
                  onChange={(event) =>
                    setUsuarioSeleccionadoEditar({
                      ...usuarioSeleccionadoEditar,
                      correo: event.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>password</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Contraseña"
                  value={usuarioSeleccionadoEditar.password || ""}
                  onChange={(event) =>
                    setUsuarioSeleccionadoEditar({
                      ...usuarioSeleccionadoEditar,
                      password: event.target.value,
                    })
                  }
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

export default IndexUsuario;