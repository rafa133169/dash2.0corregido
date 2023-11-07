import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const IndexUser = () => {
    const [ban, setBan] = useState(1);
    const [Users, setUsers] = useState([]);

    useEffect(() => {
        // Lógica para obtener los usuarios de la base de datos al cargar el componente
        fetchUsers();
    }, []);

    const fetchUsers = async () => {

        const response = await axios.get('http://localhost:3001/users'); // Ruta de la API para obtener usuarios
        setUsers(response.data);//Metiendo la respuesta(data) al estado 
        console.log(response.data);
    }

    const handleEditarClick = (userId) => () => {
        const dataToUpdate = {
          // Aquí puedes incluir los campos que deseas actualizar en el servidor
          // Ejemplo: name, email, etc.
          name: Name,
      email: Correo,
        };
    
    //     fetch(`https://api.example.com/users/${userId}`, {
    //       method: 'PUT',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(dataToUpdate),
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //       // Aquí puedes manejar la respuesta del servidor después de la actualización
    //       console.log('Respuesta del servidor:', data);
    //     })
    //     .catch(error => {
    //       // Aquí puedes manejar errores en la solicitud
    //       console.error('Error en la solicitud:', error);
    //     });
    //   };
      
      



    return (
        

            <div className="container mx-20 w-50  p-20">
                  
                <div class="row">
                   
                    <div class="offset-10 col-5 mb-5">

                        <a class="btn btn-success" href=''> <i class="fa-solid fa-user" ></i>Nuevo</a>
                    </div>
                </div>
                <div class="offset-2 col-11 mb-5">
                    <div class="card border">
                        <div class="card-header bg-dark">
                            <h1 class="text-white"><strong>Lista de usuarios</strong></h1>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered" id="tblArticulo" width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th> Usuario</th>
                                            <th>Correo Electronico</th>
                                            <th> Nombre</th>
                                            <th> Apellido</th>
                                            <th>Contraseña</th>
                                            <th> Acciones</th>
                                        </tr>

                                    </thead>
                                    <tbody>

                                            {Users.map((users) => (
                                                <tr key={users.PkUser}>
                                                    <td>{users.UserName} </td>
                                                    <td>{users.Correo} </td>
                                                    <td>{users.Name} </td>
                                                    <td>{users.lastName} </td>
                                                    <td> {users.Password}  </td>
                                                    <td>  {users.Create} </td>


                                                    <td>
                                                    <Link to={`/UpdateUser/${users.PkUser}`}>
                                                        <a class=" btn btn-warning mr-auto" > Editar</a> 
                                                        </Link> 
                                                           
                                                        {" "}
                                                        <a class=" btn btn-danger mr-auto" > Eliminar</a>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
    );

    if (ban ===1) {
        // No se renderizará nada si algunaCondicion es verdadera
        return null;
      }



};

};

export default IndexUser;
