import { data } from 'react-router-dom';
import { AuthContext, UserContext } from '../../App';
import React, { useContext, useEffect, useState } from 'react';

function FindJob() {

    const { isAuthenticated } = useContext(AuthContext);
    const { user } = useContext(UserContext);
    const [ posts, setPosts ]  = useState([])

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
                <h1 className="text-green-600 font-semibold text-2xl m-4 border-b-1 border-gray-300 pb-5">หางาน:</h1> 
                <div className="space-y-4 mt-4">
                    {posts.map((post, index) => (
                    <>
                        <div
                        // key={index}
                        className="pb-5 pr-5 pl-5 pt-3 border border-gray-200 rounded-2xl shadow-sm bg-white"
                        >
                        
                        <h1>{post.title}</h1>

                        </div>

                    </>
                    ))
                    }

                </div>
            </div>
        </>
    )
}

export default FindJob