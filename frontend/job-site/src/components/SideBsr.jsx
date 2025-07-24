import { useState } from "react";

function SideBar() { 

    const categoryList = ["กฏหมาย","การศึกษา/วิชาการ","การแพทย์","งานบริการ","ช่าง/ช่างเทคนิค","บัญชี","มนุษยศาสตร์/ล่าม","วิศวกรรม","โฆษณา/สื่อ","ไอที"]
    const jobList = [["ทนายความ","นักกฏหมาย","นิติกร"],
                    ["ครู","บรรณารักษ์","อาจารย์","ติวเตอร์ "],
                    ["ทันตแพทย์","เทคนิคการแพทย์","สัตวแพทย์","เภสัชกรรม","พยาบาลวิชาชีพ",],
                    ["พนักงานต้อนรับ","พนักงานบริการ","แม่บ้าน","บาริสต้า"],
                    ["ช่างไฟฟ้า","ช่างยนต์","ช่างแอร์"],
                    ["พนักงานบัญชี","ผู้ตรวจสอบบัญชี","เจ้าหน้าที่การเงิน"],
                    ["ล่ามภาษาอังกฤษ","ล่ามภาษาจีน","เจ้าหน้าที่สื่อสารองค์กร"],
                    ["วิศวกรเขียนแบบ","วิศวกรไฟฟ้า","วิศวกรเครื่องกล","วิศวกรโยธา"],
                    ["นักออกแบบกราฟิก","ครีเอทีฟ"],
                    ["Developer","Software Engineer","System Analyst","Data Analyst"]]

    return (
        <div id="sidebar" className="h-screen w-50 fixed bg-gray-50 border-e border-gray-200 shadow flex items-center flex-col overflow-y-auto pb-50">
            <div id="category-list" className="h-auto border-b border-gray-300 flex justify-center items-center w-full pt-4 bg-yellow-100 sticky top-0 rounded-b-lg shadow">
                <h2 className="flex pb-5 text-green-800 font-medium">ประเภทงานแนะนำ</h2>
            </div>
            {categoryList.map((category,index) => (
                <CategoryItemComponent index={index+1} value={category} jobItems={jobList[index]} />    
            ))}
        </div>
    )
}

function CategoryItemComponent(props) {
    const [isOpen, setIsOpen] = useState(false)

    const handleClick = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div id= {"category-"+props.index} className="border-b border-gray-300 flex flex-col w-full">
            <ul 
                className="border-b border-gray-300 pb-3 pt-3 flex text-green-700 justify-center items-center cursor-pointer hover:bg-yellow-50 hover:text-yellow-800"
                onClick={handleClick}    
            >{props.value}</ul>
            {isOpen && (
                <ul>
                    {props.jobItems.map((item,i) => (
                      <li className="p-1.5 pl-2">
                        {item}
                      </li>  
                    ))}
                </ul>


            )}
        </div>
    )
}

export default SideBar;