import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { Space } from 'antd';

export function HeaderNavH({items}) {
        
    return (
        <>
            <div className='grid grid-cols-3 h-full'>
                { items.map(item => (
                    <Space key={item.key}>
                        <Icon icon={item.icon}/>
                        <Link to={item.path}>{item.text}</Link>
                    </Space>
                ))}
            </div>
        </>
    )

    
}