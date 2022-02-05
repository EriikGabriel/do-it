import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { Menu } from "../../components/Menu";
import { ProjectContext } from "../../contexts/ProjectContext";

import { TodayList } from "./TodayList";
import { TodoList } from "./TodoList";

export function Home() {
  const navigate = useNavigate();
  const { projectId } = useContext(ProjectContext);

  useEffect(() => {
    if (!localStorage.getItem("@doit:token")) {
      navigate("/login");
    }
  });

  return (
    <>
      <Menu />
      <Header />
      {projectId ? <TodoList /> : <TodayList />}
    </>
  );
}
