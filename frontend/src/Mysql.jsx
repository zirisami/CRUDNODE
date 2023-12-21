import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Mysql() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/')
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8081/delete/${id}`)
      .then((res) => {
        console.log('Delete successful:', res.data);
        location.reload();
      })
      .catch((error) => {
        console.error('Error deleting:', error.message);
      });
  };

  return (
    <>
      <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
          <h2>Liste des utilisateurs : </h2>
          <div className='d-flex justify-content-end'> 
            <Link to="/create" className='btn btn-success'>créer un utilisateur</Link>
          </div>
          <div className='d-flex justify-content-end'>
          </div>
          <table className='table table-bordered table-striped'>
            <thead>
              <tr>
                <th>id</th>
                <th>nom</th>
                <th>email</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) ? (
                data.map((students, index) => (
                  <tr key={index}>
                    <td>{students.id}</td>
                    <td>{students.nom}</td>
                    <td>{students.email}</td>
                    <td>
                      <Link to={`/read/${students.id}`} className='btn btn-sm btn-primary mx-2'>Voir</Link>
                      <Link to={`/edit/${students.id}`} className='btn btn-sm btn-info mx-2'>Editer</Link>
                      <button onClick={() => handleDelete(students.id)} className='btn btn-sm btn-danger mx-2'>Supprimer</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">Loading...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Mysql;
