import { useEffect, useState } from "react"

function CommentList(props) {

    const [comments,setComments] = useState([])

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await fetch("",{
                    credentials:'include',
                    headers: {"Content-Type" : "application/json"},
                    method:"GET",
                })
                const data = await res.json()

            }catch (err){
                console.log("Failed fetching comments from "+ props.postType)
            }
        }
    },[])

    return (
        <>
            <h1>Hello From Comment List ({props.postType})</h1>
        </>
    )
}

export default CommentList