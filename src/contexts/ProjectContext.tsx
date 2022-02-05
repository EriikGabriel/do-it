import { createContext, ReactNode, useState } from "react";

type ProjectContextType = {
  projectId: string;
  setNewProjectId: (id: string) => void;
};

type ProjectContextProviderProps = {
  children: ReactNode;
};

export const ProjectContext = createContext({} as ProjectContextType);

export function ProjectContextProvider(props: ProjectContextProviderProps) {
  const [projectId, setProjectId] = useState("");

  function setNewProjectId(id: string) {
    setProjectId(id);
  }

  return <ProjectContext.Provider value={{ projectId, setNewProjectId }}>{props.children}</ProjectContext.Provider>;
}
