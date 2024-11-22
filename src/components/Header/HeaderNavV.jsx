import { Icon } from '@iconify/react';
import { useState } from 'react';
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from 'react-router-dom';


export function HeaderNavV ({items}) {
    const [ show, setShow ] = useState(false)
    const toggleShow = () => setShow(current => !current)
    

    return (
        <>
        <div className='flex h-full justify-center items-center'>
            <FaBars 
                onClick={toggleShow}
                className='cursor-pointer w-8 h-8'
            />
        </div>
        <ul
            className='bg-pink-200 z-40 flex flex-col fixed top-24 left-0 w-60 overflow-hidden'
            style={{
                transform: show ? 'translateX(0)' : 'translateX(-100%)',
                transition: 'transform .5s ease-in-out',
                
            }}
        >
            {items.map(item => (
                <li key={item.key} className='w-full px-8 py-3'>
                        <Link to={item.path} onClick={toggleShow}>
                            <Icon icon={item.icon} className='inline'/>
                            <span> {item.text}</span>
                        </Link>
                </li>
            ))}
            <FaTimes
                onClick={toggleShow}
                className='w-8 h-8 cursor-pointer mx-auto'
            />
        </ul>
        
        
        
        </>
    )
}