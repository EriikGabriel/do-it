import { ContainerButton, CreateProjectModal } from "./styles";
import { FaCaretDown, FaCaretRight } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { DropdownList } from "../DropdownList";
import React, { FormEvent, useContext, useState } from "react";
import { database } from "../../services/firebase";
import Modal from "react-modal";
import { ThemeContext } from "styled-components";

Modal.setAppElement("#root");

export function ProjectsDropdown() {
  const { colors } = useContext(ThemeContext);

  const [active, setActive] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

  const [name, setName] = useState("");
  const [color, setColor] = useState("#000000");

  function handleToggleDropdown(e: React.MouseEvent) {
    const nodeName = (e.target as HTMLElement).nodeName.toLocaleUpperCase();

    if (nodeName === "BUTTON") return;
    else if (nodeName === "SVG") {
      const parentNodeName = (e.target as HTMLElement).parentNode?.nodeName.toLocaleUpperCase();
      if (parentNodeName === "BUTTON") return;
    } else if (nodeName === "PATH") {
      const parentNodeName = (e.target as HTMLElement).parentNode?.parentElement?.nodeName.toLocaleUpperCase();
      if (parentNodeName === "BUTTON") return;
    }

    active ? setActive(false) : setActive(true);
  }

  async function handleCreateNewProject(e: FormEvent) {
    e.preventDefault();

    const firebaseUserKey = localStorage.getItem("@doit:token");
    const projectsRef = database.ref(`users/${firebaseUserKey}/projects`);

    const projectUid = new Date().getTime().toString();

    await projectsRef.update({
      [projectUid]: {
        name,
        color,
      },
    });
    setIsOpen(false);
  }

  return (
    <>
      <ContainerButton onClick={(e) => handleToggleDropdown(e)}>
        <div>
          {active ? <FaCaretDown size={20} /> : <FaCaretRight size={20} />}
          Projetos
        </div>
        <button type="button" onClick={() => setIsOpen(true)}>
          <FaPlus size={15} fill={colors.text_body} />
        </button>
      </ContainerButton>
      {active && <DropdownList />}
      <CreateProjectModal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        className="react-modal-content"
        overlayClassName="react-modal-overlay">
        <div className="header">Adicionar projeto</div>
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

          <div className="footer">
            <button type="button" onClick={() => setIsOpen(false)}>
              Cancelar
            </button>
            <button type="submit" id="submitButton" disabled>
              Adicionar
            </button>
          </div>
        </form>
      </CreateProjectModal>
    </>
  );
}
