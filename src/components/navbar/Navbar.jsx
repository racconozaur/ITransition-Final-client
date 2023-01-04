import React, { useState } from 'react';
import {NavLink, Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../reducers/userReducer";
import {BsFillMoonStarsFill} from 'react-icons/bs'
import { useTranslation } from 'react-i18next';
import useLocalstorage from '../../hooks/use-localstorage';
import i18n from '../../i18n';

const Navbar = (props) => {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()
    const {t} = useTranslation()
    const [language, setLanguage] = useLocalstorage('language', 'ru')
    const [changeLang, setChangeLang] = useState(true)

    const handleLenguageChange = () => {
        i18n.changeLanguage('ru');
        setLanguage('ru');
        setChangeLang(false)
        // if (language === 'en') {
        //     i18n.changeLanguage('ru');
        //     setLanguage('ru');
        //     console.log('ry');
        // } else if (language === 'ru') {
        //     i18n.changeLanguage('en');
        //     setLanguage('en');
        //     console.log('eng');
        // }
    };

    const handleLenguageChangeEn = () => {
        i18n.changeLanguage('en');
        setLanguage('en');
        setChangeLang(true)
    }

    return (
        <header>
            <nav className='relative flex flex-wrap items-center justify-between px-2 py-3 mb-4 bg-blue-500'>
                <div className='container px-4 mx-auto flex flex-wrap items-center justify-between'>
                    <div className='w-full relative flex justify-between lg:w-auto  px-3 lg:static lg:block lg:justify-start'>
                        <NavLink
                            className='text-sm font-bold leading-relaxed inline-block py-2 whitespace-nowrap uppercase text-white'
                            to='/all'
                        >
                            Recomendations
                        </NavLink>
                    </div>
                    <div
                        className='lg:flex flex-grow items-center'
                        id='example-navbar-warning'
                    >
                        <ul className='flex flex-col lg:flex-row list-none ml-auto'>
                            <li className='nav-item'>
                                {!isAuth && <NavLink
                                    className='px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75'
                                    to='/login'
                                >
                                    {t('Log-In')}
                                </NavLink>}
                            </li>
                            <li className='nav-item'>
                                {!isAuth && <NavLink
                                    className='px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75'
                                    to='/registration'
                                >
                                    {t('Registeration')}
                                </NavLink>}
                            </li>
                            <li className='nav-item'>
                                {isAuth && <NavLink
                                    className='px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75 hover:cursor-pointer'
                                    to={`/user/${localStorage.getItem('id')}`}
                                >
                                    {localStorage.getItem('user')}
                                </NavLink>}
                            </li>
                            <li className='nav-item'>
                                {isAuth && <div
                                    className='px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75 hover:cursor-pointer'
                                    onClick={() => dispatch(logout()) }
                                >
                                    {t('Exit')}
                                </div>}
                            </li>
                            <li className='px-3  flex items-center'>
                                <BsFillMoonStarsFill className=' cursor-pointer text-xl dark:text-slate-50' onClick={props.onDark}/>
                            </li>
                            {
                                changeLang
                                ?
                            
                                <li className='px-3  flex items-center dark:text-white'>
                                    <button onClick={handleLenguageChange}>
        
                                        ru
                                    </button>
                                </li>
                                :
                                <li className='px-3  flex items-center dark:text-white'>
                                    <button onClick={handleLenguageChangeEn}>
                                        
                                        en
                                    </button>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
