import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { Space } from 'antd';

export function HeaderNav() {
        
    return (
        <div className="flex flex-col w-full h-full justify-end">
            <div className="flex">
                <div className="flex-1">
                    <Space>
                        <Icon icon='fluent:food-16-regular' className='inline'/>
                        <Link to='/food'>food</Link>
                    </Space>
                </div>
                <div className="flex-1">
                    <Space>
                        <Icon icon='hugeicons:clothes'  className='inline'/>
                        <Link to='/clothing'>Clothing</Link>
                    </Space>
                </div>
                <div className="flex-1">
                    <Space>
                        <Icon icon="lucide:house-plus" className='inline'/>
                        <Link to='/housing'>Housing</Link>
                    </Space>
                </div>
            </div>
            <div className='flex'>
                <div className="flex-1">
                    <Space>
                        <Icon icon="hugeicons:car-01" className='inline'/>
                        <Link to='/transportation'>Transportation</Link>
                    </Space>
                </div>
                <div className="flex-1">
                    <Space>
                        <Icon icon="streamline:quality-education" className='inline'/> 
                        <Link to='/education'>Education</Link>
                    </Space>
                </div>
                <div className="flex-1">
                    <Space>
                        <Icon icon="iconoir:gift" className='inline'/>
                        <Link to='/entertainment'>Entertainment</Link>
                    </Space>
                </div>
            </div>
        </div>
    )

    
}