import React, { Dispatch, FormEvent, SetStateAction, useContext, useEffect, useState } from "react";
import { BsCheck, BsPlus } from "react-icons/bs";
import { ImPriceTag } from "react-icons/im";
import ReactTooltip from "react-tooltip";
import { ThemeContext } from "styled-components";
import { Container } from "./styles";
import { database } from "../../services/firebase";
import { ProjectContext } from "../../contexts/ProjectContext";

type NewTodoBoxProps = {
  newTodoBox: Dispatch<SetStateAction<boolean>>;
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

export function NewTodoBox(props: NewTodoBoxProps) {
  const { colors } = useContext(ThemeContext);

  const [newTag, setNewTag] = useState("");
  const [tags, setTags] = useState<TagsType[]>([]);
  const [searchedTags, setSearchedTags] = useState<TagsType[]>([]);

  const [tagName, setTagName] = useState("Definir tag");
  const [tagColor, setTagColor] = useState("");

  const [priority, setPriority] = useState("p4");
  const [description, setDescription] = useState("");

  const [dueDate, setDueDate] = useState<Date | string>("");

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

  function handleSelectPriority(e: React.MouseEvent) {
    const options = [colors.red, colors.green, colors.blue, colors.shape_dark];
    const optionValue = Number((e.currentTarget as HTMLButtonElement).value) - 1;
    const priorityColorElement = document.querySelector(".priority-button div") as HTMLDivElement;

    priorityColorElement.style.backgroundColor = options[optionValue];
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
    const todosRef = database.ref(`users/${firebaseUserKey}/projects/${projectId}/todos`);

    todosRef.push({
      priority,
      description,
      tag: {
        name: tagName,
        color: tagColor,
      },
      dueDate,
    });

    props.newTodoBox(false);
  }

  return (
    <Container onSubmit={handleCreateNewTodo}>
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
            autoComplete="off"
            onChange={(e) => setDescription(e.target.value)}
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
        <input type="datetime-local" onChange={(e) => setDueDate(e.target.value)} required />
      </div>
      <div className="form-action">
        <button type="submit">Adicionar tarefa</button>
        <button type="button" onClick={() => props.newTodoBox(false)}>
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
                  {name === tagName ? <BsCheck size={15} /> : <div style={{ width: "15px" }}></div>}
                </button>
              ))
            : searchedTags.map(({ color, name }) => (
                <button type="button" onClick={handleSelectTag} value={name} key={name}>
                  <ImPriceTag size={15} fill={color} />
                  <p>{name}</p>
                  {name === tagName ? <BsCheck size={15} /> : <div style={{ width: "15px" }}></div>}
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
