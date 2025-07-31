import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

function RegisterPage() {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [show, setShow] = useState(false)
    const [redirect, setRedirect] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
       const res = await fetch("http://localhost:8888/api/register", {
            method : "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                username,
                email,
                password
            })
       })
       const data = await res.json();
       console.log(data)

       setRedirect(!redirect)
    }
    
    if (redirect){
        return <Navigate to="/login"/>
    }

    return (
        <div className='p-4 max-w-xl mx-auto border rounded-2xl border-gray-300 justify-self-center px-10 pt-8 pb-12 mt-15 shadow'>
            <h1 className="text-3xl font-bold mb-6 text-green-700">ลงทะเบียน</h1>
            <form onSubmit={handleSubmit}>
                <div className='justify-self-center flex flex-col'>
                    <label className='mb-2'>ชื่อผู้ใช้ :</label>
                    <input 
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={`border p-2 rounded w-85 mb-4 ` }
                        placeholder='username'
                    />

                    <label className='mb-2'>อีเมลล์ :</label>
                    <input 
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`border p-2 rounded w-85 mb-4 ` }
                        placeholder='example@gmail.com'
                    />

                    <div className='flex flex-row justify-between'>
                        <label className='mb-2'>รหัสผ่าน :</label>
                        <button
                            type="button"
                            onClick={() => setShow(!show)}
                            className="flex justify-end cursor-pointer hover:underline text-gray-400 mr-1"
                        >
                            {show ? "ซ่อน" : "แสดง"}
                        </button>
                    </div>

                    <input 
                        type={show ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`border p-2 rounded w-85 mb-4` }
                        placeholder={show ? 'Password1234 ': '************'}
                        
                    />
                    <label className='mb-2'>ยืนยันรหัสผ่าน :</label>
                    <input 
                        type={show ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`border p-2 rounded w-85 mb-4` }
                        placeholder={show ? 'Password1234 ': '************'}
                        
                    />

                    {password !== '' && confirmPassword !== '' && password !== confirmPassword ? <label className='text-red-500 '>** โปรดใส่รหัสผ่านให้ตรงกัน</label>:<></>}

                    <button type='submit' className=' bg-green-600 text-white px-4 pr-5 pl-5 py-2 mt-5 rounded hover:bg-green-700 disabled:opacity-50 cursor-pointer'>ลงทะเบียน</button>
                    <Link to="/login" className='text-blue-600 flex justify-center mt-5 hover:underline cursor-pointer'>มีบัญชีผู้ใช้อยู่แล้ว</Link>
                </div>
            </form>
        </div>
    )
}

export default RegisterPage