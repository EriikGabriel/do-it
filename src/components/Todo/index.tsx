import React, { Dispatch, useContext, useEffect, useState } from "react";
import { darken, lighten } from "polished";
import { RiDeleteBinLine, RiEditLine } from "react-icons/ri";
import { ThemeContext } from "styled-components";
import { Container, DeleteTodoModal } from "./styles";
import { database } from "../../services/firebase";
import { ProjectContext } from "../../contexts/ProjectContext";
import { BiInfoCircle, BiX } from "react-icons/bi";
import Modal from "react-modal";

type TodoProps = {
  todoId: string;
  priority: string;
  description: string;
  tagName: string;
  tagColor: string;
  dueDate: string;
  setEditId: Dispatch<React.SetStateAction<string>>;
  setTodoBoxType: Dispatch<React.SetStateAction<string>>;
};

export function Todo({
  todoId,
  priority,
  description,
  tagName,
  tagColor,
  dueDate,
  setEditId,
  setTodoBoxType,
}: TodoProps) {
  const { colors } = useContext(ThemeContext);
  const { projectId } = useContext(ProjectContext);

  const [priorityColor, setPriorityColor] = useState("#000000");
  const [tagVisibility, setTagVisibility] = useState<VisibilityState>("hidden");

  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  useEffect(() => {
    const priorityColorsOptions = [colors.red, colors.green, colors.blue, colors.shape_dark];
    setPriorityColor(priorityColorsOptions[Number(priority[1]) - 1]);

    tagName !== "Definir tag" && setTagVisibility("visible");
  }, [colors.red, colors.green, colors.blue, colors.shape_dark, priority, tagName]);

  function handleDeleteTodo() {
    const firebaseUserKey = localStorage.getItem("@doit:token");
    const todoRef = database.ref(`users/${firebaseUserKey}/projects/${projectId}/todos/${todoId}`);

    todoRef.remove((error) => {
      if (error) throw new Error("Could not delete todo");
    });
  }

  return (
    <>
      <Container>
        <div>
          <div>
            <button type="button" className="todo-priority-button">
              <div
                style={{
                  backgroundColor: lighten(0.15, priorityColor),
                  border: `1px solid ${darken(0.2, priorityColor)}`,
                }}></div>
            </button>
            <p>{description}</p>
          </div>
          <button
            type="button"
            style={{
              background: `rgba(${/\(([^)]+)\)/.exec(tagColor)?.[1]}, 0.2)`,
              color: tagColor,
              border: `1px solid ${tagColor}`,
              visibility: `${tagVisibility}`,
            }}>
            {tagName}
          </button>
          <p>
            {new Intl.DateTimeFormat("pt-br", {
              weekday: "short",
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
            }).format(new Date(dueDate))}
          </p>
          <div className="actions">
            <button
              type="button"
              onClick={() => {
                setEditId(todoId);
                setTodoBoxType("edit");
              }}>
              <RiEditLine size={20} />
            </button>
            <button type="button" onClick={() => setDeleteModalIsOpen(true)}>
              <RiDeleteBinLine size={20} />
            </button>
          </div>
        </div>
      </Container>
      <DeleteTodoModal
        isOpen={deleteModalIsOpen}
        onRequestClose={() => setDeleteModalIsOpen(false)}
        className="react-modal-content"
        overlayClassName="react-modal-overlay">
        <div className="header">
          <BiInfoCircle size={20} />
          <BiX size={20} className="close-modal" onClick={() => setDeleteModalIsOpen(false)} />
        </div>
        <div>
          <p>
            Tem certeza que deseja excluir a tarefa
            <br></br>
            <strong>{description}</strong>?
          </p>
          <small>Essa ação não poderá ser revertida!</small>
        </div>
        <div className="footer">
          <button type="button" onClick={() => setDeleteModalIsOpen(false)}>
            Cancelar
          </button>
          <button type="button" onClick={() => handleDeleteTodo()}>
            Excluir
          </button>
        </div>
      </DeleteTodoModal>
    </>
  );
}
