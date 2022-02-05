import React, { useContext, useEffect, useState } from "react";
import { FaEllipsisH } from "react-icons/fa";
import { ProjectContext } from "../../contexts/ProjectContext";
import { database } from "../../services/firebase";
import { Container } from "./styles";

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
  const [projects, setProjects] = useState<ProjectsType[]>([]);
  const { setNewProjectId } = useContext(ProjectContext);

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

  function handleOpenTodoList(e: React.MouseEvent<HTMLButtonElement>) {
    const listId = (e.currentTarget as HTMLButtonElement).dataset.id ?? "";

    setNewProjectId(listId);
  }

  return (
    <Container>
      {projects.map(({ id, name, color }) => (
        <button type="button" data-id={id} key={id} onClick={handleOpenTodoList}>
          <div>
            <div className="project-color" style={{ backgroundColor: color }}></div>
            {name}
          </div>
          <div>
            <FaEllipsisH size={15} />
          </div>
        </button>
      ))}
    </Container>
  );
}
