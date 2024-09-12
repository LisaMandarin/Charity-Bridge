import { Avatar, Button, message, Upload } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { UploadOutlined } from "@ant-design/icons";
import { useStorage } from "../lib/context/storage";
import { useEffect, useState } from "react";

export function DashboardAvatar() {
    const [ avatarURL, setAvatarURL ] = useState('')
    const storage = useStorage()
    const customRequest = async(options) => {
        await storage.uploadAvatar(options.file)
    }

    useEffect(() => {
        if (storage.error) {
            message.error(storage.error)
        }
        if (storage.success) {
            message.success(storage.success)
        }
    }, [storage.success, storage.error])

    useEffect(() => {
        if (storage.current) {
            storage.getPreviewURL(storage.current.$id)
                .then((url) => {
                    setAvatarURL(url)
                })
        }
    }, [storage.current, setAvatarURL])


    useEffect(() => {
        console.log('avatarURL', avatarURL)
    }, [avatarURL])

    return (
        <div className="text-center">
            <div>
                <Avatar size={64} src={avatarURL} icon={<UserOutlined />} />
            </div>
            <div>
                <Upload
                    customRequest={customRequest}
                    name="avatar"
                    listType="picture"
                    maxCount={1}
                >
                    <Button icon={<UploadOutlined/>}>Upload File</Button>
                </Upload>
            </div>
        </div>
    )
}


