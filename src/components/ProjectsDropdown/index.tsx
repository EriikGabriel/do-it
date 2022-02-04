import { ContainerButton } from "./styles";
import { FaCaretDown, FaCaretRight } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { DropdownList } from "../DropdownList";
import { FormEvent, useState } from "react";
import { database } from "../../services/firebase";
import Modal from "react-modal";

Modal.setAppElement("#root");

export function ProjectsDropdown() {
  const [active, setActive] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

  const [name, setName] = useState("");
  const [color, setColor] = useState("#000000");

  function handleToggleDropdown() {
    active ? setActive(false) : setActive(true);
  }

  async function handleCreateNewProject(e: FormEvent) {
    e.preventDefault();

    const projectsRef = database.ref("projects");

    await projectsRef.push({
      name,
      color,
    });

    setIsOpen(false);
  }

  return (
    <>
      <ContainerButton onClick={handleToggleDropdown}>
        <div>
          {active ? <FaCaretDown size={20} /> : <FaCaretRight size={20} />}
          Projetos
        </div>
        <button type="button" onClick={() => setIsOpen(true)}>
          <FaPlus size={15} />
        </button>
      </ContainerButton>
      {active && <DropdownList />}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        className="react-modal-content"
        overlayClassName="react-modal-overlay">
        <div className="title">Adicionar projeto</div>
        <form onSubmit={handleCreateNewProject}>
          <div>
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              name="name"
              autoComplete="off"
              spellCheck="false"
              onChange={(e) => {
                const button = document.getElementById("submitButton");
                if (e.target.value !== "") button?.removeAttribute("disabled");
                else button?.setAttribute("disabled", "");
                setName(e.target.value);
              }}
            />
          </div>

          <div>
            <label htmlFor="color">Cor</label>
            <input type="color" name="color" onChange={(e) => setColor(e.target.value)} />
          </div>

          <div className="buttons">
            <button type="button" onClick={() => setIsOpen(false)}>
              Cancelar
            </button>
            <button type="submit" id="submitButton" disabled>
              Adicionar
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
