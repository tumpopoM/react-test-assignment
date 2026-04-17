import { Table, Typography } from "antd";
import { useTranslation } from "react-i18next";

interface Props {
  data: any[];
  onEdit: (record: any) => void;
  onDelete: (id: string) => void;
  rowSelection: any;
}

function PersonTable({ data, onEdit, onDelete, rowSelection }: Props) {
  const { t } = useTranslation();
  const { Link } = Typography;

  const columns = [
    {
      title: t("name"),
      render: (_: any, record: any) => `${record.firstname} ${record.lastname}`,
      sorter: (a: any, b: any) => a.firstname.localeCompare(b.firstname),
    },
    {
      title: t("gender"),
      dataIndex: "gender",
      sorter: (a: any, b: any) => a.gender.localeCompare(b.gender),
    },
    {
      title: t("mobile"),
      dataIndex: "phone",
      render: (_: any, record: any) => {
        if (record.phoneCode === "+66") {
          return `${record.phoneCode}${record.phone.replace(/^0/, "")}`;
        }
        return `${record.phoneCode}${record.phone}`;
      },
      sorter: (a: any, b: any) => {
        const phoneA = `${a.phoneCode}${a.phone}`.replace(/\D/g, "");
        const phoneB = `${b.phoneCode}${b.phone}`.replace(/\D/g, "");

        return Number(phoneA) - Number(phoneB);
      },
    },
    {
      title: t("nationality"),
      dataIndex: "nationality",
      sorter: (a: any, b: any) => a.nationality.localeCompare(b.nationality),
      render: (_: any, record: any) => t(record.nationality),
    },
    {
      title: t("manage"),
      render: (_: any, record: any) => (
        <>
          <Link onClick={() => onEdit(record)} style={{ color: "#000" }}>
            {t("edit")}
          </Link>{" "}
          |{" "}
          <Link onClick={() => onDelete(record.id)} style={{ color: "#000" }}>
            {t("delete")}
          </Link>
        </>
      ),
    },
  ];

  return (
    <Table
      dataSource={data}
      columns={columns}
      rowKey="id"
      rowSelection={rowSelection}
      pagination={{ pageSize: 5 }}
    />
  );
}

export default PersonTable;
