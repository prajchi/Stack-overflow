import React,{useState} from 'react'
import moment from 'moment'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Avatar from '../../components/Avatar/Avatar'
import { deleteAnswer } from '../../actions/question'
import Acomments from './Acomments'
import { postaComment } from '../../actions/question'
import './Questions.css'

const DisplayAnswer = ({question, handleShare}) => {

    const User = useSelector((state) => (state.currentUserReducer))
    const navigate = useNavigate()
    const { id } = useParams()
    const dispatch = useDispatch()
    const handleDelete = (answerId, noOfAnswers) => {
        dispatch(deleteAnswer(id, answerId, noOfAnswers - 1))   
    }
    const[Show, setShow] = useState(false) // for comment
    const [comment, setComment ] = useState('')    

    const handleComment = (e,Iddd) => {
        e.preventDefault()
        if(User === null){
            alert('Login or Signup to add a comment')
            navigate('/Auth')
        }else{
            if(Comment === ''){
                alert('Enter a comment before submitting')
            }else{
                dispatch(postaComment({id,answerId: Iddd, commentBody : comment, userCommented: User.result.name}))    ////////
            }
        }
    }
    const handleEnter = (e) => {
        if(e.key === 'Enter'){
            setComment(Comment + "\n") 
        }
    }
           
    return (
        <div>
            {
                question.answer.map((ans) => (
                    <div className="display-ans" key={ans._id}>
                        <p>{ans.answerBody}</p>
                        <div className="question-actions-user">
                            <div>
                                <button type="button" onClick={handleShare}>Share</button>
                                {
                                    User?.result?._id === ans?.userId && (
                                        <button type='button' onClick={() => handleDelete(ans._id, question.noOfAnswers )}>Delete</button>
                                    )
                                }
                            </div>
                            <div>
                                <p>answered {moment(ans.answeredOn).fromNow()}</p>
                                <Link to={`/Users/${ans.userId}`} className='user-link' style={{color:'#0086d8'}}>
                                    <Avatar backgroundColor="lightgreen" px='8px' py='5px' borderRadius='4px'>{ans.userAnswered.charAt(0).toUpperCase()}</Avatar>
                                    <div>
                                        {ans.userAnswered}
                                    </div>
                                </Link>

                            </div>
                        </div>


                        <Acomments key={ans._id} parameterrr={ans}/>
                        
                        <div  className='commentbox' >
                            <button onClick={() => setShow(!Show)} >Add a Comment</button>
                             
                                <form onSubmit={ (e) => { handleComment(e, ans._id) } }>
                                {
                                    Show && (<div className='title'>
                                        <textarea name="" id="" onChange={(e) => {setComment(e.target.value)}} cols="30" rows="10" placeholder='Add your comment...' onKeyPress= {(e) => {handleEnter(e,ans._id)}}></textarea><br/>
                                        <input type='Submit' className='inputs' value='Add Comment' />
                                    </div>)
                                }
                                </form>
                        </div> 
                    </div>
                


                ))
            }
        </div>
    )
}

export default DisplayAnswer
