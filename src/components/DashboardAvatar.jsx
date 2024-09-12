import { Avatar, Button, message, Upload } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { UploadOutlined } from "@ant-design/icons";
import { useStorage } from "../lib/context/storage";
import { useEffect, useState } from "react";
import { useUser } from "../lib/context/user";

export function DashboardAvatar() {
    const user = useUser()
    const [ avatarURL, setAvatarURL ] = useState('')
    const storage = useStorage()
    const customRequest = async(options) => {
        if (user.current && user.current.prefs.avatarId) {
            await storage.deleteAvatar(user.current.prefs.avatarId)
            await storage.createAvatar(options.file)
        }
        if (user.current && !user.current.prefs.avatarId) {
            await storage.createAvatar(options.file)
        }
    }

    useEffect(() => {
        if (user.current && user.current.prefs.avatarId) {
            const avatarId = user.current.prefs.avatarId
            storage.getPreviewURL(avatarId)
                .then((url) => {
                    setAvatarURL(url)
                })
        } else {
            console.error('no avatar file ID')
            setAvatarURL('')
        }
    },[])

    useEffect(() => {
        if (storage.error) {
            message.error(storage.error)
        }
        if (storage.success) {
            message.success(storage.success)
        }
    }, [storage.success, storage.error])

    useEffect(() => {
        if (storage.fileId) {
            storage.getPreviewURL(storage.fileId)
            .then((url) => {
                setAvatarURL(url)
            })
            .then(() => {
                if (user.current) {
                    user.updatePrefs('avatarId', storage.fileId)
                }
            })
        }
    }, [storage.fileId])

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
                    <Button icon={<UploadOutlined/>}>
                    { user.current.prefs.avatarId ? `Update avatar` : `Create avatar`}
                    </Button>
                </Upload>
            </div>
        </div>
    )
}


