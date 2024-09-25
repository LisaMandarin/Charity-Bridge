import dayjs from "dayjs"

export function Food() {
    const now = dayjs().format('MM-DD, YYYY')
    const myBday = dayjs('1981-06-08', 'YYYY-MM-DD')
    const newBDay = dayjs(myBday).format('MM-DD, YYYY')
    return (
        <>
            <p>{now}</p>
            <p>{newBDay}</p>
        </>
    )
}