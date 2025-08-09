import { useState } from "react"
import { FaArrowLeft } from "react-icons/fa"
import { Link } from "react-router-dom"
import ContactBox from "./ContactBox"


function CreatePost() {

    const [type,setType] = useState("find")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const [companyName, setCompanyName] = useState("")
    const [salary,setSalary] = useState("")

    const [contractor, setContractor] = useState("")
    const [pay,setPay] = useState("")

    const [location, setLocation] = useState("")


    const HandleSubmit = (e) =>
        {
            res = fetch("",{
                credentials:'include',
                method:'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                title,
                description,
                type,
            })
            })
            if(!res.ok) {
                console.log("Failed Posting")
            } else {

            }
        }


    return (
        <>

            <div className='p-4 max-w-4xl mx-auto'>
                <h1 className="text-2xl justify-self-center font-bold text-green-700 ml-4">เขียนโพสต์</h1>
                <div className="mt-4 border rounded  p-4">
                    <form onSubmit="" className="space-y-4 flex flex-col">

                        <label className="text-xl text-green-600 mb-2 font-medium">หัวข้อ :</label>
                        <input 
                        type="text" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}                        
                        className="border p-2 rounded w-full mb-2 shadow border-gray-400"
                        placeholder="กำลังมองหา..." />

                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="border p-2 rounded w-full mb-4 mr-2 shadow border-gray-400 flex  justify-start"
                        >
                            <option value="find">หางาน</option>
                            <option value="recruit">จ้างงาน</option>
                            <option value="contract">ฟรีแลนซ์</option>
                            
                        </select>

                        <label className="text-xl text-green-600 mb-1 font-medium">เนื้อหา :</label>
                        <textarea 
                        type="text" 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border p-2 rounded w-full mb-2 h-100 shadow border-gray-400 resize-none"
                        placeholder="เขียนรายละเอียดเกี่ยวกับงาน ความสามารถ เงินเดือน" />

                        {type == "recruit" ? 
                        <>
                            <label className="text-xl text-green-600 mb-1 font-medium">บริษัท :</label>
                            <input 
                            type="text" 
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="border p-2 rounded w-full mb-1 shadow border-gray-400"
                            placeholder="" />

                            <label className="text-xl text-green-600 mb-1 font-medium">สถานที่ :</label>
                            <input 
                            type="text" 
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}                            
                            className="border p-2 rounded w-full mb-2 shadow border-gray-400"
                            placeholder="" />

                            <label className="text-xl text-green-600 mb-1 font-medium">เงินเดือน :</label>
                            <input 
                            type="text" 
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                            className="border p-2 rounded w-full mb-4 shadow border-gray-400"
                            placeholder="" />
                        </>
                        :<></>}

                        {type == "contract" ? 
                        <>
                            <label className="text-xl text-green-600 mb-1 font-medium">ผู้ว่าจ้าง :</label>
                            <input 
                            type="text" 
                            value={contractor}
                            onChange={(e) => setContractor(e.target.value)}
                            className="border p-2 rounded w-full mb-1 shadow border-gray-400"
                            placeholder="" />

                            <label className="text-xl text-green-600 mb-1 font-medium">สถานที่ :</label>
                            <input 
                            type="text" 
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="border p-2 rounded w-full mb-2 shadow border-gray-400"
                            placeholder="" />

                            <label className="text-xl text-green-600 mb-1 font-medium">ค่าจ้าง :</label>
                            <input 
                            type="text" 
                            value={pay}
                            onChange={(e) => setPay(e.target.value)}
                            className="border p-2 rounded w-full mb-4 shadow border-gray-400"
                            placeholder="" />
                        </>
                        :<></>}

                        <label className="text-xl text-green-600 mb-2 font-medium">ช่องทางการติดต่อ :</label>
                        <ContactBox/>

                        <button type='submit' className=' bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50 cursor-pointer shadow'>โพสต์</button>

                    </form>
                </div>
            </div>
            
            <div className="fixed bottom-10 right-15">
            <Link to='/post' className="w-16 h-16 bg-green-600 text-white text-3xl font-semibold rounded-full hover:bg-green-700 shadow disabled:opacity-50 flex items-center justify-center">
                <FaArrowLeft/>
            </Link>
            </div>
        </>
    )
}

export default CreatePost