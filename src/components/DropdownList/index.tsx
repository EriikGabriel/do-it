import React, { FormEvent, useContext, useEffect, useState } from "react";
import { FaEllipsisH } from "react-icons/fa";
import { RiDeleteBinLine, RiEditLine } from "react-icons/ri";
import { ThemeContext } from "styled-components";
import { ProjectContext } from "../../contexts/ProjectContext";
import { database } from "../../services/firebase";
import { Container, DeleteProjectModal } from "./styles";
import { CreateProjectModal } from "../ProjectsDropdown/styles";
import ReactTooltip from "react-tooltip";
import { BiInfoCircle, BiX } from "react-icons/bi";

type FirebaseProjects = Record<
  string,
  {
    name: string;
    color: string;
  }
>;

type ProjectsType = {
  id: string;
  name: string;
  color: string;
};

export function DropdownList() {
  const { setNewProjectId } = useContext(ProjectContext);
  const { colors } = useContext(ThemeContext);

  const [projects, setProjects] = useState<ProjectsType[]>([]);
  const [projectId, setProjectId] = useState("");
  const [editProjectModalIsOpen, setEditProjectModalIsOpen] = useState(false);
  const [deleteProjectModalIsOpen, setDeleteProjectModalIsOpen] = useState(false);

  const [name, setName] = useState("");
  const [color, setColor] = useState("#000000");

  useEffect(() => {
    const firebaseUserKey = localStorage.getItem("@doit:token");
    const projectsRef = database.ref(`users/${firebaseUserKey}/projects`);

    projectsRef.on("value", (project) => {
      const databaseProject = project.val() as FirebaseProjects;
      const firebaseProjects = databaseProject ?? {};

      const parsedProjects = Object.entries(firebaseProjects).map(([key, value]) => {
        return {
          id: key,
          name: value.name,
          color: value.color,
        };
      });

      setProjects(parsedProjects);
    });

    return () => {
      setProjects([]);
    };
  }, []);

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  function handleOpenTodoList(e: React.MouseEvent<HTMLButtonElement>) {
    const nodeName = (e.target as HTMLElement).nodeName;
    const listId = (e.currentTarget as HTMLButtonElement).dataset.id ?? "";

    if (nodeName === "DIV" || nodeName === "BUTTON") {
      setNewProjectId(listId);
    }
  }

  function handleOpenEditProjectModal() {
    ReactTooltip.hide();

    const firebaseUserKey = localStorage.getItem("@doit:token");
    const projectRef = database.ref(`users/${firebaseUserKey}/projects/${projectId}`);

    projectRef.once("value", (project) => {
      const databaseProject = project.val() as ProjectsType;
      const firebaseProjects = databaseProject ?? {};

      setName(firebaseProjects.name);
      setColor(firebaseProjects.color);
    });

    setEditProjectModalIsOpen(true);
  }

  function handleUpdateProject(e: FormEvent) {
    e.preventDefault();

    const firebaseUserKey = localStorage.getItem("@doit:token");
    const projectRef = database.ref(`users/${firebaseUserKey}/projects/${projectId}`);

    projectRef.update({
      name,
      color,
    });

    setEditProjectModalIsOpen(false);
  }

  function handleOpenDeleteProjectModal() {
    const firebaseUserKey = localStorage.getItem("@doit:token");
    const projectRef = database.ref(`users/${firebaseUserKey}/projects/${projectId}`);

    projectRef.once("value", (project) => {
      const databaseProject = project.val() as ProjectsType;
      const firebaseProjects = databaseProject ?? {};

      setName(firebaseProjects.name);
      setColor(firebaseProjects.color);
    });

    setDeleteProjectModalIsOpen(true);
    ReactTooltip.hide();
  }

  function handleDeleteProject() {
    const firebaseUserKey = localStorage.getItem("@doit:token");
    const projectRef = database.ref(`users/${firebaseUserKey}/projects/${projectId}`);

    projectRef.remove((error) => {
      if (error) throw new Error("Could not delete project");
    });

    setDeleteProjectModalIsOpen(false);
  }

  return (
    <Container>
      {projects.map(({ id, name, color }) => (
        <button type="button" data-id={id} key={id} onClick={handleOpenTodoList}>
          <div>
            <div className="project-color" style={{ backgroundColor: color }}></div>
            {name}
          </div>
          <div data-tip={id} data-for="more-options" data-event="click">
            <FaEllipsisH size={15} />
          </div>
        </button>
      ))}

      <ReactTooltip
        id="more-options"
        place="bottom"
        effect="solid"
        clickable={true}
        globalEventOff="click"
        className="tooltip more-options-tooltip"
        afterShow={(e: PointerEvent) => {
          const id = (e.currentTarget as HTMLButtonElement).dataset.tip ?? "";
          setProjectId(id);
        }}
        backgroundColor={colors.themeColor}>
        <div onClick={(e) => e.stopPropagation()} className="tooltip-wrapper">
          <button type="button" onClick={handleOpenEditProjectModal}>
            <RiEditLine size={20} />
            <p>Editar projeto</p>
          </button>
          <button type="button" onClick={handleOpenDeleteProjectModal}>
            <RiDeleteBinLine size={20} />
            <p>Deletar projeto</p>
          </button>
        </div>
      </ReactTooltip>

      <CreateProjectModal
        isOpen={editProjectModalIsOpen}
        onRequestClose={() => setEditProjectModalIsOpen(false)}
        className="react-modal-content"
        overlayClassName="react-modal-overlay">
        <div className="header">Editar projeto</div>
        <form onSubmit={handleUpdateProject}>
          <div>
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              name="name"
              autoComplete="off"
              spellCheck="false"
              value={name}
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
            <input type="color" name="color" value={color} onChange={(e) => setColor(e.target.value)} />
          </div>

          <div className="footer">
            <button type="button" onClick={() => setEditProjectModalIsOpen(false)}>
              Cancelar
            </button>
            <button type="submit" id="submitButton">
              Salvar
            </button>
          </div>
        </form>
      </CreateProjectModal>

      <DeleteProjectModal
        isOpen={deleteProjectModalIsOpen}
        onRequestClose={() => setDeleteProjectModalIsOpen(false)}
        className="react-modal-content"
        overlayClassName="react-modal-overlay">
        <div className="header">
          <BiInfoCircle size={20} />
          <BiX size={20} className="close-modal" onClick={() => setDeleteProjectModalIsOpen(false)} />
        </div>
        <div>
          <p>
            Tem certeza que deseja excluir o projeto
            <br></br>
            <strong>{name}</strong>?
          </p>
          <small>Essa ação não poderá ser revertida!</small>
        </div>
        <div className="footer">
          <button type="button" onClick={() => setDeleteProjectModalIsOpen(false)}>
            Cancelar
          </button>
          <button type="button" onClick={() => handleDeleteProject()}>
            Excluir
          </button>
        </div>
      </DeleteProjectModal>
    </Container>
  );
}
