import dayjs from 'dayjs';

export function nativeYN (boolean) {
    return boolean ? 'True' : 'False'
 }

export function bDayFormat(bDay) {
     return dayjs(bDay).format('YYYY-MM-DD') 
 }

 export function fetchInfos(infos) {
    return infos.current.map(user => ({
        key: user.$id,
        name: user.name,
        birthday: user.birthday,
        age: user.age,
        native: user.native,
        address: user.address,
        documentId: user.$id
    }))
 }

export function onSearch(value, originalData, setDataSource) {
    const filteredData = originalData.filter(user => 
        user.name.toLowerCase().includes(value.toLowerCase()) ||
        user.address.toLowerCase().includes(value.toLowerCase())
    )
    setDataSource(filteredData)
}