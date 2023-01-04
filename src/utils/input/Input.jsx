import React from 'react';


const Input = (props) => {
    return (
        <input onChange={(event)=> props.setValue(event.target.value)}
               value={props.value}
               className={props.className}
               type={props.type}
               placeholder={props.placeholder}/>
    );
};

export default Input;
