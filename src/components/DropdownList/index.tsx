import { FaEllipsisH } from "react-icons/fa";
import { Container } from "./styles";

export function DropdownList() {
  return (
    <Container>
      <button type="button" data-id="2390">
        <div>
          <div className="project-color"></div>
          React Project
        </div>
        <button type="button">
          <FaEllipsisH size={15} />
        </button>
      </button>
      <button type="button" data-id="2390">
        <div>
          <div className="project-color"></div>
          React Project
        </div>
        <button type="button">
          <FaEllipsisH size={15} />
        </button>
      </button>
      <button type="button" data-id="2390">
        <div>
          <div className="project-color"></div>
          React Project
        </div>
        <button type="button">
          <FaEllipsisH size={15} />
        </button>
      </button>
    </Container>
  );
}
