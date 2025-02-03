import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Button } from "semantic-ui-react";

export default function TrainingDay() {
  const [trainingDays, setTrainingDays] = useState(items);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedItems = reorder(
      trainingDays,
      result.source.index,
      result.destination.index
    );

    setTrainingDays(reorderedItems);

    console.log(trainingDays);
  };

  return (
    <div className="traingDay">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {trainingDays.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <div>
                        <div style={{ color: "#4a90e2", fontSize: "14px" }}>
                          {item.content}
                        </div>
                        <div
                          style={{
                            fontSize: "18px",
                            fontWeight: "bold",
                            justifyContent: "space-between",
                          }}
                        >
                          {item.subcontent}
                        </div>
                      </div>
                      <Button>Editar</Button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const items = [
  { id: "1", content: "1 día de entrenamiento", subcontent: "pectoral+bíceps" },
  { id: "2", content: "2 día de entrenamiento", subcontent: "pierna" },
];

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: 16,
  display: "flex",
  justifyContent: "space-between",
  margin: "0 0 8px 0",
  minHeight: "50px",
  backgroundColor: isDragging ? "#f0f0f0" : "white",
  borderRadius: "8px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver && "lightblue",
  padding: 8,
});
