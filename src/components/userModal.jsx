import { Modal } from "antd"

export function UserModal({isModalOpen, setIsModalOpen}) {
    
    const onOK = () => {
        setIsModalOpen(false)
    }
    const onCancel = () => {
        setIsModalOpen(false)
    }

    return (
        <>
            <Modal
                title="Modify User"
                open={isModalOpen}
                onOk={onOK}
                onCancel={onCancel}
            >
                blah...blah...blah
            </Modal>
        </>
    )
}