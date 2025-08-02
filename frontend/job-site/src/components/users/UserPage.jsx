import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../App';
import calculateAge from '../../utils/CalculateAge';


function UserPage() {
    
    const [username, setUsername] = useState('')
    const [name, setName] = useState("")
    const [age,setAge] = useState("")
    const [email, setEmail] = useState('')
    const [description,setDescription] = useState('')
    const { isAuthenticated } = useContext(AuthContext)

    useEffect( () => {
    fetch("http://localhost:8888/api/user", { headers: {"Content-Type" : "application/json"} ,credentials: "include" })
        .then( async res => {
        if (res.ok) {
            const data = await res.json()
            setUsername(data.username)
            setName(data.first_name + " " + data.last_name)
            setAge(calculateAge(data.date_of_birth))
            setEmail(data.email)
            setDescription(data.description)
        }else{
            console.log("Failed fetching user data")
        }
        })
    }, []);

    return (
        <>        
            <div className='mx-auto max-w-xl flex flex-col'>
                <h1 className='text-2xl font-semibold flex items-center text-green-700  mt-5'>บัญชีผู้ใช้:</h1>        
            </div>
            <div className='mx-auto max-w-xl border rounded-xl p-8 mt-5 mb-8 border-gray-300 flex flex-col shadow'>
                <div className='flex justify-between'>
                    <h1 className='text-xl text-green-700 font-medium'>{username}</h1>
                    <button className='bg-green-600 text-white px-3 py-1.5 rounded cursor-pointer hover:bg-green-700 disabled:opacity-50 shadow'>แก้ไข</button>
                </div>

                <br />
                <div className='ml-4 flex flex-col'>
                    <label><b>ชื่อ</b> : {name}</label>
                    <label><b>อายุ</b> : {age}</label>
                    <label><b>อีเมลล์</b> : {email}</label>
                    <label><b>รายละเอียด</b> : {description == "" ? <p className='text-gray-500 ml-4 mt-3'>(ไม่บังคับ) กรอกข้อมูลงานที่ต้องการ, ความสามารถ, ประสบการณ์</p>:{description}}</label>
                </div>

            
            </div>
            <div className='mx-auto max-w-xl flex flex-col'>
                <h1 className='text-xl font-semibold flex items-center text-green-700'>งานที่สนใจ:</h1>        
            </div>
        </>
    )
}

export default UserPage