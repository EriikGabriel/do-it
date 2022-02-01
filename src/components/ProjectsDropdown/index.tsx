import { ContainerButton } from "./styles";
import { FaCaretDown, FaCaretRight } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { DropdownList } from "../DropdownList";
import { useState } from "react";

export function ProjectsDropdown() {
  const [active, setActive] = useState(false);

  function handleToggleDropdown() {
    if (active) {
      setActive(false);
    } else {
      setActive(true);
    }
  }

  return (
    <>
      <ContainerButton type="button" onClick={handleToggleDropdown}>
        <div>
          {active ? <FaCaretDown size={20} /> : <FaCaretRight size={20} />}
          Projetos
        </div>
        <button type="button">
          <FaPlus size={15} />
        </button>
      </ContainerButton>
      {active && <DropdownList />}
    </>
  );
}
