import { useEffect, useState } from "react"
import TimeAgo from "../../utils/TimeAgo"

function CommentList(props) {

    const [comments,setComments] = useState([])
    const [msg, setMsg] = useState("")
    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await fetch(`http://localhost:8888/api/jobs/get/comments?type=${props.postType}&post_id=${props.postID}`,{
                    headers: {"Content-Type" : "application/json"},
                    method:"GET",
                })
                const data = await res.json()
                console.log("Fetch Comments Completed");
                setComments(data)
                // console.log(data)

            }catch (err){
                console.log("Failed fetching comments from "+ props.postType)
                setMsg("ไม่พบความคิดเห็น")
                console.log(msg)
            }
        }

        fetchComments()

    },[])

    return (
        <>
        <div className=" p-5 border rounded-xl border-gray-300 flex flex-col shadow">
            <h1 className='text-md text-green-600 font-semibold mb-2.5'>ความคิดเห็น</h1>
            {comments.length == 0 ? 
            <>
                <h1 className='flex justify-center text-gray-400'>{msg}</h1>
            </>        
            :
            <>
                {comments.map((comment, index) => 
                    <div className="mx-2 flex flex-col mb-2">
                        <div className="flex flex-row justify-between">
                            <h1 className='text-black flex mb-1 font-semibold'>{comment.username+" : "}</h1>
                            <label className='flex justify-end text-gray-400'>{TimeAgo(comment.created_at)}</label>
                        </div>

                        <label className="text-gray-500 flex mx-2.5">{comment.text}</label>
                    </div>            
                )}
            </>
            }
        </div>
        </>
    )
}

export default CommentList