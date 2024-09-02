import { Icon } from '@iconify/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from "react-icons/fa";


export function HeaderNavV () {
    const [ show, setShow ] = useState(false)
    const toggleShow = () => setShow(current => !current)
    const items = [
        {
            key: 1,
            icon: 'fluent:food-16-regular',
            text: 'Food',
            path: '/food',
        },
        {
            key: 2,
            icon: 'hugeicons:clothes',
            text: 'Clothing',
            path: '/clothing',
        },
        {
            key: 3,
            icon: 'lucide:house-plus',
            text: 'Housing',
            path: '/housing',
        },
        {
            key: 4,
            icon: 'hugeicons:car-01',
            text: 'Transportation',
            path: '/transportation',
        },
        {
            key: 5,
            icon: 'streamline:quality-education',
            text: 'Education',
            path: '/education',
        },
        {
            key: 6,
            icon: 'conoir:gift',
            text: 'Entertainment',
            path: '/entertainment',
        },
    ]

    return (
        <>
        <div className='flex h-full justify-center items-center'>
            <FaBars 
                onClick={toggleShow}
                className='cursor-pointer w-8 h-8'
            />
        </div>
        <ul
            className='bg-white flex flex-col fixed top-24 left-0 w-full overflow-hidden'
            style={{
                maxHeight: show ? '500px' : '0px',
                transition: 'max-height .5s ease-in-out',
                
            }}
        >
            {items.map(item => (
                <li key={item.key} className='w-full px-8 py-3'>
                        <Link to={item.path}>
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