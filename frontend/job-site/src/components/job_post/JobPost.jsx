import { FaPlus } from "react-icons/fa"
import FindJob from "./FindJob"
import RecruitJob from "./RecruitJob"
import ContractJob from "./ContractJob"


function JobPost() {
    return (
        <>
         <div className='p-4 max-w-xl mx-auto'>
            <h1 className="text-2xl justify-self-center font-bold text-green-700 ml-4">Job Posts</h1>
         </div>
         <div className="flex flex-row justify-center w-screen h-max px-15 gap-x-8">
            <FindJob />
            <RecruitJob />
            <ContractJob />
         </div>
        <div className="fixed bottom-10 right-15">
        <button className="w-16 h-16 bg-green-600 text-white text-3xl font-semibold rounded-full hover:bg-green-700 shadow disabled:opacity-50 flex items-center justify-center">
            <FaPlus/>
        </button>
        </div>
        </>

    )
}

export default JobPost