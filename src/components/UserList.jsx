import { Button, Table, Input, Space } from "antd";
import { useUserInfos } from "../lib/context/userInfo";
import dayjs from 'dayjs';
import { useEffect, useState } from "react";
const { Search } = Input

export function UserList() {
    const infos = useUserInfos()
    const [ dataSource, setDataSource ] = useState([])
    const [ originalData, setOriginalData ] = useState([])
        
    

    const nativeYN = (boolean) => {
       return boolean ? 'True' : 'False'
    }
    const bDayFormat = (bDay) => {
        return dayjs(bDay).format('YYYY-MM-DD') 
    }

    const columns = [
        {title: 'Name', dataIndex: 'name', key: 'name'},
        {title: 'Birthday', dataIndex: 'birthday', key: 'birthday', render: (_, record) => (
            <span>{bDayFormat(record.birthday)}</span>
        )},
        {title: 'Age', dataIndex: 'age', key: 'age'},
        {title: 'Native', dataIndex: 'native', key: 'native', render: (_, record) => (
            <span>{nativeYN(record.native)}</span>
        )},
        {title: 'Address', dataIndex: 'address', key: 'address'},
        {title: 'Action', key: 'action', render: (_, record) => (
            <Button onClick={() => infos.remove(record.documentId)}>Delete</Button>
        )}
    ]

    useEffect(() => {
        if (infos.current) {
            const data = infos.current.map(user => ({
                key: user.$id,
                name: user.name,
                birthday: user.birthday,
                age: user.age,
                native: user.native,
                address: user.address,
                documentId: user.$id
            }))
            setDataSource(data)
            setOriginalData(data)
            console.log('dataSouce: ', dataSource)
        }
    }, [infos])

    const onSearch = (value) => {
        const filtedData = originalData.filter(user => 
            user.name.toLowerCase().includes(value.toLowerCase())
        )
        setDataSource(filtedData)
    }
    return ( 
    <div 
        className="flex flex-col gap-3 mx-auto"
        style={{
            width: '650px'
        }}
        >
        <Search 
            placeholder="Input search text"
            className="w-56 ml-auto"
            onSearch={onSearch}
            onChange={e => onSearch(e.target.value)}
        />
        <Table
        dataSource={dataSource}
        columns={columns}
        className="border border-gray-300"
    />
    </div>
    )
}