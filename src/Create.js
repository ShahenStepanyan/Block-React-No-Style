import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';


function Create() {
    const [inputData, setInputData] = useState({
        title: '',
        body: '',
        creator: localStorage.getItem('token')
    })
    const navigate = useNavigate();


    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3002/post', inputData)
        .then(res => {
            alert("Data Posted Successfully!")

            navigate('/home')
        })
    }
  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>

        <div className='w-50 border bg-secondary text-white p-5'>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">title</label>
                    <input type="text" name='title'
                    onChange={e => setInputData({...inputData, title: e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="text">body</label>
                    <input type="text" name='body'
                    onChange={e => setInputData({...inputData, body: e.target.value})}/>
                </div><br />
                <button className='btn btn-info'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default Create