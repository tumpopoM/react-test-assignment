import { useState } from "react";
import { Card, Button, Row, Col } from "antd";

const initialShapes = ["A", "B", "C", "D", "E", "F"];

function ShapeGrid() {
  const [shapes, setShapes] = useState(initialShapes);
  const [rotating, setRotating] = useState(false);

  const moveShape = () => {
    const newArr = [...shapes];
    const first = newArr.shift();
    if (first) newArr.push(first);

    setRotating(true);
    setTimeout(() => setRotating(false), 300);

    setShapes(newArr);
  };

  const movePosition = () => {
    setShapes([...shapes].reverse());
  };

  const shuffle = () => {
    const newArr = [...shapes].sort(() => Math.random() - 0.5);
    setShapes(newArr);
  };

  return (
    <div style={{ marginBottom: 40 }}>
      <h2>Shape Controls</h2>

      <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col>
          <Button onClick={moveShape}>Move Shape</Button>
        </Col>

        <Col>
          <Button onClick={movePosition}>Move Position</Button>
        </Col>
      </Row>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 10,
        }}
      >
        {shapes.map((shape, index) => (
          <Card
            key={shape}
            onClick={shuffle}
            style={{
              textAlign: "center",
              cursor: "pointer",
              background: index % 2 === 0 ? "#ffa200" : "#6eda78",
              transform: rotating
                ? "rotate(-180deg) scale(1.05)"
                : "rotate(0deg) scale(1)",
              transition: "transform 0.3s",
              borderRadius: 12,
              fontWeight: "bold",
              willChange: "transform",
            }}
          >
            {shape}
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ShapeGrid;
