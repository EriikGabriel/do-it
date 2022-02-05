import { useContext } from "react";
import { ProjectContext } from "../../../contexts/ProjectContext";
import { Container } from "./styles";

export function TodoList() {
  const { projectId } = useContext(ProjectContext);

  return (
    <>
      <Container>
        <h1>Todo List {projectId}</h1>
      </Container>
    </>
  );
}
