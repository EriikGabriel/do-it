import { Container } from "./styles";
import { BsCalendarEvent, BsTags } from "react-icons/bs";
import { useContext } from "react";
import { ProjectContext } from "../../contexts/ProjectContext";

export function MenuButtons() {
  const { setNewProjectId } = useContext(ProjectContext);

  return (
    <Container>
      <button type="button" onClick={() => setNewProjectId("")}>
        <BsCalendarEvent size={15} fill={"#2b921b"} />
        Tarefas Diárias
      </button>
      <button type="button">
        <BsTags size={15} fill={"#f08800"} />
        Tags
      </button>
    </Container>
  );
}
