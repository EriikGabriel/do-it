import { ProjectsDropdown } from "../ProjectsDropdown";
import { Container } from "./styles";

export function Menu() {
  return (
    <Container>
      <h1>Do it !</h1>

      <nav>
        <ProjectsDropdown />
      </nav>
    </Container>
  );
}
