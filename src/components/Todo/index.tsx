import React, { Dispatch, useContext, useEffect, useState } from "react";
import { darken, lighten, opacify, transparentize } from "polished";
import { RiDeleteBinLine, RiEditLine } from "react-icons/ri";
import { ThemeContext } from "styled-components";
import { Container, DeleteTodoModal } from "./styles";
import { database } from "../../services/firebase";
import { ProjectContext } from "../../contexts/ProjectContext";
import { BiInfoCircle, BiX } from "react-icons/bi";
import { AiOutlineCheck } from "react-icons/ai";
import { format, getYear } from "date-fns";
import { ptBR } from "date-fns/locale";
import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict/index";

type TodoProps = {
  todoId: string;
  todoProjectId?: string;
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
  todoProjectId,
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
  const [formattedDate, setFormattedDate] = useState("");

  const [checkIsHover, setCheckIsHover] = useState(false);

  useEffect(() => {
    const date = new Date(dueDate);
    const [value, unity] = formatDistanceToNowStrict(date, { locale: ptBR }).split(" ");

    switch (unity) {
      case "segundo":
      case "segundos":
      case "minuto":
      case "minutos":
      case "hora":
      case "horas":
        setFormattedDate("Hoje");
        break;
      case "dia":
        setFormattedDate("Amanhã");
        break;
      case "dias":
        if (Number(value) > 7) setFormattedDate(format(date, "MMM d 'às' H:mm", { locale: ptBR }));
        else setFormattedDate(format(date, "EEE", { locale: ptBR }));
        break;
      case "ano":
      case "anos":
        setFormattedDate(format(date, "MMM d yyyy 'às' H:mm", { locale: ptBR }));
        break;
      default:
        if (getYear(date) !== getYear(new Date())) {
          setFormattedDate(format(date, "MMM d yyyy 'às' H:mm", { locale: ptBR }));
        } else setFormattedDate(format(date, "MMM d 'às' H:mm", { locale: ptBR }));
        break;
    }

    return () => setFormattedDate("");
  }, [dueDate]);

  useEffect(() => {
    const priorityColorsOptions = [colors.red, colors.green, colors.blue, colors.shape_dark];
    setPriorityColor(priorityColorsOptions[Number(priority[1]) - 1]);

    tagName !== "Definir tag" && setTagVisibility("visible");

    return () => setPriorityColor("#000000");
  }, [colors.red, colors.green, colors.blue, colors.shape_dark, priority, tagName]);

  function handleDeleteTodo() {
    const firebaseUserKey = localStorage.getItem("@doit:token");
    const todoRef = database.ref(
      `users/${firebaseUserKey}/projects/${!projectId ? todoProjectId : projectId}/todos/${todoId}`
    );

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
                  backgroundColor: transparentize(0.7, priorityColor),
                  border: `2px solid ${darken(0.1, priorityColor)}`,
                }}
                onMouseEnter={() => setCheckIsHover(true)}
                onMouseLeave={() => setCheckIsHover(false)}
                onClick={handleDeleteTodo}>
                {checkIsHover && <AiOutlineCheck size={12} fill={darken(0.2, priorityColor)} />}
              </div>
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
          <p>{formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)}</p>
          <div className="actions">
            <button
              type="button"
              onClick={() => {
                if (setEditId) setEditId(todoId);
                if (setTodoBoxType) setTodoBoxType("edit");
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
