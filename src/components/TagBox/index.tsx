import { Dispatch, FormEvent, SetStateAction, useContext, useEffect, useState } from "react";
import { ImCancelCircle, ImCheckmark, ImPriceTag } from "react-icons/im";
import ReactTooltip from "react-tooltip";
import { ThemeContext } from "styled-components";
import { database } from "../../services/firebase";
import { Container } from "./styles";

type TagBoxProps = {
  setTagBoxType: Dispatch<SetStateAction<string>>;
  tagId?: string;
};

type TagsType = {
  name: string;
  color: string;
};

export function TagBox({ tagId, setTagBoxType }: TagBoxProps) {
  const { colors } = useContext(ThemeContext);

  const [, setTags] = useState<TagsType[]>([]);

  const colorValues = ["rgb(178, 60, 253)", "rgb(0, 183, 74)", "rgb(255, 169, 0)", "rgb(57, 192, 237)"];
  const index = Math.floor(Math.random() * colorValues.length);

  const [name, setName] = useState("");
  const [color, setColor] = useState(colorValues[index]);

  useEffect(() => {
    if (tagId) {
      const firebaseUserKey = localStorage.getItem("@doit:token");
      const tagRef = database.ref(`users/${firebaseUserKey}/tags/${tagId}`);

      tagRef.once("value", (tag) => {
        const databaseTag = tag.val() as TagsType;
        const firebaseTag = databaseTag ?? {};

        setName(firebaseTag.name);
        setColor(firebaseTag.color);

        return () => {
          setTags([]);
        };
      });
    }
  }, [tagId]);

  useEffect(() => {
    const nameTagElement = document.getElementById("name-tag-input") as HTMLInputElement;
    nameTagElement.focus();
  });

  function handleSelectTagColor(e: React.MouseEvent) {
    const options = ["rgb(178, 60, 253)", "rgb(0, 183, 74)", "rgb(255, 169, 0)", "rgb(57, 192, 237)"];
    const colorValue = Number((e.currentTarget as HTMLButtonElement).value) - 1;

    setColor(options[colorValue]);
  }

  function handleCreateNewTag(e: FormEvent) {
    e.preventDefault();

    const firebaseUserKey = localStorage.getItem("@doit:token");
    const tagsRef = database.ref(`users/${firebaseUserKey}/tags`);

    tagsRef.push({
      name,
      color,
    });

    setTagBoxType("");
  }

  function handleUpdateTag(e: FormEvent) {
    e.preventDefault();

    const firebaseUserKey = localStorage.getItem("@doit:token");
    const tagRef = database.ref(`users/${firebaseUserKey}/tags/${tagId}`);

    tagRef.update({
      name,
      color,
    });

    setTagBoxType("");
  }

  return (
    <>
      <Container onSubmit={tagId ? handleUpdateTag : handleCreateNewTag}>
        <div
          style={{
            background: `rgba(${/\(([^)]+)\)/.exec(color)?.[1]}, 0.2)`,
            color: color,
            border: `1px solid ${color}`,
          }}>
          <div>
            <button type="button" data-tip data-for="tag-color" data-event="click">
              <ImPriceTag size={18} fill={color} />
            </button>
            <input
              type="text"
              autoComplete="off"
              id="name-tag-input"
              placeholder="Digite o nome da tag..."
              value={name}
              style={{ color }}
              onChange={(e) => {
                const button = document.querySelector("button[type='submit']");
                if (e.target.value !== "") button?.removeAttribute("disabled");
                else button?.setAttribute("disabled", "");
                setName(e.target.value);
              }}
              maxLength={10}
              required
            />
          </div>
          <div className="form-action">
            <button type="submit">
              <ImCheckmark size={18} fill={color} />
            </button>
            <button
              type="button"
              onClick={() => {
                setTagBoxType("");
              }}>
              <ImCancelCircle size={18} fill={color} />
            </button>
          </div>
        </div>

        <ReactTooltip
          id="tag-color"
          place="left"
          effect="solid"
          clickable={true}
          globalEventOff="click"
          className="tooltip tag-color-tooltip"
          backgroundColor={colors.themeColor}>
          <div onClick={(e) => e.stopPropagation()} className="tooltip-wrapper">
            <button type="button" onClick={handleSelectTagColor} value={1}>
              <div></div>
              <p>Roxo</p>
            </button>
            <button type="button" onClick={handleSelectTagColor} value={2}>
              <div></div>
              <p>Verde</p>
            </button>
            <button type="button" onClick={handleSelectTagColor} value={3}>
              <div></div>
              <p>Amarelo</p>
            </button>
            <button type="button" onClick={handleSelectTagColor} value={4}>
              <div></div>
              <p>Azul</p>
            </button>
          </div>
        </ReactTooltip>
      </Container>
    </>
  );
}
