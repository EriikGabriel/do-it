import { useEffect, useState } from "react";
import { Container } from "./styles";

export function TodayList() {
  const [todayDateFormat, setTodayDateFormat] = useState("");

  useEffect(() => {
    const day = new Intl.DateTimeFormat("pt-br", { day: "2-digit" }).format(Date.now());
    const month = new Intl.DateTimeFormat("pt-br", { month: "short" }).format(Date.now()).replace(".", "");
    const weekday = new Intl.DateTimeFormat("pt-br", { weekday: "short" }).format(Date.now()).replace(".", "");

    setTodayDateFormat(`${weekday}, ${day} ${month}`);
  });

  return (
    <>
      <Container>
        <div>
          <h1>
            Você tem <span>7 tarefas</span> hoje
          </h1>
          <small>{todayDateFormat}</small>
        </div>
        <div></div>
      </Container>
    </>
  );
}
