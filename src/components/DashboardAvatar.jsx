import { Avatar, Button, message, Upload, Progress, Image } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { UploadOutlined } from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";
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
            console.log('ready to delete avatar')
            if (user.current && user.current.prefs.avatarId) {
                await storage.deleteAvatar(user.current.prefs.avatarId)
                user.updatePrefs('avatarId', '')
                console.log('avatar deleted')
            }
            console.log('ready to create avatar')
            const result = await storage.createAvatar(options.file)
            console.log('avatar created')
            if (user.current) {
                user.updatePrefs('avatarId', result.$id)
                console.log('user prefs updated')
            }
            console.log('ready to setFileList')
            setFileList([
                {
                    uid: result.$id,
                    name: options.file.name,
                    status: "done",
                    url: await storage.getPreviewURL(result.$id)
                }
            ])
            console.log('setFileList done')
            options.onSuccess(null, options.file)
        } catch (err) {
            console.error('Failed to custom request', err.message)
            options.onError(err)
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
        console.log('fileList(onChange): ', newFileList)
        setFileList(newFileList)
    }

    const onRemove = async(file) => {
        console.log('file(onRemove): ', file)
        await storage.deleteAvatar(file.uid)
        if (user.current) {
            user.updatePrefs('avatarId', "")
        }
        setFileList([])
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

   
    // fetch initial avatar
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
    }, [user.current])

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


