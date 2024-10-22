import { message, Upload, Image } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useStorage } from "../lib/context/storage";
import { useEffect, useState } from "react";
import { useUser } from "../lib/context/user";

export function DashboardAvatar() {
    const user = useUser()
    const storage = useStorage()
    const [ fileList, setFileList ] = useState([])
    const [ previewOpen, setPreviewOpen ] = useState(false)
    const [ previewImage, setPreviewImage ] = useState('')

    const customRequest = async(options) => {
        try {
            const result = await storage.createAvatar(options.file)

            if (!result) {
                throw new Error('Failed to create avatar')
            }

            const updatedResult = await user.updatePrefs('avatarId', result.$id)

            if (!updatedResult) {
                throw new Error("Failed to update user preferences")
            }

            setFileList([
                {
                    uid: result.$id,
                    name: options.file.name,
                    status: "done",
                    url: await storage.getPreviewURL(result.$id),
                }
            ])
            
            options.onSuccess(null, options.file.name)

        } catch (error) {
            console.error('Failed to custom request', error.message)
            setFileList([])
            options.onError(error)
        }
    }

    const onPreview = async(file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj) 
        }
        setPreviewImage(file.url || file.preview)
        setPreviewOpen(true)
    }
    

    const onChange = ({fileList: newFileList}) => {
        setFileList(newFileList)
    }

    const onRemove = async(file) => {
        await storage.deleteAvatar(file.uid)
        if (user.current) {
            user.updatePrefs('avatarId', "")
        }
        setFileList([])
    }
        
    const beforeUpload = (file) => {
        const isOver3M = file.size / 1024 / 1024 > 3
        if (isOver3M) {
            message.error('Image must be smaller than 3MB')
            return Upload.LIST_IGNORE;
        }
        return true
    }

    const uploadButton = (
        <button
            className="border-0 bg-transparent shadow-none"
            type="button"
        >
            <UserOutlined />
            <div
                className="mt-2"
            >
                Upload
            </div>
        </button>
    )

    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });


    // get avatar src from storage and update user prefs.
    useEffect(() => {
        if (storage.fileId && user.current) {
            user.updatePrefs('avatarId', storage.fileId)
        }
    }, [storage.fileId])

    return (
        <div className="flex justify-center">
            <Upload
                customRequest={customRequest}
                listType="picture-circle"
                fileList={fileList}
                onPreview={onPreview}
                onChange={onChange}
                onRemove={onRemove}
                beforeUpload={beforeUpload}
                accept=".png,.jpeg,.webp"
            >
                {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            {previewImage && (
                <Image 
                    wrapperStyle={{
                        display: 'none'
                    }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible => setPreviewOpen(visible)),
                        afterOpenChange: visible => !visible && setPreviewImage('')
                    }}
                    src={previewImage}
                />
            )}
        </div>
    )
}


