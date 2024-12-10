import { Flex, Button, Avatar, Tooltip, Badge } from "antd";
import { useUser } from "../../lib/context/user";
import { UserOutlined, WarningFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Icon from "@ant-design/icons";
// import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";

export function HeaderUser() {
  const user = useUser();
  const [profileId, setProfileId] = useState(null);

  useEffect(() => {
    if (user?.current?.prefs?.profileId) {
      setProfileId(user.current.prefs.profileId);
    } else {
      setProfileId(null);
    }
  }, [user?.current?.prefs?.profileId]);

  return (
    <>
      {user?.current ? (
        <div className="w-fit flex flex-row justify-around items-end gap-4 p-1 h-24 border-4 border-pink-200">
          <Link to="/dashboard">
            <Badge
              count={
                profileId === null ? (
                  <div>
                    <Tooltip title="You haven't created a profile">
                      <WarningFilled style={{ fontSize: "1.5rem" }} />
                    </Tooltip>
                  </div>
                ) : null
              }
              offset={[0, 10]}
              className="flex items-end h-fit"
            >
              <Avatar
                size={60}
                icon={<UserOutlined />}
                src={user?.current?.prefs?.avatarUrl}
                className="my-0"
              />
            </Badge>
          </Link>
          <div className="flex flex-col gap-4 my-auto">
            <p>
              <Link to="/dashboard">Hello, {user.current.name}</Link>
            </p>
            <p>
              <Link to="#" onClick={() => user.logout()}>
                Logout
              </Link>
            </p>
          </div>
        </div>
      ) : (
        <Flex
          vertical
          align="center"
          justify="center"
          className="p-1 h-full border-solid border-4 border-pink-200"
          gap={16}
        >
          <Button type="link" href="/login">
            Login
          </Button>
          <Button type="link" href="/register">
            Sign up
          </Button>
        </Flex>
      )}
    </>
  );
}
