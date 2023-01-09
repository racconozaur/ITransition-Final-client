import React, { useEffect, useState } from 'react';
import { sendPost } from '../../actions/user';
import Post from '../Posts/Post';
import {useSelector} from "react-redux";
// import axios from 'axios'
import { useParams} from 'react-router-dom'
import { Link } from 'react-router-dom';
import { BsImage } from "react-icons/bs";
import { useTranslation } from 'react-i18next';
import axios from '../../handlers/axiosHandler'

const User = (props) => {

    const isAdmin = useSelector(state => state.user.isAdmin)

    const [userInfo, setUserInfo] = useState([])
    const [posts, setPosts] = useState([])

    const [value, setValue] = useState('')
    const [theme, setTheme] = useState('')
    const [rate, setRate] = useState(0)
    const [newtag, setNewTag] = useState('')
    const [image, setImage] = useState()

    const [drag, setDrag] = useState(false)

    const {t} = useTranslation()

    const dragStartHandler = (e) => {
        e.preventDefault()
        setDrag(true)
    }
    const dragLeaveHandler = (e) => {
        e.preventDefault()
        setDrag(false)
    }

    const onDropHandler = (e) => {
        e.preventDefault()
        let files = [...e.dataTransfer.files]
        setImage(files[0])
        setDrag(false)
        console.log(image);
    }
    
    

    const [isOpen, setIsOpen] = useState(false)


    const options = [
        {value: '', text: '--Choose an option--'},
        {value: 'Games', text: 'Games'},
        {value: 'Films', text: 'Films'},
        {value: 'Music', text: 'Music'},
        {value: 'Books', text: 'Books'},
      ];

    const [selected, setSelected] = useState(options[1].value);

    let params = useParams();

    const getoneuser = async (id) => {
        try {
            const res = await axios.get(`getoneuser/${id}`)
            setUserInfo(res.data)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const getPostsFrom = async (sender) => {
        try {
            const res = await axios.get(`getpostsfrom/${sender}`)
            setPosts(res.data)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    


    useEffect(() => {         
        const interval = setInterval(() => {
            getoneuser(params.id)
			getPostsFrom(params.id)
		  }, 3000)
          return () => clearInterval(interval);
        
    }, [])

    const sendMessage = async () => {
        if(value.trim() === '' || 
           theme.trim() === '' || 
           rate.trim() === '' ||
           selected.trim() === '' ||
           newtag.trim() === ''
           ){
            alert('ur data is empty')
        }
        else{
            const formData = new FormData()
            formData.append('sender', userInfo.email)
            formData.append('senderid', params.id)
            formData.append('title', theme)
            formData.append('content', value)
            formData.append('rate', rate)
            formData.append('category', selected)
            formData.append('hashtags', newtag)
            formData.append('testImage', image)

            sendPost(formData)
            setValue('')
            setTheme('')
            setRate(0)
            setSelected('')
            setNewTag('')
            setImage()     
        }
    }

    const data = posts.map(e => {
        return (
            <Post
                key={e._id}
                id={e._id}
                sender={e.sender}
                title={e.title}
                content={e.content}
                rate={e.rate}
                category={e.category}
                hashtags={e.hashtags}
                img={e.image}
                likes={e.likes}
            />
        )
    })

    const handleChange = event => {
        setSelected(event.target.value);
      };

    const filterTags = props.tags.filter(e => {
        return e.tag.toLowerCase().includes(newtag.toLowerCase())

    })

    const itemClickHandler = (e) => {
        setNewTag(e.target.textContent)
        setIsOpen(false)
    }

    return (
        <div className=' container mx-auto'>
           
            <div className=' flex items-center flex-col '>
                
                    <div className=' flex flex-col justify-center text-lg w-full mx-0 lg:mx-auto lg:w-3/6 font-bold border-4  p-4 rounded-lg dark:text-white dark:bg-slate-800'>                   
                        <div className='flex items-top'>
                            <div className='flex justify-center items-center bg-slate-50 w-16 h-16 text-slate-800 p-4 rounded-full'>
                                {userInfo.email === undefined ? null : userInfo.email.slice(0, 1).toUpperCase() }
                            </div>
                            <div className='mx-4'>
                                <p>{t('Name')}: {userInfo.email}</p>
                                <p>{t('Registeration Date')}: {userInfo.date}</p>
                                <div className='my-2'>
                                    <div className={userInfo.status === 'active' ? 'bg-green-300' : 'bg-red-400'}>{t('Status')}: {userInfo.status}</div>
                                    <div className={userInfo.role === 'user' ? 'bg-blue-300' : 'bg-yellow-400'}>{t('Role')}: {userInfo.role}</div>
                                </div>
                                
                            </div>
                        </div>
                        
                        <div className='mt-4'>    
                            {userInfo.role === 'admin' ? <div className=' mt-4 flex bg-yellow-300 rounded-lg w-fit p-2 hover:bg-yellow-400 cursor-pointer'><Link to={'/allUsers'}>{t('Admin panel')}</Link></div> : null}
                        </div>
                    </div>

                    <div className=' my-4 flex p-4 flex-col w-full mx-0 lg:mx-auto lg:w-3/6 border-4 dark:bg-slate-800 rounded-lg '>
                        {userInfo.status === 'active' || isAdmin 
                            ? 
                        <>
                        <input 
                            value={theme} 
                            onChange={e => setTheme(e.target.value)} 
                            type="text" 
                            className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block  rounded-md sm:text-sm focus:ring-1" 
                            placeholder={t("Recomendation")} required
                        />
                        
                        <input 
                            value={rate} 
                            onChange={e => setRate(e.target.value)} 
                            type="number"
                            min={0}
                            max={10} 
                            className="px-3 py-2  bg-white border my-4 shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" 
                            placeholder={t("Rate")} required
                        />

                        <select 
                            value={selected} 
                            onChange={handleChange}
                            className="px-3 py-2  bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" 
                        >
                            
                                {options.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.text}
                                </option>
                                ))}
                        </select>              

                        <textarea 
                            value={value} 
                            onChange={e => setValue(e.target.value)} 
                            type="text" 
                            className="px-3 py-2 bg-white my-4 h-44 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" 
                            placeholder={t("Description")} required
                        />

                        <input 
                            value={newtag} 
                            onChange={e => setNewTag(e.target.value)}
                            onClick={() => setIsOpen(true)} 
                            type="text" 
                            className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" 
                            placeholder={t("Tags")} required
                        />
                        <ul className=' absolute bg-white w-96 list-none z-50 max-h-36 h-auto overflow-auto container mx-auto rounded-lg ' style={{top: `41rem`}}>
                            {
                                newtag && isOpen
                                ?
                                filterTags.map((tag, index) => {
                                        return (
                                            <li 
                                                onClick={itemClickHandler}
                                                className=' cursor-pointer hover:bg-slate-300'
                                            >
                                                {tag.tag}
                                                
                                            </li>
                                        )
                                    })
                                :
                                    null
                            }
                            
                        </ul>
                        
                        {
                            drag
                            ?
                            <div
                                onDragStart={e => dragStartHandler(e)}
                                onDragLeave={e => dragLeaveHandler(e)}
                                onDragOver={e => dragStartHandler(e)}
                                onDrop={e => onDropHandler(e)} 
                                className='w-full h-16 mt-4 flex flex-col items-center justify-center rounded-lg border-4 border-dotted border-sky-500 bg-white'
                            >
                                <BsImage/>
                                <div className=' text-xs'>Drop image</div>
                            </div>
                            :
                            <div 
                                onDragStart={e => dragStartHandler(e)}
                                onDragLeave={e => dragLeaveHandler(e)}
                                onDragOver={e => dragStartHandler(e)}
                                className='w-full h-16 mt-4 flex flex-col items-center justify-center rounded-lg border-4 border-dotted border-slate-300 bg-white'
                            >
                                <BsImage/>
                                <div className=' text-xs'>{t('Drag and Drop image')}</div>
                            </div>
                        }
                        
                        
                        <div className=' flex justify-between w-full'>

                            <button
                                onClick={sendMessage}
                                className=' bg-amber-100 rounded-md my-4 px-3 py-2  hover:bg-amber-200 '
                            >
                                {t('Send')}
                            </button>
                            
                        </div>
                        </>
                        : <div className='dark:text-white'>{t('Blocked')}</div> 
                        }
                    </div>
                
                
                <div className='dark:text-white'>{t('Your posts')}</div>
         
                {posts.length > 0 
                    ?
                    <div className=' w-full'>{data.reverse()}</div>
                    :
                    <div className=' dark:text-white'>{t('loading')}...</div>
                }
            
            </div>
            
        </div>
    );
};

export default User;