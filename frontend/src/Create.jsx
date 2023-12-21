import React from 'react'
import { useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Create() {
    const [values, setValues] = useState({
        name:'',
        email:'',
        id:''
    })
    const navigate = useNavigate();
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:8081/student', values)
        .then(res => {
                console.log(res);
                navigate('/')
            })
        .catch(err => console.log(err))
    }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={handleSubmit}>
                <h2>Ajouter étudiant</h2>
                <div className='mb-2'>
                    <label htmlFor=''>Nom</label>
                    <input type='text' placeholder='Entrer le nom' className='form-control'
                    onChange={e => setValues({...values, name: e.target.value})}
                    />
                </div>
                <div>
                    <label htmlFor="">E-mail</label>
                    <input type='text' placeholder='Entrer votre email' className='form-control'
                    onChange={e => setValues({...values, email: e.target.value})}
                    />
                </div>
                <button className='btn btn-success m-2'>submit</button>
            </form>
        </div>
    </div>
  )
}

export default Create
