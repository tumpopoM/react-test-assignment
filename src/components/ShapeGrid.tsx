import { Row, Col } from "antd";
import "./ShapeGrid.css";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function ShapeGrid() {
  const { t } = useTranslation();
  const initialShapes = [
    "square",
    "circle",
    "oval",
    "trapezoid",
    "parallelogram",
    "rectangle",
  ];

  const [shapes, setShapes] = useState(initialShapes);

  const moveShapeLeft = () => {
    const newArr = [...shapes];
    const first = newArr.shift();
    if (first) newArr.push(first);

    setShapes(newArr);
  };

  const moveShapeRight = () => {
    const newArr = [...shapes];
    const last = newArr.pop();
    if (last) newArr.unshift(last);

    setShapes(newArr);
  };

  const movePosition = () => {
    const top = shapes.slice(0, 3);
    const bottom = shapes.slice(3, 6);

    setShapes([...bottom, ...top]);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>{t("layoutStyle")}</h2>

      {/* 🔷 ปุ่มด้านบน */}
      <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col span={8}>
          <div style={topBoxStyle} onClick={moveShapeLeft}>
            <div className="triangle-left" />
            <span style={topTextStyle}>{t("moveShape")}</span>
          </div>
        </Col>

        <Col span={8}>
          <div style={topBoxStyle} onClick={movePosition}>
            <div style={{ display: "flex", gap: 8 }}>
              <div className="triangle-up" />
              <div className="triangle-down" />
            </div>
            <span style={topTextStyle}>{t("movePosition")}</span>
          </div>
        </Col>

        <Col span={8}>
          <div style={topBoxStyle} onClick={moveShapeRight}>
            <div className="triangle-right" />
            <span style={topTextStyle}>{t("moveShape")}</span>
          </div>
        </Col>
      </Row>

      {/* 🔶 grid ด้านล่าง */}
      <div style={gridStyle}>
        {shapes.map((shape, i) => (
          <div key={i} style={bottomBoxStyle}>
            <div className={shape} />
          </div>
        ))}
      </div>
    </div>
  );
}

const topBoxStyle = {
  height: 120,
  background: "#eee",
  borderRadius: 12,
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
};

const bottomBoxStyle = {
  height: 100,
  background: "#eee",
  borderRadius: 12,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 16,
};

const topTextStyle = {
  background: "#6eda78",
  padding: "2px 10px",
  borderRadius: 12,
  fontSize: 12,
};

export default ShapeGrid;
