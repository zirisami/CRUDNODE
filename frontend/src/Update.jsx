import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Update() {
  const { id } = useParams();
  const navigate = useNavigate()
  const [values, setValues] = useState({
    nom: '',
    email: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:8081/read/${id}`)
      .then(res => {
        const { nom, email } = res.data[0];
        setValues({ nom, email });
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8081/update/${id}`, {
      name: values.nom,
      email: values.email,
    })
      .then(res => {
        console.log(res);
        navigate('/');
      })
      .catch(err => console.error(err));
  };

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
      <h2>Editer les données : </h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-2'>
          <label htmlFor="nom">Nom</label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={values.nom}
            onChange={handleChange}
            className='form-control'
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            className='form-control'
          />
        </div>
        <button type="submit" className='btn btn-success m-2'>Valider</button>
      </form>
      </div>
    </div>
  );
}

export default Update;

