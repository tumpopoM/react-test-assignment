import { Table, Space, Button } from "antd";
import { useTranslation } from "react-i18next";

type Props = {
  items: any[];
  onEdit: (record: any) => void;
  onDelete: (id: string) => void;
};

function ItemTable({ items, onEdit, onDelete }: Props) {
  const { t } = useTranslation();
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      console.log(selectedRowKeys, selectedRows);
    },
  };

  const columns = [
    {
      title: t("name"),
      dataIndex: "name",
    },
    {
      title: t("age"),
      dataIndex: "age",
    },
    {
      title: t("action"),
      render: (_: any, record: any) => (
        <Space>
          <Button type="primary" onClick={() => onEdit(record)}>
            {t("edit")}
          </Button>

          <Button danger onClick={() => onDelete(record.id)}>
            {t("delete")}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <h2 style={{ marginTop: 40 }}>{t("itemList")}</h2>

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
