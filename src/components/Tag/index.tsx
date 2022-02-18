import { ImPriceTag } from "react-icons/im";
import { RiDeleteBinLine, RiEditLine } from "react-icons/ri";
import { Container, DeleteTagModal } from "./styles";
import { Dispatch, useEffect, useState } from "react";
import { BiInfoCircle, BiX } from "react-icons/bi";
import { database } from "../../services/firebase";

type TagProps = {
  id: string;
  name: string;
  color: string;
  setEditId: Dispatch<React.SetStateAction<string>>;
  setTagBoxType: Dispatch<React.SetStateAction<string>>;
};

type FirebaseTags = Record<
  string,
  {
    name: string;
    color: string;
  }
>;

type TagsType = {
  name: string;
  color: string;
};

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

export function Tag({ name, color, id, setEditId, setTagBoxType }: TagProps) {
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  const [tagTodos, setTagTodos] = useState<TodoType[]>([]);

  function handleDeleteTag() {
    const firebaseUserKey = localStorage.getItem("@doit:token");
    const projectsRef = database.ref(`users/${firebaseUserKey}/projects`);

    projectsRef.on("value", (project) => {
      const projectsIds = Object.keys(project.val());
      let concatParsedTagTodos: TodoType[] = [];

      projectsIds.forEach((projectId) => {
        const todosRef = database.ref(`users/${firebaseUserKey}/projects/${projectId}/todos`);

        todosRef.on("value", (todo) => {
          const databaseTodo = todo.val() as FirebaseTodos;
          const firebaseTodo = databaseTodo ?? {};

          const parsedTagTodos = Object.entries(firebaseTodo)
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
              if (todo.tag.name === name) {
                return todo;
              } else return null;
            });

          concatParsedTagTodos = concatParsedTagTodos.concat(parsedTagTodos);
        });
        todosRef.off();
      });

      const todoRefPaths = concatParsedTagTodos.map(
        ({ id, todoProjectId }) => `users/${firebaseUserKey}/projects/${todoProjectId}/todos/${id}`
      );

      const tagRef = database.ref(`users/${firebaseUserKey}/tags/${id}`);

      tagRef.remove((error) => {
        if (error) throw new Error("Could not delete tag");
      });

      todoRefPaths.forEach((todoRefPath) => {
        const todoRef = database.ref(todoRefPath);

        todoRef.update({
          tag: {
            color: "",
            name: "Definir tag",
          },
        });
      });
    });
  }

  return (
    <>
      <Container>
        <div
          style={{
            background: `rgba(${/\(([^)]+)\)/.exec(color)?.[1]}, 0.2)`,
            color: color,
            border: `1px solid ${color}`,
          }}>
          <div>
            <ImPriceTag size={18} />
            <p>{name}</p>
          </div>

          <div className="actions">
            <button
              type="button"
              onClick={() => {
                if (setEditId) setEditId(id);
                if (setTagBoxType) setTagBoxType("edit");
              }}>
              <RiEditLine size={18} fill={color} />
            </button>
            <button type="button" onClick={() => setDeleteModalIsOpen(true)}>
              <RiDeleteBinLine size={18} fill={color} />
            </button>
          </div>
        </div>
      </Container>

      <DeleteTagModal
        isOpen={deleteModalIsOpen}
        onRequestClose={() => setDeleteModalIsOpen(false)}
        className="react-modal-content"
        overlayClassName="react-modal-overlay">
        <div className="header">
          <BiInfoCircle size={20} />
          <BiX size={20} className="close-modal" onClick={() => setDeleteModalIsOpen(false)} />
        </div>
        <div>
          <p>
            Tem certeza que deseja excluir a tag
            <br></br>
            <strong>{name}</strong>?
          </p>
          <small>Essa ação não poderá ser revertida!</small>
        </div>
        <div className="footer">
          <button type="button" onClick={() => setDeleteModalIsOpen(false)}>
            Cancelar
          </button>
          <button type="button" onClick={() => handleDeleteTag()}>
            Excluir
          </button>
        </div>
      </DeleteTagModal>
    </>
  );
}
