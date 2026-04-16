import { useState } from "react";
import { Card } from "antd";

const initialShapes = ["A", "B", "C", "D", "E", "F"];

function ShapeGrid() {
  const [shapes, setShapes] = useState(initialShapes);

  const shuffle = () => {
    const newArr = [...shapes].sort(() => Math.random() - 0.5);
    setShapes(newArr);
  };

  return (
    <div>
      <h2>Shape Grid</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 10,
        }}
      >
        {shapes.map((shape, index) => (
          <Card
            key={index}
            onClick={shuffle}
            style={{
              textAlign: "center",
              cursor: "pointer",
              background: index % 2 === 0 ? "#ffa200" : "#6eda78",
              transition: "0.3s",
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
