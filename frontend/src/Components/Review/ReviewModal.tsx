import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Reply } from "../Replies/Reply"
import { getAllRepliesByReview } from "../../FrontendAPI/api"
import { UserContext } from "../../Contexts/UserContext"
import { ReviewInterface } from "../../Interfaces/ReviewInterface"
import StarRating from "./StarRating"
import { ReplyInterface } from "../../Interfaces/ReplyInterface"
import { get } from "http"
import { addReply } from "../../FrontendAPI/api"
import { NewReply} from "../Reply/NewReply"
import { ReactToReview } from "./ReactToReview"
import { DeleteReview } from "./DeleteReview"

export const ReviewModal: React.FC<ReviewInterface> = (review:ReviewInterface) => {

    const [thisReview, setThisReview] = useState<ReviewInterface>(review)
    const [replies, setReplies] = useState<ReplyInterface[]>([])

    const [replyCollection, setReplyCollection] = useState([])

    //When the review loads then we need to fetch all replies for the current review.  Then we can properly map the replies to the reply component.
    const fetchReplies = getAllRepliesByReview
    const { currentUser } = useContext(UserContext)

    useEffect(() => {
        const result = fetchReplies(currentUser?.jwt as string,review.id as number)
        //.then((result) => {setReplies(result.data)})  //Need to convert result into an array of replies.
    }, [])

    return (
            <div className="modal fade" id="reviewModal" tabIndex={-1} aria-labelledby="reviewModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="reviewModalLabel">{review.title}</h5>
                            <h6 className="modal-title">{review.username}</h6>
                            <span>{<StarRating {...thisReview}/>} </span>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>{review.body}</p>
                          <h3>Replies</h3>
                          {replyCollection.map((reply:any) => {return(<Reply {...reply} key={reply.replyID}/>)})}
                        </div>
                        <div className="modal-footer">
                            <span>{<ReactToReview/>}{thisReview.score}</span>
                            <button type="button" className="btn btn-secondary" >View Replies</button>
                            {review.userId == currentUser?.id as number  || currentUser?.role == "ADMIN"? <DeleteReview {...review}/>:""}
                            {"TODO: user is owner then show" && <button type="button" className="btn btn-primary">Edit</button>}
                            {"TODO: user is not ownder then show" && <NewReply {...thisReview}/>}
                        </div>
                    </div>
                </div> 
            </div>
    )
}