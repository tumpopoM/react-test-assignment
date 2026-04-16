import { Table, Space, Button } from "antd";

type Props = {
  items: any[];
  onEdit: (record: any) => void;
  onDelete: (id: string) => void;
};

function ItemTable({ items, onEdit, onDelete }: Props) {
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      console.log(selectedRowKeys, selectedRows);
    },
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Action",
      render: (_: any, record: any) => (
        <Space>
          <Button type="primary" onClick={() => onEdit(record)}>
            Edit
          </Button>

          <Button danger onClick={() => onDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <h2 style={{ marginTop: 40 }}>Items List</h2>

      <Table
        rowSelection={rowSelection}
        dataSource={items}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </>
  );
}

export default ItemTable;
