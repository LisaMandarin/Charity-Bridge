import { Button, Table, Input, Space, Modal } from "antd";
import { useUserInfos } from "../lib/context/userInfo";
import { useEffect, useState } from "react";
import { nativeYN, bDayFormat, fetchInfos, onSearch } from "./userListUtil";
import { UserModal } from "./UserModal";
const { Search } = Input

export function UserList() {
    const infos = useUserInfos()
    const [ dataSource, setDataSource ] = useState([])
    const [ originalData, setOriginalData ] = useState([])
    const [ isModalOpen, setIsModalOpen ] = useState(false)
    const [ modifiedUser, setModifiedUser ] = useState(null)
    
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
            <Space>
                <Button onClick={() => infos.remove(record.documentId)}>Delete</Button>
                <Button onClick={() => showModal(record)}>Modify</Button>
            </Space>
        )}
    ]

    const showModal = (record) => {
        setIsModalOpen(true)
        setModifiedUser(record)
    }

    useEffect(() => {
        if (infos.current) {
            const data = fetchInfos(infos)
            setDataSource(data)
            setOriginalData(data)
        }
    }, [infos])


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
            onChange={e => onSearch(e.target.value, originalData, setDataSource)}
        />
        <Table
            dataSource={dataSource}
            columns={columns}
            pagination={{
                position: ['bottomCenter'],
                pageSize: 5
            }}
        />
        <UserModal 
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            modifiedUser={modifiedUser}
        />
    </div>
    )
}