import React, { useState } from 'react';
import { Link } from 'react-router-dom';



function LoginPage() {

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [show, setShow] = useState(false)
    const [redirect, setRedirect] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
       const res = await fetch("http://localhost:8888/auth/login", {
            method : "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                user,
                password
            })
       })
       const content = await res.json();
       console.log(content)

       setRedirect(!redirect)
    }
    
    if (redirect){
        return <Navigate to="/login"/>
    }

    return (
        <div className='p-4 max-w-xl mx-auto border rounded-2xl border-gray-300 justify-self-center px-10 pt-8 pb-12 mt-15'>
            <h1 className="text-3xl font-bold mb-6 text-green-700">เข้าสู่ระบบ</h1>
            <form onSubmit={handleSubmit}>
                <div className='justify-self-center flex flex-col'>
                    <label className='mb-2'>อีเมลล์ / ชื่อผู้ใช้ :</label>
                    <input 
                        type="text"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
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

                    <button type='submit' className=' bg-green-600 text-white px-4 pr-5 pl-5 py-2 mt-5 rounded hover:bg-green-700 disabled:opacity-50 cursor-pointer'>ล็อกอิน</button>
                    <Link to="/register" className='text-blue-600 flex justify-center mt-5 hover:underline cursor-pointer'>ไม่มีบัญชีผู้ใช้?</Link>
                </div>
            </form>
        </div>

    )
}

export default LoginPage    