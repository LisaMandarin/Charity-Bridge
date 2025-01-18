import { DownOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Dropdown, message, Select, Space, Table, Modal } from "antd";
import { Link } from "react-router-dom";
const { confirm } = Modal;

export function DashboardPostListOpen({
  productInfo,
  setEditedPost,
  productStorage,
  setPosts,
  dataSourceOpen,
}) {
  const handleStatus = async (value, record) => {
    try {
      const result = await productInfo.updateDocument(record.$id, {
        closed: value,
      });
      if (!result) {
        throw new Error("Unable to change the status of the product");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const showDeleteConfirm = (record) => {
    confirm({
      title: "Are you sure you want to delete the post?",
      icon: <ExclamationCircleFilled />,
      content:
        "You are not going to undo this action.  Click 'Yes' to archive or 'No' to keep the post.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => handleStatus(true, record),
      onCancel: () => console.log("Delete action canceled"),
    });
  };

  const editPost = (record) => {
    if (!record) {
      console.error("Record is missing.");
      return;
    }

    setEditedPost(record);
  };

  const deletePost = async (record) => {
    try {
      if (!record) {
        console.error("Record is missing.");
      }

      const documentResult = await productInfo.deleteForm(record.key);
      if (!documentResult) {
        console.error("Failed to delete document");
        return;
      }
      const fileResult = await Promise.all(
        record.photos.map(
          async (photo) => await productStorage.deleteFile(photo),
        ),
      );

      const allFilesDeleted = fileResult.every((result) => result === true);
      if (!allFilesDeleted) {
        console.error("Failed to delete some photos");
        message.error("Failed to delete some photos");
        return;
      }

      message.success("The post is deleted");
      setPosts((current) => current.filter((post) => post.$id !== record.key));
    } catch (error) {
      console.error(
        "An error occurred while deleting the post: ",
        error.message,
      );
      message.error("An error occurred while deleting the post");
    }
  };

  const viewPost = (record) => {
    if (!record || !record.$id) {
      console.error("Invalid record: ID missing");
      return;
    }

    const url = `/product/${record.$id}`;
    window.open(url, "_blank");
  };

  const columns = [
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      render: (_, record) => (
        <div className="flex flex-row w-[100px]">
          <Link to={`/product/${record.key}`}>
            <div>
              <img
                src={record.photoURL[0]}
                alt={record.product}
                className="w-12 h-auto"
              />
            </div>
            <div className="flex flex-col items-start">
              <div>{record.product}</div>
              <div className="text-gray-400 text-xs">{record.time}</div>
            </div>
          </Link>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "closed",
      key: "closed",
      render: (_, record) => (
        <div>
          <Select
            className="w-20"
            defaultValue={record.closed}
            onChange={(e) => {
              if (e === true) {
                // Show warning modal when closing the post.
                showDeleteConfirm(record);
              } else {
                handleStatus(e, record);
              }
            }}
            options={[
              { value: true, label: "closed" },
              { value: false, label: "open" },
            ]}
          />
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        const items = [
          {
            key: "1",
            label: "Edit",
            onClick: () => editPost(record),
          },
          {
            key: "2",
            label: "Delete",
            onClick: () => deletePost(record),
          },
          {
            key: "3",
            label: "View",
            onClick: () => viewPost(record),
          },
        ];
        return (
          <Dropdown menu={{ items }}>
            <Button>
              <Space>
                Manage post
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        );
      },
    },
    {
      title: "Applicants",
      dataIndex: "applicants",
      key: "applicants",
    },
  ];
  return (
    <>
      <Table dataSource={dataSourceOpen} columns={columns} />
    </>
  );
}
