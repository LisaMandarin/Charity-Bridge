import { Flex, Button, Avatar, Tooltip } from "antd";
import { useUser } from "../../lib/context/user";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

export function HeaderUser() {
  const user = useUser();

  return (
    <>
      {user?.current ? (
        <div className="w-fit flex flex-row justify-around p-1 h-full border-4 border-pink-200">
          <Avatar
            size={60}
            icon={<UserOutlined />}
            src={user?.current?.prefs?.avatarUrl}
            className="my-auto"
          />
          <Flex vertical align="flex-end" justify="flex-end">
            <p>
              <Link to="/dashboard">
                Hello, {user.current.name}
                {user?.current?.prefs?.profileId === undefined && (
                  <Tooltip
                    title="You haven't created your profile"
                    color="gold"
                  >
                    <Icon
                      icon="noto:warning"
                      width="1rem"
                      height="1rem"
                      className="inline"
                    />
                  </Tooltip>
                )}
              </Link>
            </p>
            <p>
              <Link to="#" onClick={() => user.logout()}>
                Logout
              </Link>
            </p>
          </Flex>
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
