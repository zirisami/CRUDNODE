import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Read() {
    const { id } = useParams();
    const [students, setStudents] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8081/read/${id}`)
            .then(res => {
                console.log(res);
                setStudents(res.data);
            })
            .catch(err => console.log(err));
    }, [id]);

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <h2>-----------Details des utilisateurs-----------</h2>
                {students.length > 0 ? (
                    <>
                        <h2>id : {students[0].id}</h2>
                        <h2>nom : {students[0].nom}</h2>
                        <h2>E-mail : {students[0].email}</h2>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <div>
                <Link to='/' className="btn btn-primary mx-2">précédent</Link>
                {students.map(student => (
                    <Link key={student.id} to={`/edit/${student.id}`} className='btn btn-info'>editer</Link>
                ))}
            </div>
        </div>
    );
}

export default Read;