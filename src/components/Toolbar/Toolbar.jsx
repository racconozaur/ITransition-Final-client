import React from 'react';

const Toolbar = (props) => {
    return (
        <div className=' container my-8 px-4 h-14 bg-white rounded-lg flex justify-between items-center flex-row text-gray-900'>
            
            <div className="flex items-center">
                <input id="tool-checkbox" type="checkbox" onChange={props.changeHandler} value="" className="w-5 h-5 text-blue-600 bg-gray-100 rounded-lg border-white focus:ring-blue-500 "/>
                <label htmlFor="tool-checkbox" className="ml-2">Check All</label>
            </div>
            <div className='flex'>
                
                <button onClick={props.blockAllHandler} className=' flex items-center bg-blue-500 text-white p-2 rounded-lg ml-4 hover:bg-red-400' >
                        {/* <AiOutlineDelete id='del-ico' className=' w-4 h-4 text-white'/> */}
                        Block
                </button>
            </div>
            
        </div>
    );
};

export default Toolbar;