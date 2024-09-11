import { Avatar, Button, message, Upload } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { UploadOutlined } from "@ant-design/icons";
import { useStorage } from "../lib/context/storage";
import { useEffect } from "react";

export function DashboardAvatar() {
    const storage = useStorage()
    const customRequest = async(options) => {
        try {
            await storage.uploadAvatar(options.file)
            options.onSuccess('Done')
        } catch (err) {
            options.onError('Failed')
        }
        console.log('options: ', options)
    }

    useEffect(() => {
        if (storage.error) {
            message.error(storage.error)
        }
        if (storage.success) {
            message.success(storage.success)
        }
    }, [storage.success, storage.error])

    return (
        <div className="text-center">
            <div>
                <Avatar size={64} icon={<UserOutlined />} />
            </div>
            <div>
                <Upload
                    customRequest={customRequest}
                    name="avatar"
                    listType="picture"
                >
                    <Button icon={<UploadOutlined/>}>Upload File</Button>
                </Upload>
            </div>
        </div>
    )
}