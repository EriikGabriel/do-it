import { MenuButtons } from "../MenuButtons";
import { ProjectsDropdown } from "../ProjectsDropdown";
import { Container } from "./styles";

export function Menu() {
  return (
    <Container>
      <h1>Do it !</h1>

      <nav>
        <MenuButtons />
        <ProjectsDropdown />
      </nav>
    </Container>
  );
}
