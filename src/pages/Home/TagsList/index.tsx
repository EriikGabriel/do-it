import { useContext, useEffect, useState } from "react";
import { BsPlusCircle, BsPlusCircleFill } from "react-icons/bs";
import { ThemeContext } from "styled-components";
import { Tag } from "../../../components/Tag";
import { TagBox } from "../../../components/TagBox";
import { database } from "../../../services/firebase";
import { Container } from "./styles";

type FirebaseTags = Record<
  string,
  {
    name: string;
    color: string;
  }
>;

type TagsType = {
  id: string;
  name: string;
  color: string;
};

export function TagsList() {
  const { colors } = useContext(ThemeContext);

  const [tags, setTags] = useState<TagsType[]>([]);

  const [tagBoxType, setTagBoxType] = useState("");
  const [tagEditId, setTagEditId] = useState("");

  useEffect(() => {
    const firebaseUserKey = localStorage.getItem("@doit:token");
    const tagsRef = database.ref(`users/${firebaseUserKey}/tags`);

    tagsRef.on("value", (tag) => {
      const databaseTag = tag.val() as FirebaseTags;
      const firebaseTags = databaseTag ?? {};

      const parsedTags = Object.entries(firebaseTags).map(([key, value]) => {
        return {
          id: key,
          name: value.name,
          color: value.color,
        };
      });

      setTags(parsedTags);

      return () => {
        setTags([]);
      };
    });
  }, []);

  return (
    <>
      <Container>
        <h1>Tags</h1>
        <div>
          {tags.map(({ name, color, id }) => {
            return tagBoxType === "edit" && tagEditId === id ? (
              <TagBox tagId={id} setTagBoxType={setTagBoxType} key={id} />
            ) : (
              <Tag name={name} color={color} id={id} key={id} setEditId={setTagEditId} setTagBoxType={setTagBoxType} />
            );
          })}
          {tagBoxType === "create" ? (
            <TagBox setTagBoxType={setTagBoxType} />
          ) : (
            <button type="button" onClick={() => setTagBoxType("create")}>
              <BsPlusCircle size={20} fill={colors.primary} />

              <p>Adicionar tag</p>
            </button>
          )}
        </div>
      </Container>
    </>
  );
}
