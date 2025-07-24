import { useState } from "react";

function SideBar() { 

    const categoryList = ["กฏหมาย","การศึกษา/วิชาการ","การแพทย์","งานบริการ","ช่าง/ช่างเทคนิค","บัญชี","มนุษยศาสตร์/ล่าม","วิศวกรรม","โฆษณา/สื่อ","ไอที"]



    return (
        <div id="sidebar" className="h-screen w-40 fixed bg-gray-50 border-e border-gray-200 shadow flex items-center flex-col gap-2 overflow-y-auto pb-50">
            <div id="category-list" className="h-auto border-b border-gray-300 flex justify-center items-center w-full pt-4 bg-green-100 sticky top-0 rounded-b-lg shadow">
                <h2 className="flex pb-5 text-green-800 font-medium">ประเภทงานแนะนำ</h2>
            </div>
            {categoryList.map((category,index) => (
                <CategoryItemComponent index={index+1} value={category} />    
            ))}
        </div>
    )
}

function CategoryItemComponent(props) {
    return (
        <div id= {"category-"+props.index} className=" border-b border-gray-300 flex flex-col w-full ">
            <ul className=" border-b border-gray-300 pb-3 flex text-green-700 justify-center items-center">{props.value}</ul>
            {/* <li className="justify-self-left">1</li> */}
        </div>
    )
}

export default SideBar;