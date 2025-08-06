import { AuthContext, UserContext } from '../../App';
import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';

function HireJob() {

    const { isAuthenticated } = useContext(AuthContext);
    const { user } = useContext(UserContext);
    const [ posts, setPosts ]  = useState([])
    const [showContact, setShowContact] = useState()

    const HandleShowContact = (index) => {
        if (showContact === index) {
            setShowContact(null);
        } else {
            setShowContact(index);
        }
    };

    const FormatDate = (str) => {
        const date = new Date(str);

        const formattedDate = date.toLocaleDateString("en-GB"); 

        console.log(formattedDate);
        return formattedDate
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`http://localhost:8888/api/jobs/get/find`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });

                if (!res.ok) {
                    console.log("Failed fetching data");
                } else {
                    const data = await res.json()
                    setPosts(data)
                    console.log("Fetch FindPost Completed");
                    // console.log(data)
                }
            } catch (err) {
                console.error("Fetch error:", err);
            }
        };


        fetchData();
    }, []);

    return (
        <>
            <div className="flex flex-col w-150">
                <h1 className="text-green-600 font-semibold text-2xl m-4 border-b-1 border-gray-300 pb-3">หางาน:</h1>
                    <div className="space-y-4 mt-4">
                        {posts.map((post, index) => (
                            <div
                            key={index}
                            className="pb-6 pr-5 pl-5 pt-3 border border-gray-200 rounded-2xl shadow-sm bg-white flex flex-col"
                            >
                            
                            <div className='flex flex-row justify-between items-center '>
                                <h1 className='text-lg text-green-600 font-bold mb-4'>{post.title}</h1>
                                <label className='flex justify-end text-gray-400'>{FormatDate(post.CreatedAt)}</label>
                            </div>
                            <div className='mx-4 flex flex-col'>
                                <label className='text-gray-700 mb-2'>{post.description}</label>
                                
                                <button 
                                    className='mt-4 mb-2 font-semibold flex justify-start cursor-pointer' 
                                    onClick={() => HandleShowContact(index)}>
                                    ช่องทางการติดต่อ
                                    {showContact == index ?                           
                                        <FaCaretUp className='ml-1 mt-1' />
                                    :
                                        <FaCaretDown className='ml-1 mt-1' />
                                    }
                                </button>
                                {showContact === index ?                                 
                                <div className='mx-2 flex flex-col space-y-1'>
                                    {post.email != "" ? <label>อีเมลล์: {post.email}</label> : <></>}
                                    {post.tel != "" ? <label>เบอร์โทร: {post.tel}</label> : <></>}
                                    {post.line != "" ? <label>Line: {post.line}</label> : <></>}
                                    {post.instagram != "" ? <label>Instagram: {post.instagram}</label> : <></>}
                                    {post.facebook != "" ? <label>Facebook: {post.facebook}</label> : <></>}
                                    {post.linkedin != "" ? <label>Linkedin: {post.linkedin}</label> : <></>}
                                </div>
                                :<></>}
                                <label className='flex justify-end text-gray-400'>โพสต์โดย {post.posted_by?.username}</label>
                            </div>


                            </div>
                        ))
                        }

                    </div>
            </div>
        </>
    )
}

export default HireJob