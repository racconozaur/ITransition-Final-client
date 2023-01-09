import React, {useEffect} from 'react';
import Navbar from "./navbar/Navbar";
import './app.css'
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Registration from "./authorization/Registration";
import Login from "./authorization/Login";
import NotFound from './nooFound/NotFound';
import {useDispatch, useSelector} from "react-redux";
import {auth} from "../actions/user";
import { useState } from 'react';
// import axios from 'axios'
import User from './User/User';
import PostsList from './Posts/PostsList';
import PostDescription from './Posts/PostDescription';
import { setAdmin } from '../reducers/userReducer';
import MenuCard from './Card/MenuCard';
import useLocalstorage from '../hooks/use-localstorage';
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';
import axios from '../handlers/axiosHandler'


function App() {
    const [count, setCount] = useState(0)
    const isAuth = useSelector(state => state.user.isAuth)
    const isAdmin = useSelector(state => state.user.isAdmin)
    const dispatch = useDispatch()

    const [data, setData] = useState([])
    const [userData, setUserData] = useState([])
    const [comments, setComments] = useState([])
    const [tags, setTags] = useState([])

    const [darkMode, setDarkMode] = useState(false)

    const darkModeHandler = () => {
        if(darkMode){
            document.documentElement.classList.add('dark')
            setDarkMode(!darkMode)
        }
        else{
            document.documentElement.classList.remove('dark')
            setDarkMode(!darkMode)
        }
        
    }

    const getAllPosts = async () => {
        try {
            const res = await axios.get(`allposts`,

                    {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
        )
            setData(res.data)
            return res.data
        } catch (e) {
            console.log(e);
        }
    }

    const getAllUserInfo = async () => {
        try {
            const res = await axios.get(`allusers`,

                    {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
        )
            setUserData(res.data)
            return res.data
        } catch (e) {
            console.log(e);
        }
    }

    const getAllComments = async () => {
        try {
            const res = await axios.get(`allcomments`,

                    {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
        )
            setComments(res.data)
            return res.data
        } catch (e) {
            console.log(e);
        }
    }

    const getAllTags = async () => {
        try {
            const res = await axios.get(`alltags`)
            setTags(res.data)
            
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    userData.map(e => {
        if(e.email === localStorage.getItem('user') && e.role === 'admin'){
            dispatch(setAdmin())
        }
    })

    userData.map(e => {
        if(e.email === localStorage.getItem('user')){
            localStorage.setItem('id', e._id)
        }
    })


    useEffect(() => {
        dispatch(auth())
        // getAllUserInfo()
        const interval = setInterval(() => {
			getAllPosts()
            getAllUserInfo()
            getAllComments()
            getAllTags()
			console.log('hey');
		  }, 3000);
		  return () => clearInterval(interval);
    }, [count])


    const {t} = useTranslation;
    const [language, setLanguage] = useLocalstorage('language', 'ru')

    const handleLenguageChange = () => {
        if (language === 'en') {
            i18n.changeLanguage('ru');
            setLanguage('ru');
        } else if (language === 'ru') {
            i18n.changeLanguage('en');
            setLanguage('en');
        }
    };

    return (
        <BrowserRouter>
            <div  >
                <Navbar onDark={darkModeHandler} handleLenguageChange={handleLenguageChange} language={language}/>
                <main className=''>
                <div className="wrap ">
                    {!isAuth &&
                    <Switch>
                        {/* <Route path='/' >
                            <PostsList data={data}/>
                        </Route> */}
                        <Route path="/registration" component={Registration}/>
                        <Route path="/login" component={Login}/>
                        <Route exact path='/' component={NotFound}/>
                        <Route exact path='/all' >
                            <PostsList data={data} tags={tags}/>
                        </Route>
                        <Route path='/postinfo'>
                            <PostDescription comments={comments}/>
                        </Route>
                    </Switch>
                    }
                </div>

                    {/* {!isAuth ? '' :<p className=' text-white flex justify-center'>Sometimes you will need to reload page to see changes</p>} */}
                    
                    {/* <MenuCard className={'container mx-auto flex flex-col justify-cener'} data={data} updateEffect={updateEffect}/>  */}
                   
                
                    {isAuth 
                        ?   
                            <Switch>
                                <Route path={'/user/:id'}>
                                    <User data={data} userData={userData} tags={tags}/>
                                </Route>
                                <Route path='/all' >
                                    <PostsList data={data} tags={tags}/>
                                </Route>
                                <Route path='/postinfo'>
                                    <PostDescription comments={comments}/>
                                </Route>
                        
                                <Route path='/*' component={NotFound}/>
                            </Switch>
                        :   
                            <>
                            {/* <h2 className=' flex justify-center text-lg font-bold mt-10 text-white'>Hello u should Register or Log-In first :)</h2> */}
                            {/* <PostsList data={data}/> */}
                            </>
                            
                    }

                    {
                        isAdmin
                        ?
                            <Switch>
                                <Route path={'/allUsers'}>
                                    <MenuCard data={userData} className={' container mx-auto'}/>
                                </Route>
                            </Switch>
                        :
                            null
                    }
                </main>
            </div>
            
        </BrowserRouter>
    );
}

export default App;
