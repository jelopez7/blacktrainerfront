import { isEqual, map, pick, size } from "lodash";
import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { Button } from "semantic-ui-react";
import { toast } from "react-toastify";
import { updateTrainingDays } from "@/api/trainingDay";

export default function TrainingDay({ setRenderComponent, data: dataCourse }) {
  const { data } = useSelector((state) => state.trainingDay);

  const [trainingDays, setTrainingDays] = useState(data);

  const [loading, setLoading] = useState(false);

  const handleExercise = (exercise) => {
    setRenderComponent({ key: "exercise", data: { ...exercise, dataCourse } });
  };

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
  };

  if (size(data) <= 0) {
    return null;
  }

  const handleOrder = async () => {
    if (isEqual(data, trainingDays)) {
      toast.warning("No has hecho ningun cambio");
    } else {
      setLoading(true);
      const result = map(trainingDays, (item) =>
        pick(item, ["id", "position"])
      );

      await updateTrainingDays(result);

      setLoading(false);
    }
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
                <Draggable
                  key={item.id + ""}
                  draggableId={item.id + ""}
                  index={index}
                >
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
                          {item.position + 1 + " día de entrenamiento"}
                        </div>
                        <div
                          style={{
                            fontSize: "18px",
                            fontWeight: "bold",
                            justifyContent: "space-between",
                          }}
                        >
                          {item.title}
                        </div>
                      </div>
                      <Button onClick={() => handleExercise(item)}>
                        Editar
                      </Button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Button
        onClick={handleOrder}
        inverted
        color="black"
        className="buttonDay"
        loading={loading}
      >
        Guardar
      </Button>
    </div>
  );
}

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  // Actualizar las posiciones de manera iterativa
  const updatedItems = result.map((item, index) => ({
    ...item,
    position: index,
  }));

  return updatedItems;
};

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
