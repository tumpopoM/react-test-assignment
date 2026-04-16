import { Row, Col } from "antd";
import "./ShapeGrid.css";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function ShapeGrid() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeTop, setActiveTop] = useState<number | null>(null);
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

  const topButtons = [
    {
      id: 0,
      label: t("moveShape"),
      onClick: moveShapeLeft,
      render: () => <div className="triangle-left" />,
    },
    {
      id: 1,
      label: t("movePosition"),
      onClick: movePosition,
      render: () => (
        <div style={{ display: "flex", gap: 8 }}>
          <div className="triangle-up" />
          <div className="triangle-down" />
        </div>
      ),
    },
    {
      id: 2,
      label: t("moveShape"),
      onClick: moveShapeRight,
      render: () => <div className="triangle-right" />,
    },
  ];

  const shuffle = () => {
    const newArr = [...shapes].sort(() => Math.random() - 0.5);
    setShapes(newArr);
  };

  const getCardStyle = (index: number) => ({
    ...bottomBoxStyle,
    background: activeIndex === index ? "#6eda78" : "#fff",
  });

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
    shuffle();

    setTimeout(() => {
      setActiveIndex(null);
    }, 300);
  };

  const handleCardHover = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number,
  ) => {
    if (activeIndex !== index) {
      e.currentTarget.style.background = "#ffa200";
    }
  };

  const handleCardLeave = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number,
  ) => {
    if (activeIndex !== index) {
      e.currentTarget.style.background = "#fff";
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>{t("layoutStyle")}</h2>

      {/* 🔷 ปุ่มด้านบน */}
      <Row gutter={16} style={{ marginBottom: 16 }}>
        {topButtons.map((btn) => (
          <Col span={8} key={btn.id}>
            <div
              style={{
                ...topBoxStyle,
                background: activeTop === btn.id ? "#6eda78" : "#fff",
              }}
              onClick={() => {
                setActiveTop(btn.id);
                btn.onClick();

                setTimeout(() => {
                  setActiveTop(null);
                }, 300);
              }}
              onMouseEnter={(e) => {
                if (activeTop !== btn.id) {
                  e.currentTarget.style.background = "#ffa200";
                }
              }}
              onMouseLeave={(e) => {
                if (activeTop !== btn.id) {
                  e.currentTarget.style.background = "#fff";
                }
              }}
            >
              {btn.render()}
              <span style={topTextStyle}>{btn.label}</span>
            </div>
          </Col>
        ))}
      </Row>

      {/* 🔶 grid ด้านล่าง */}
      <div style={gridStyle}>
        {shapes.map((shape, i) => (
          <div
            key={shape}
            style={getCardStyle(i)}
            onClick={() => handleCardClick(i)}
            onMouseEnter={(e) => handleCardHover(e, i)}
            onMouseLeave={(e) => handleCardLeave(e, i)}
          >
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
