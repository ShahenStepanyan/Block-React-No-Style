import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Pagination from "./pagination/Pagination";



function Home() {
    const [loading, setLoading] = useState(false)

    const [postpage, setPostPage] = useState(1)
    const [postPerPage] = useState(5)
    const [data, setData] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        axios.get('http://localhost:3002/post')
            .then(res => {
                setLoading(false)
                return setData(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    function tes(value) {
        let tok = localStorage.getItem('token')
        if(tok === value){
            return <a>Update</a>
        }
    }
    function  tesdel(value) {
        let tok = localStorage.getItem('token')
        if(tok === value) {
            return <a>Delete</a>
        }
    }

    const lastPostIndex = postpage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentPost = data.slice(firstPostIndex, lastPostIndex)

    const paginate = pageNumber => setPostPage(pageNumber)


        return (
            <div className='container '>


                <h2>Blog</h2>
                <Link to="/create" className='btn btn-success my-3'>Create +</Link>
                <table className='table'>
                    <thead>
                    <tr>
                        <th>title</th>
                        <th>body</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentPost.map((d, i) => (
                        <tr key={i}>
                            <td style={{border: '1px solid black'}}>{d.title}</td>
                            <td style={{border: '1px solid black'}}>{d.body}</td>

                            <td>
                                <Link className='text-decoration-none btn btn-sm btn-success' to={`/update/${d.id}`}>{tes(d.creator)}</Link>
                                <Link className='text-decoration-none btn btn-sm btn-danger'
                                        onClick={e => handleDelete(d.id)}>{tesdel(d.creator)}</Link>
                                <Link className='text-decoration-none btn btn-sm btn-primary'
                                      to={`/read/${d.id}`}>Read</Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <Pagination
                    postPerPage={postPerPage}
                    totalPost={data.length}
                    paginate={paginate}
                />
            </div>
        )

        function handleDelete(id) {
            const confirm = window.confirm("Do you like to Delete?");
            if (confirm) {
                axios.delete('http://localhost:3002/post/' + id)
                    .then(res => {
                        alert("Record Deleted");
                        navigate('/home')
                        window.location.reload()
                    })
            }
        }

    }
export default Home