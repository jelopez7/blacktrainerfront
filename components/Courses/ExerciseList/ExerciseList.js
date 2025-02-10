import { updateExercises } from "@/api/exercise";
import { isEqual, map, pick, size } from "lodash";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { Button, Image } from "semantic-ui-react";

export default function ExerciseList({ setExerciseSelected }) {
  const { data } = useSelector((state) => state.exercise);

  const [exercises, setExercises] = useState(data);

  const [loading, setLoading] = useState(false);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedItems = reorder(
      exercises,
      result.source.index,
      result.destination.index
    );

    setExercises(reorderedItems);
  };

  if (size(exercises) <= 0) {
    return null;
  }

  const handleOrder = async () => {
    if (isEqual(data, exercises)) {
      toast.warning("No has hecho ningun cambio");
    } else {
      setLoading(true);
      const result = map(exercises, (item) => pick(item, ["id", "position"]));

      await updateExercises(result);

      setLoading(false);
    }
  };

  return (
    <div className="exerciseList">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {exercises.map((item, index) => (
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
                      <div className="contentItem">
                        <Image
                          alt="Blackfitness"
                          src={item.post_exercise_id.photo}
                        />
                        <div
                          className="title"
                          style={{ color: "black", fontSize: "14px" }}
                        >
                          {item.post_exercise_id.title}
                        </div>
                      </div>
                      <Button
                        onClick={() => {
                          setExerciseSelected(item);
                        }}
                      >
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
