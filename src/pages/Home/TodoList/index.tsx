import { useContext, useEffect, useState } from "react";
import { ProjectContext } from "../../../contexts/ProjectContext";
import { BsPlusCircle, BsPlusCircleFill } from "react-icons/bs";
import { database } from "../../../services/firebase";
import { Container } from "./styles";
import { ThemeContext } from "styled-components";
import { NewTodoBox } from "../../../components/NewTodoBox";
import { Todo } from "../../../components/Todo";

type FirebaseTodos = Record<
  string,
  {
    priority: string;
    description: string;
    tag: {
      name: string;
      color: string;
    };
    dueDate: string;
  }
>;

type TodoType = {
  id: string;
  priority: string;
  description: string;
  tag: {
    name: string;
    color: string;
  };
  dueDate: string;
};

export function TodoList() {
  const { projectId } = useContext(ProjectContext);
  const { colors } = useContext(ThemeContext);

  const [projectName, setProjectName] = useState("");

  const [isHover, setIsHover] = useState(false);
  const [isNewTodo, setIsNewTodo] = useState(false);

  const [todos, setTodos] = useState<TodoType[]>([]);

  useEffect(() => {
    const firebaseUserKey = localStorage.getItem("@doit:token");
    const projectRef = database.ref(`users/${firebaseUserKey}/projects/${projectId}`);
    const todosRef = database.ref(`users/${firebaseUserKey}/projects/${projectId}/todos`);

    projectRef.child("name").on("value", (name) => setProjectName(name.val()));

    todosRef.on("value", (todo) => {
      const databaseTodo = todo.val() as FirebaseTodos;
      const firebaseTodo = databaseTodo ?? {};

      const parsedTodos = Object.entries(firebaseTodo).map(([key, value]) => {
        return {
          id: key,
          priority: value.priority,
          description: value.description,
          tag: {
            name: value.tag.name,
            color: value.tag.color,
          },
          dueDate: value.dueDate,
        };
      });

      setTodos(parsedTodos);

      return () => {
        setTodos([]);
      };
    });
  }, [projectId]);

  return (
    <>
      <Container>
        <h1>{projectName}</h1>
        <div>
          {todos.map(({ priority, description, tag, dueDate, id }) => (
            <Todo
              priority={priority}
              description={description}
              tagName={tag.name}
              tagColor={tag.color}
              dueDate={dueDate}
              key={id}
            />
          ))}
        </div>
        {isNewTodo ? (
          <NewTodoBox newTodoBox={setIsNewTodo} />
        ) : (
          <button
            type="button"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onClick={() => setIsNewTodo(true)}>
            {isHover ? (
              <BsPlusCircleFill size={20} fill={colors.primary} />
            ) : (
              <BsPlusCircle size={20} fill={colors.primary} />
            )}
            Adicionar tarefa
          </button>
        )}
      </Container>
    </>
  );
}
