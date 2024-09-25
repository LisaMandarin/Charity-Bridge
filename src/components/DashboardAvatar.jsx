import { Avatar, Button, message, Upload, Progress, Image } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { UploadOutlined } from "@ant-design/icons";
import { useStorage } from "../lib/context/storage";
import { useEffect, useState } from "react";
import { useUser } from "../lib/context/user";

export function DashboardAvatar() {
    const user = useUser()
    const storage = useStorage()
    // const [ avatarURL, setAvatarURL ] = useState('')
    const [ fileList, setFileList ] = useState([])
    const [ previewOpen, setPreviewOpen ] = useState(false)
    const [ previewImage, setPreviewImage ] = useState('')

    const customRequest = async(options) => {
        try {
            if (user.current && user.current.prefs.avatarId) {
                await storage.deleteAvatar(user.current.prefs.avatarId)
                await storage.createAvatar(options.file)
            }
            if (user.current && !user.current.prefs.avatarId) {
                await storage.createAvatar(options.file)
            }
            options.onSuccess(null, options.file)
        } catch (err) {
            console.error('Failed to upload image', err.message)
            options.onError(err)
        }
    }

    const onPreview = async(file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj) 
        }
        console.log('file(onPreview: ', file)
        setPreviewImage(file.url || file.preview)
        setPreviewOpen(true)
    }
    

    const onChange = ({fileList: newFileList}) => {
        setFileList(newFileList)
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

    

    // update messages
    useEffect(() => {
        if (storage.error) {
            message.error(storage.error)
        }
        if (storage.success) {
            message.success(storage.success)
        }
    }, [storage.success, storage.error])

   

    useEffect(() => {
        if (user.current && user.current.prefs.avatarId) {
            const avatarId = user.current.prefs.avatarId
            storage.getPreviewURL(avatarId).then((url) => {
                setFileList([
                    {
                        uid: avatarId,
                        name: "image.png",
                        status: "done",
                        url
                    }
                ])
            })
        } else {
            console.error("no avatar file ID")
        }
    }, [])

    // get avatar src from storage and update user prefs.
    useEffect(() => {
        if (storage.fileId) {
            storage.getPreviewURL(storage.fileId)
            .then(() => {
                if (user.current) {
                    user.updatePrefs('avatarId', storage.fileId)
                }
            })
        }
    }, [storage.fileId])

    useEffect(() => console.log('FileList: ', fileList))
    return (
        <div className="text-center">
            <div className="flex justify-center">
                <Upload
                    customRequest={customRequest}
                    listType="picture-circle"
                    fileList={fileList}
                    onPreview={onPreview}
                    onChange={onChange}
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
        </div>
    )
}


