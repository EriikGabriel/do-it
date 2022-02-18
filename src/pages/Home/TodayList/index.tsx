import { Container } from "./styles";
import { format, formatDistanceToNowStrict } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useEffect, useState } from "react";

import { database } from "../../../services/firebase";
import { Todo } from "../../../components/Todo";
import { TodoBox } from "../../../components/TodoBox";

import TodaySvg from "../../../assets/today.svg";

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
  todoProjectId: string;
  priority: string;
  description: string;
  tag: {
    name: string;
    color: string;
  };
  dueDate: string;
};

export function TodayList() {
  const [todayTodos, setTodayTodos] = useState<TodoType[]>([]);

  const [todoBoxType, setTodoBoxType] = useState("");

  const [todoEditId, setTodoEditId] = useState("");

  useEffect(() => {
    const firebaseUserKey = localStorage.getItem("@doit:token");
    const projectsRef = database.ref(`users/${firebaseUserKey}/projects`);

    projectsRef.on("value", (project) => {
      if (project.val()) {
        const projectsIds = Object.keys(project.val());
        let concatParsedTodayTodos: TodoType[] = [];

        projectsIds.forEach((projectId) => {
          const todosRef = database.ref(`users/${firebaseUserKey}/projects/${projectId}/todos`);

          todosRef.on("value", (todo) => {
            const databaseTodo = todo.val() as FirebaseTodos;
            const firebaseTodo = databaseTodo ?? {};

            const parsedTodayTodos = Object.entries(firebaseTodo)
              .map(([key, value]) => {
                return {
                  id: key,
                  todoProjectId: projectId,
                  priority: value.priority,
                  description: value.description,
                  tag: {
                    name: value.tag.name,
                    color: value.tag.color,
                  },
                  dueDate: value.dueDate,
                };
              })
              .filter((todo) => {
                const [, unity] = formatDistanceToNowStrict(new Date(todo.dueDate), { locale: ptBR }).split(" ");
                const todayUnits = ["segundo", "minuto", "hora"];
                if (
                  todayUnits.some((tUnity) => tUnity === unity) ||
                  todayUnits.some((tUnity) => `${tUnity}s` === unity)
                ) {
                  return todo;
                } else return null;
              });

            concatParsedTodayTodos = concatParsedTodayTodos.concat(parsedTodayTodos);
          });
        });
        setTodayTodos(concatParsedTodayTodos);
      }
    });

    return () => {
      setTodayTodos([]);
    };
  }, []);

  return (
    <>
      <Container>
        <div>
          <h1>
            {todayTodos.length !== 0 ? (
              <p>
                Você tem{" "}
                <span>
                  {todayTodos.length} {todayTodos.length > 1 ? "tarefas" : "tarefa"}{" "}
                </span>{" "}
                hoje
              </p>
            ) : (
              <p>
                Você não tem <span>tarefas</span> hoje
              </p>
            )}
          </h1>
          <small>{format(Date.now(), "eeeeee, d MMM ", { locale: ptBR })}</small>
        </div>
        <div>
          {todayTodos.map(({ id, priority, description, tag, dueDate, todoProjectId }) => {
            return todoBoxType === "edit" && todoEditId === id ? (
              <TodoBox setTodoBoxType={setTodoBoxType} todoId={todoEditId} todoProjectId={todoProjectId} key={id} />
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
                todoProjectId={todoProjectId}
              />
            );
          })}
        </div>
        {todayTodos.length === 0 && (
          <div className="today-empty">
            <img src={TodaySvg} alt="Today illustration" />
            <div>
              <p>Tenha uma visão clara do dia</p>
              <small>Todas as suas tarefas de hoje aparecem aqui!</small>
            </div>
          </div>
        )}
      </Container>
    </>
  );
}
