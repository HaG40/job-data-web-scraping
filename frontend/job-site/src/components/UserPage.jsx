import React, { useState, useEffect } from 'react';



function UserPage() {
    
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [description,setDescription] = useState('')

    useEffect( () => {
    fetch("http://localhost:8888/api/user", { headers: {"Content-Type" : "application/json"} ,credentials: "include" })
        .then( async res => {
        if (res.ok) {
            const data = await res.json()
            setUsername(data.username)
            setEmail(data.email)
            setDescription(data.description)
        }else{
            console.log("Failed fetching user data")
        }
        })
    }, []);

    return (
        <div className='mx-auto max-w-xl border rounded-xl p-8 mt-15 border-gray-300 flex flex-col shadow'>
            <div className='flex justify-between'>
                <h1 className='text-xl text-green-700'>บัญชีผู้ใช้</h1>
                <button className='bg-green-600 text-white px-3 py-1.5 rounded cursor-pointer hover:bg-green-700 disabled:opacity-50 shadow'>แก้ไข</button>
            </div>

            <br />
            <div className='ml-4 flex flex-col'>
                <label><b>ชื่อผู้ใช้</b> : {username}</label>
                <label><b>อีเมลล์</b> : {email}</label>
            </div>

        </div>
    )
}

export default UserPage