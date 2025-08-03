import React, { useContext, useEffect, useState } from 'react';
import { AuthContext, UserContext } from '../../App';
import FavoriteButton from '../job_search/FavoriteButton';

function UserPage() {
    const { isAuthenticated } = useContext(AuthContext);
    const { user } = useContext(UserContext);
    const  [ favJobs, setFavJobs ] = useState([]) 

    useEffect(() => {
    if (!user || !user.id) return;
    
    const fetchFavorites = async () => {
        try {
        const res = await fetch(`http://localhost:8888/api/jobs/favorite?userId=${user.id}`, {
            credentials: "include"
        });
        const data = await res.json();
            setFavJobs(data)
        } catch (err) {
        console.error("Failed to fetch favorite jobs", err);
        }
    };
        fetchFavorites();
    }, [user]);

  if (!isAuthenticated) {
    return <p className="text-center mt-10">กรุณาเข้าสู่ระบบก่อนดูข้อมูล</p>;
  }

  if (!user) {
    return <p className="text-center mt-10">กำลังโหลดข้อมูลผู้ใช้...</p>;
  }

  const fullName = `${user.firstName} ${user.lastName}`;


  
  return (
    <>
    
      <div className='mx-auto max-w-xl flex flex-col'>
        <h1 className='text-2xl font-semibold flex items-center text-green-700 mt-5'>บัญชีผู้ใช้:</h1>
      </div>
      <div className='mx-auto max-w-xl border rounded-xl p-8 mt-5 mb-8 border-gray-300 flex flex-col shadow'>
        <div className='flex justify-between'>
          <h1 className='text-xl text-green-700 font-medium'>{user.username}</h1>
          <button className='bg-green-600 text-white px-3 py-1.5 rounded cursor-pointer hover:bg-green-700 disabled:opacity-50 shadow'>แก้ไข</button>
        </div>

        <br />
        <div className='ml-4 flex flex-col space-y-2'>
          <label><b>ชื่อ</b> : {fullName}</label>
          <label><b>อายุ</b> : {user.age}</label>
          <label><b>อีเมลล์</b> : {user.email}</label>
          <div>
            <b>รายละเอียด</b> : 
            {user.description === "" 
              ? <p className='text-gray-500 ml-4 mt-3'>(ไม่บังคับ) กรอกข้อมูลงานที่ต้องการ, ความสามารถ, ประสบการณ์</p> 
              : user.description
            }
          </div>
        </div>
      </div>
      <div className="p-4 max-w-xl mx-auto">
      <div className='mx-auto max-w-xl flex flex-col'>
        <h1 className='text-xl font-semibold flex items-center text-green-700'>งานที่สนใจ:</h1>
      </div>
      <>
            <div className="space-y-4 mt-4">
              {favJobs.map((job, index) => (
                <div
                  key={index}
                  className="pb-5 pr-5 pl-5 pt-3 border border-gray-200 rounded-2xl shadow-sm bg-white"
                >

                <div className='flex flex-row justify-between'>
                  <h3 className="text-lg font-bold text-green-600 flex justify-self-start">
                    {job.title}
                  </h3>
                  {isAuthenticated  ? 
                    <FavoriteButton className="flex justify-end" userId={user.id} title={job.title} company={job.company} location={job.location} salary={job.salary} url={job.url} src = {job.source} /> :
                    <FavoriteButton className="flex justify-end" disabled="true" />
                  }
                </div> 

                  <p className="mt-1 text-gray-700">
                    <span className="font-semibold">บริษัท:</span> {job.company}
                  </p>

                  <p className="mt-1 text-gray-700">
                    <span className="font-semibold">สถานที่:</span> {job.location}
                  </p>

                  <p className="mt-1 text-gray-700">
                    <span className="font-semibold">เงินเดือน:</span> {job.salary}
                  </p>

                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-sm text-blue-600 underline hover:text-blue-800"
                  >
                    ดูงานนี้
                  </a>

                  <p className="mt-1 text-gray-700 float-right">
                    <span className="font-semibold">ที่มา:</span>{' '}
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">
                      {job.source}
                    </span>
                  </p>

                </div>
              ))}
            </div>
          </>
    </div>
    </>
  );
}

export default UserPage;
