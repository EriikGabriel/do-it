import { useState } from "react";
import { useParams } from "react-router-dom";
import { Menu } from "../../components/Menu";
import { Container } from "./styles";

export function TodoList() {
  const { id } = useParams();

  return (
    <>
      <Container>
        <h1>Todo List {id}</h1>
      </Container>
    </>
  );
}
