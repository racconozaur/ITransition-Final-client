import React, {useState} from 'react';
import Input from "../../utils/input/Input";
import {registration} from "../../actions/user";
import { useTranslation } from 'react-i18next';

const Registration = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const {t} = useTranslation()

    return (
        // <div className='authorization'>
        //     <div className="authorization__header">Регистрация</div>
        //     <Input value={email} setValue={setEmail} type="text" placeholder="Введите email..."/>
        //     <Input value={password} setValue={setPassword} type="password" placeholder="Введите пароль..."/>
        //     <button className="authorization__btn" onClick={() => registration(email, password)}>Зарегистрироваться</button>
        // </div>

        <div>
        <div className=' flex justify-center mt-20'>
        <div className=' bg-blue-400 w-96 p-10 rounded-lg'>
        <div className="block text-lg font-bold text-white my-2">{t('Registeration')}</div>
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
                    onClick={() => registration(email, password)}
                >
                    {t('Registeration')}
                </button>
                {/* <input type="submit" value="Submit" className=' bg-green-300 p-3 rounded-lg my-5 hover:cursor-pointer' /> */}
            </div>
        </div>

        </div>
        </div>

    );
};

export default Registration;
