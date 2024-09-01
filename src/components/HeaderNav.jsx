// import { Row, Col, Flex } from "antd";
import { Icon } from '@iconify/react';
import '../output.css'

export function HeaderNav() {
    return (
        <div className="flex flex-col w-full h-full justify-end">
            <div className="flex">
                <div className="flex-1">
                    <Icon icon='fluent:food-16-regular' className='inline'/> food
                </div>
                <div className="flex-1">
                    <Icon icon='hugeicons:clothes'  className='inline'/>
                    Clothing
                </div>
                <div className="flex-1">
                    <Icon icon="lucide:house-plus" className='inline'/>
                    Housing
                </div>
            </div>
            <div className="flex">
                <div className="flex-1">
                    <Icon icon="hugeicons:car-01" className='inline'/>
                    Transportation
                </div>
                <div className="flex-1">
                    <Icon icon="streamline:quality-education" className='inline'/> 
                    Education
                </div>
                <div className="flex-1">
                    <Icon icon="iconoir:gift" className='inline'/>
                    Entertainment
                </div>
            </div>
        </div>        
    )
}