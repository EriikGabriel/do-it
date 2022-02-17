import { Container } from "./styles";
import { BsCalendarEvent, BsTags } from "react-icons/bs";
import { useContext } from "react";
import { ProjectContext } from "../../contexts/ProjectContext";
import { MenuContext } from "../../contexts/MenuContext";

export function MenuButtons() {
  const { setNewProjectId } = useContext(ProjectContext);
  const { setNewOptionsName } = useContext(MenuContext);

  return (
    <Container>
      <button
        type="button"
        onClick={() => {
          setNewOptionsName("today");
          setNewProjectId("");
        }}>
        <BsCalendarEvent size={15} fill={"#2b921b"} />
        Tarefas Diárias
      </button>
      <button
        type="button"
        onClick={() => {
          setNewOptionsName("tags");
          setNewProjectId("");
        }}>
        <BsTags size={15} fill={"#f08800"} />
        Tags
      </button>
    </Container>
  );
}
