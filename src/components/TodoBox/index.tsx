import React, { Dispatch, FormEvent, SetStateAction, useContext, useEffect, useState } from "react";
import { BsCheck, BsPlus } from "react-icons/bs";
import { ImPriceTag } from "react-icons/im";
import ReactTooltip from "react-tooltip";
import { ThemeContext } from "styled-components";
import { Container } from "./styles";
import { database } from "../../services/firebase";
import { ProjectContext } from "../../contexts/ProjectContext";
import { darken, lighten, transparentize } from "polished";
import { formatISO } from "date-fns";

type TodoBoxProps = {
  setTodoBoxType: Dispatch<SetStateAction<string>>;
  todoId?: string;
  todoProjectId?: string;
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

type TodoType = {
  priority: string;
  description: string;
  tag: TagsType;
  dueDate: string;
};

export function TodoBox({ setTodoBoxType, todoId, todoProjectId }: TodoBoxProps) {
  const { colors } = useContext(ThemeContext);

  const [newTag, setNewTag] = useState("");
  const [tags, setTags] = useState<TagsType[]>([]);
  const [searchedTags, setSearchedTags] = useState<TagsType[]>([]);

  const [tagName, setTagName] = useState("Definir tag");
  const [tagColor, setTagColor] = useState("");

  const [priority, setPriority] = useState("p4");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<string>("");

  const { projectId } = useContext(ProjectContext);

  useEffect(() => {
    const firebaseUserKey = localStorage.getItem("@doit:token");
    const tagsRef = database.ref(`users/${firebaseUserKey}/tags`);

    tagsRef.on("value", (tag) => {
      const databaseTag = tag.val() as FirebaseTags;
      const firebaseTags = databaseTag ?? {};

      const parsedTags = Object.entries(firebaseTags).map(([__, value]) => {
        return {
          name: value.name,
          color: value.color,
        };
      });

      setTags(parsedTags);

      return () => {
        setTags([]);
        setSearchedTags([]);
      };
    });
  }, []);

  useEffect(() => {
    if (todoId) {
      const firebaseUserKey = localStorage.getItem("@doit:token");
      const todoRef = database.ref(
        `users/${firebaseUserKey}/projects/${!projectId ? todoProjectId : projectId}/todos/${todoId}`
      );

      todoRef.once("value", (todo) => {
        const databaseTodo = todo.val() as TodoType;
        const firebaseTodo = databaseTodo ?? {};

        setPriority(firebaseTodo.priority);
        setDescription(firebaseTodo.description);
        setTagName(firebaseTodo.tag.name);
        setTagColor(firebaseTodo.tag.color);
        setDueDate(firebaseTodo.dueDate);
      });
    }
  }, [projectId, todoId, todoProjectId]);

  useEffect(() => {
    const priorityColorElement = document.querySelector(".priority-button div") as HTMLDivElement;
    const options = [colors.red, colors.green, colors.blue, colors.shape_dark];
    const priorityIndex = Number(priority[1]) - 1;

    priorityColorElement.style.backgroundColor = transparentize(0.7, options[priorityIndex]);
    priorityColorElement.style.borderColor = darken(0.1, options[priorityIndex]);
  }, [colors.red, colors.green, colors.blue, colors.shape_dark, priority]);

  function handleSelectPriority(e: React.MouseEvent) {
    const priorityColorElement = document.querySelector(".priority-button div") as HTMLDivElement;
    const options = [colors.red, colors.green, colors.blue, colors.shape_dark];
    const optionValue = Number((e.currentTarget as HTMLButtonElement).value) - 1;

    priorityColorElement.style.backgroundColor = lighten(0.15, options[optionValue]);
    priorityColorElement.style.borderColor = darken(0.2, options[optionValue]);
    setPriority(`p${optionValue + 1}`);
  }

  function handleSearchTag(e: React.ChangeEvent) {
    const searchValue = (e.target as HTMLInputElement).value;
    const tagsNames = tags.map(({ name }) => name);
    const alreadyExistsTagName = tagsNames.some((tagName) => tagName === searchValue);

    const filteredTags = tags.filter(({ name }) => name.includes(searchValue));

    setSearchedTags(filteredTags);

    alreadyExistsTagName ? setNewTag("") : setNewTag(searchValue);
  }

  function handleCreateNewTag() {
    const colors = ["rgb(178, 60, 253)", "rgb(0, 183, 74)", "rgb(255, 169, 0)", "rgb(57, 192, 237)"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const firebaseUserKey = localStorage.getItem("@doit:token");
    const tagsRef = database.ref(`users/${firebaseUserKey}/tags`);

    tagsRef.push({
      name: newTag,
      color: randomColor,
    });

    (document.getElementById("search-input") as HTMLInputElement).value = "";

    setSearchedTags([]);
    setNewTag("");
  }

  function handleSelectTag(e: React.MouseEvent) {
    const tagElement = e.currentTarget as HTMLButtonElement;

    const name = tagElement.value;
    const color = tagElement.children[0].getAttribute("fill") ?? "#000000";

    if (tagElement.value === tagName) {
      setTagName("Definir tag");
      setTagColor("rgb(94, 94, 94)");
    } else {
      setTagName(name);
      setTagColor(color);
    }
  }

  function handleCreateNewTodo(e: FormEvent) {
    e.preventDefault();

    const firebaseUserKey = localStorage.getItem("@doit:token");
    const todosRef = database.ref(`users/${firebaseUserKey}/projects/${!projectId ? todoProjectId : projectId}/todos`);

    todosRef.push({
      priority,
      description,
      tag: {
        name: tagName,
        color: tagColor,
      },
      dueDate,
    });

    setTodoBoxType("");
  }

  function handleUpdateTodo(e: FormEvent) {
    e.preventDefault();

    const firebaseUserKey = localStorage.getItem("@doit:token");
    const todoRef = database.ref(
      `users/${firebaseUserKey}/projects/${!projectId ? todoProjectId : projectId}/todos/${todoId}`
    );

    todoRef.update({
      priority,
      description,
      tag: {
        name: tagName,
        color: tagColor,
      },
      dueDate,
    });

    setTodoBoxType("");
  }

  return (
    <Container onSubmit={todoId ? handleUpdateTodo : handleCreateNewTodo}>
      <div>
        <div>
          <button
            type="button"
            className="priority-button"
            value={colors.shape_dark}
            data-tip
            data-for="priority"
            data-event="click">
            <div></div>
          </button>
          <input
            type="text"
            id="description-input"
            placeholder="Descreva o que quer fazer..."
            value={description}
            autoComplete="off"
            onChange={(e) => {
              const button = document.querySelector("button[type='submit']");
              if (e.target.value !== "") button?.removeAttribute("disabled");
              else button?.setAttribute("disabled", "");
              setDescription(e.target.value);
            }}
            required
          />
        </div>
        <button
          type="button"
          data-tip
          data-for="tag"
          data-event="click"
          style={{
            background: `rgba(${/\(([^)]+)\)/.exec(tagColor)?.[1]}, 0.2)`,
            color: tagColor,
            border: `1px solid ${tagColor}`,
          }}>
          {tagName}
        </button>
        <input
          type="datetime-local"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          min={formatISO(new Date()).substring(0, 16)}
          required
        />
      </div>
      <div className="form-action">
        {todoId ? (
          <button type="submit">Salvar</button>
        ) : (
          <button type="submit" disabled>
            Adicionar tarefa
          </button>
        )}
        <button type="button" onClick={() => setTodoBoxType("")}>
          Cancelar
        </button>
      </div>

      <ReactTooltip
        id="priority"
        place="left"
        effect="solid"
        clickable={true}
        globalEventOff="click"
        className="tooltip priority-tooltip"
        backgroundColor={colors.themeColor}>
        <div onClick={(e) => e.stopPropagation()} className="tooltip-wrapper">
          <button type="button" onClick={handleSelectPriority} value={1}>
            <div></div>
            Prioridade 1
          </button>
          <button type="button" onClick={handleSelectPriority} value={2}>
            <div></div>
            Prioridade 2
          </button>
          <button type="button" onClick={handleSelectPriority} value={3}>
            <div></div>
            Prioridade 3
          </button>
          <button type="button" onClick={handleSelectPriority} value={4}>
            <div></div>
            Prioridade 4
          </button>
        </div>
      </ReactTooltip>

      <ReactTooltip
        id="tag"
        place="bottom"
        effect="solid"
        clickable={true}
        globalEventOff="click"
        className="tooltip tag-tooltip"
        backgroundColor={colors.themeColor}>
        <div onClick={(e) => e.stopPropagation()} className="tooltip-wrapper">
          <input
            type="search"
            placeholder="Digite uma tag"
            id="search-input"
            maxLength={10}
            autoComplete="off"
            onChange={(e) => handleSearchTag(e)}
          />

          {searchedTags.length === 0
            ? tags.map(({ color, name }) => (
                <button type="button" onClick={handleSelectTag} value={name} key={name}>
                  <ImPriceTag size={15} fill={color} />
                  <p>{name}</p>
                  {name === tagName ? (
                    <BsCheck size={15} fill={colors.text_body} />
                  ) : (
                    <div style={{ width: "15px" }}></div>
                  )}
                </button>
              ))
            : searchedTags.map(({ color, name }) => (
                <button type="button" onClick={handleSelectTag} value={name} key={name}>
                  <ImPriceTag size={15} fill={color} />
                  <p>{name}</p>
                  {name === tagName ? (
                    <BsCheck size={15} fill={colors.text_body} />
                  ) : (
                    <div style={{ width: "15px" }}></div>
                  )}
                </button>
              ))}

          {newTag !== "" && (
            <button type="button" id="new-tag-button" onClick={handleCreateNewTag}>
              <BsPlus size={20} />
              Criar tag "{newTag}"
            </button>
          )}
        </div>
      </ReactTooltip>
    </Container>
  );
}
