import React, {useState} from 'react';
import Input from "../../utils/input/Input";
import {useDispatch} from "react-redux";
import {login} from "../../actions/user";
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const history = useHistory();

    const {t} = useTranslation()

    const submitHandler = () => {
        if(email.trim() === '' || password.trim() == ''){
            alert('Fields are empty')
        }
        else{
            dispatch(login(email, password))
            localStorage.setItem("user", email);

            setTimeout(() => {
                history.push("/all");
            }, 500)
        }
        
    }

    return (
        <div className=' flex justify-center mt-20'>
            <div className=' bg-blue-400 w-96 p-10 rounded-lg'>
            <div className="block text-lg font-bold text-white my-2">{t('Log-In')}</div>
                <div className="block text-lg font-bold text-slate-700 my-2">E-mail</div>
                <Input
                    className="border-slate-200 w-full h-10 p-2 placeholder-slate-400 rounded-lg contrast-more:border-slate-400 contrast-more:placeholder-slate-500" 
                    value={email}
                    setValue={setEmail}
                    type={'email'}
                    placeholder={t('Your Email')}
                />

                <div className="block text-lg font-bold text-slate-700 my-2">{t('Password')}</div>
                <Input
                    className="border-slate-200 w-full h-10 p-2 placeholder-slate-400 rounded-lg contrast-more:border-slate-400 contrast-more:placeholder-slate-500" 
                    value={password}
                    setValue={setPassword}
                    type={'passwordemail'}
                    placeholder={t('Your Password')}
                />

                <div className=' flex justify-end'>
                    <button 
                        className=' bg-green-300 p-3 rounded-lg mt-5 hover:cursor-pointer'
                        onClick={submitHandler}
                    >
                        {t('Log-In')}
                    </button>
                </div>
            </div>
            
        </div>
    );
};

export default Login;
