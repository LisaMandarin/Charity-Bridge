import { Avatar, Button, Space, Spin, Upload } from "antd"
import { UserOutlined, UploadOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import { useStorage } from "../lib/context/storage"

export function DashboardAvatar({user}) {
    const [ avatarURL, setAvatarURL ] = useState('')
    const storage = useStorage()
    const [ fileList, setFileList ] = useState([])

    const customRequest = async(options) => {
        try {
            const avatarId = user?.current?.prefs?.avatarId
            if (avatarId) {
                const deleteResult = await storage.deleteAvatar(avatarId)
                if (!deleteResult) {
                    throw new Error("Failed to delete current avatar")
                }
            }

            const result = await storage.createAvatar(options.file)
            if (!result) {
                throw new Error("Failed to create avatar")
            }

            const updatePrefs = await user.updatePrefs('avatarId', result.$id)
            console.log("update prefs: ", updatePrefs)
            if (!updatePrefs) {
                throw new Error("Failed to update user preferences")
            }

            setFileList([
                {
                    uid: result.$id,
                    name: options.file.name,
                    url: await storage.getPreviewURL(result.$id),
                }
            ])
        } catch (error) {
            console.error("Failed to upload avatar: ", error.message)
        }
    }
    
    useEffect(() => {
        const avatarId = user?.current?.prefs?.avatarId
        if (avatarId) {
            storage.getPreviewURL(avatarId)
                .then(url => setAvatarURL(url))
        }
    }, [user?.current?.prefs?.avatarId])
    
    return (
        <div className="flex justify-center">
            <Spin spinning={storage.loading}>
                <Space direction="vertical" className="text-center">
                    <Avatar 
                        size={64} 
                        icon={<UserOutlined />} 
                        alt={`${user.current.name || "User"}'s avatar`}
                        src={avatarURL}
                    />
                    <Upload
                        customRequest={customRequest}
                        fileList={fileList}
                        showUploadList={false}
                    >
                        <Button icon={<UploadOutlined />}>upload avatar</Button>
                    </Upload>
                </Space>
            </Spin>
        </div>
    )
}


