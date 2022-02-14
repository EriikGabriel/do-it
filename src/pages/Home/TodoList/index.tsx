import { useContext, useEffect, useState } from "react";
import { ProjectContext } from "../../../contexts/ProjectContext";
import { BsPlusCircle, BsPlusCircleFill } from "react-icons/bs";
import { database } from "../../../services/firebase";
import { Container } from "./styles";
import { ThemeContext } from "styled-components";
import { TodoBox } from "../../../components/TodoBox";
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
  const [todoBoxType, setTodoBoxType] = useState("");

  const [todos, setTodos] = useState<TodoType[]>([]);
  const [todoEditId, setTodoEditId] = useState("");

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
          {todos.map(({ priority, description, tag, dueDate, id }) => {
            return todoBoxType === "edit" && todoEditId === id ? (
              <TodoBox setTodoBoxType={setTodoBoxType} todoId={todoEditId} key={id} />
            ) : (
              <Todo
                priority={priority}
                description={description}
                tagName={tag.name}
                tagColor={tag.color}
                dueDate={dueDate}
                key={id}
                todoId={id}
                setEditId={setTodoEditId}
                setTodoBoxType={setTodoBoxType}
              />
            );
          })}
        </div>
        {isNewTodo}
        {todoBoxType === "create" ? (
          <TodoBox setTodoBoxType={setTodoBoxType} />
        ) : (
          <button
            type="button"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onClick={() => setTodoBoxType("create")}>
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
