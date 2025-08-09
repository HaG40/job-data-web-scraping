import { useState } from "react"

function ContactBox() {

    const [contact, setContact] = useState("email")

    return (
        <div className="flex flex-row justify-between">
            <select
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="border p-2 rounded w-fit mb-4 mr-2 shadow border-gray-400 flex  justify-start"
            >
                <option value="email">อีเมลล์</option>
                <option value="tel">เบอร์โทร</option>
                <option value="line">Line</option>
                <option value="instagram">Instagram</option>
                <option value="facebook">Facebook</option>
                <option value="linkedin">Linkedin</option>
                
            </select>
            <input 
            type="text" 
            className="border p-2 rounded w-full mb-4 shadow border-gray-400 flex justify-end"
            placeholder="" />
        </div>
    )
}

export default ContactBox