import { useUser } from "../lib/context/user"
import { Button, Space, ConfigProvider} from "antd"
import { createStyles } from "antd-style"
import { DashboardName } from "./DashboardName"
import { DashboardPassword } from "./DashboardPassword"
import { DashboardAvatar } from "./DashboardAvatar"
import { DashboardEmail } from "./DashboardEmail"
import { DashboardPost } from "./DashboardPost"
import { DashboardProfile } from "./DashboardProfile"
import { useEffect, useRef, useState } from "react"

const useStyle = createStyles(({prefixCls, css}) => ({
    linearGradientButton: css`
&.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
  border-width: 0;

  > span {
    position: relative;
  }

  &::before {
    content: '';
    background: linear-gradient(135deg, #FBCFE8, #831843);
    position: absolute;
    inset: 0;
    opacity: 1;
    transition: all 0.3s;
    border-radius: inherit;
  }

  &:hover::before {
    opacity: 1;
    background: linear-gradient(135deg, #831843, #FBCFE8);
  }
}
`,
}))


export function Dashboard() {
    const user = useUser()
    const { styles } = useStyle()
    const [ div, setDiv ] = useState(null)
    const avatarRef = useRef(null)
    const nameRef = useRef(null)
    const passwordRef = useRef(null)
    const postRef = useRef(null)
    const profileRef = useRef(null)

    useEffect(() => {
        switch (div) {
            case "avatar":
                avatarRef.current?.scrollIntoView({ behavior: "smooth" })
                break;
            case "name":
                nameRef.current?.scrollIntoView({ behavior: "smooth" })
                break;
            case "password":
                passwordRef.current?.scrollIntoView({ behavior: "smooth"})
                break;
            case "post":
                postRef.current?.scrollIntoView({ behavior: "smooth"})
                break;
            case "profile":
                profileRef.current?.scrollIntoView({ behavior: "smooth"})
                break;
            default:
                break
        }
    }, [div])

    return (
        <>
            <Space direction="vertical" className="w-full p-4 bg-white">
                <DashboardEmail user={user} />
                <ConfigProvider button={{ className: styles.linearGradientButton,}}>
                    <Space wrap className="flex justify-center">
                        <Button 
                            type="primary" 
                            className="w-[150px] h-[150px] text-xl text-wrap"
                            onClick={() => setDiv("avatar")}
                        >
                            Change Avatar
                        </Button>
                        <Button 
                            type="primary" 
                            className="w-[150px] h-[150px] text-xl text-wrap"
                            onClick={() => setDiv("name")}
                        >
                            Change Name
                        </Button>
                        <Button 
                            type="primary" 
                            className="w-[150px] h-[150px] text-xl text-wrap"
                            onClick={() => setDiv("password")}
                        >
                            Change Password
                        </Button>
                        <Button 
                            type="primary" 
                            className="w-[150px] h-[150px] text-xl text-wrap"
                            onClick={() => setDiv("post")}
                        >
                            Manage Posts
                        </Button>
                        <Button 
                            type="primary" 
                            className="w-[150px] h-[150px] text-xl text-wrap"
                            onClick={() => setDiv("profile")}
                        >
                            Manage Profile
                        </Button>
                    </Space>
                </ConfigProvider>
            </Space>

            <div className="w-full p-8 md:pt-8 bg-white">
                <div ref={avatarRef}>{div === "avatar" && <DashboardAvatar user={user}/>}</div>
                <div ref={nameRef}>{div === "name" && <DashboardName user={user} />}</div>
                <div ref={passwordRef}>{div === "password" && <DashboardPassword user={user} />}</div>
                <div ref={profileRef}>{div === "profile" && <DashboardProfile user={user} />}</div>
                <div ref={postRef}>{div === "post" && <DashboardPost user={user}/>}</div>
            </div>
        </>
    )
}