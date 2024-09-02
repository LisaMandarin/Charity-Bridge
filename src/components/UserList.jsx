import { Button, Table } from "antd";
import { useUserInfos } from "../lib/context/userInfo";
import dayjs from 'dayjs';
import '../output.css'

export function UserList() {
    const infos = useUserInfos()
        
    const dataSource = infos.current.map(user => ({
        key: user.$id,
        name: user.name,
        birthday: user.birthday,
        age: user.age,
        native: user.native,
        address: user.address,
        documentId: user.$id
    }))

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

    return (
        <>
        <Table
            dataSource={dataSource}
            columns={columns}
            className="w-fit mx-auto"
        />
        </>
    )
}