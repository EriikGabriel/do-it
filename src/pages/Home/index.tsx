import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { Menu } from "../../components/Menu";
import { MenuContext } from "../../contexts/MenuContext";
import { TagsList } from "./TagsList";

import { TodayList } from "./TodayList";
import { TodoList } from "./TodoList";

export function Home() {
  const navigate = useNavigate();
  const { optionsName } = useContext(MenuContext);

  useEffect(() => {
    if (!localStorage.getItem("@doit:token")) {
      navigate("/login");
    }
  });

  function menuRender() {
    switch (optionsName) {
      case "todo":
        return <TodoList />;
      case "tags":
        return <TagsList />;
      case "today":
        return <TodayList />;
      default:
        return <TodayList />;
    }
  }

  return (
    <>
      <Menu />
      <Header />
      {menuRender()}
    </>
  );
}
