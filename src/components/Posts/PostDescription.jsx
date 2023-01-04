import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../../utils/button/Button';
import { sendComment } from '../../actions/user';
import logo from '../../assets/anonymous.jpg';
import Post from './Post';
import {useSelector} from "react-redux";
import { useTranslation } from 'react-i18next';

const PostDescription = (props) => {

    const location = useLocation()
    const {postId, author, title, category, rate, content, hashtags, prevPath, image, likes} = location.state

    const [comment, setComment] = useState('')

    const isAuth = useSelector(state => state.user.isAuth)

    const user = () =>{
        return localStorage.getItem('user') || `user: ${Math.random()}`
    }

    const {t} = useTranslation()

    const sendPostHandler = async () => {
        if(comment.trim() === '' ){
            alert('ur data is empty')
        }
        else{
            sendComment(postId, comment, user())
            setComment('')   
        }
    }

    const commentList = props.comments.map( e => {
        if(e.postId === postId){
            return(
                <div 
                    key={e._id}
                    className=' rounded-lg flex w-full mx-0 lg:mx-auto lg:w-5/12 border-4 p-4 m-4 dark:bg-slate-800 dark:text-white '
                >
                    {/* <img className='w-10 h-10 mr-2 rounded-full' src={logo} alt="logo" /> */}
                    <div className='flex justify-center items-center bg-slate-50 w-10 h-10 text-slate-800 p-4 mr-2 rounded-full'>
                        {e.author === undefined ? null : e.author.slice(0, 1).toUpperCase() }
                    </div>
                    <div>
                        <h2 className=' font-bold mb-2'>{e.author}</h2>
                        <div>{e.comment}</div>
                    </div>
                    
                </div>
            )
        }
        return null
    })


    return (
        <div className=' container mx-auto'>
            <Post
                key={postId}
                id={postId}
                sender={author}
                title={title}
                content={content}
                rate={rate}
                category={category}
                hashtags={hashtags}
                img={image}
                likes= {likes}
            />

            {
                isAuth 
                ?
                    <div className=' w-full mx-0 lg:mx-auto lg:w-5/12 my-4'>
                        <textarea 
                            value={comment} 
                            onChange={e => setComment(e.target.value)} 
                            type="text" 
                            className="px-3 py-2  text-black bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none w-full focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" 
                            placeholder={t("Your Comment")} required
                        />

                        <div className=' flex mt-2'>
                            <Button
                                onClick={sendPostHandler}
                                className=' bg-amber-100 rounded-md  px-3 py-2  hover:bg-amber-200 '
                            >
                                {t('Send')}
                            </Button>       
                        </div>          
                    </div>
                :
                    <div className='w-full mx-0 lg:mx-auto lg:w-5/12 my-4'>
                        <div className=' dark:text-white font-bold'>
                            {t('notRegisteredComment')}
                        </div>
                    </div>
            }

            
            <div className=' dark:text-white font-bold text-lg w-full mx-0 lg:mx-auto lg:w-5/12 my-4'>
                {t('Comments')}:
            </div>
            {
                commentList
            }

        </div>
    );
};

export default PostDescription;