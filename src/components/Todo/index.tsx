import { useContext, useEffect, useState } from "react";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import { ThemeContext } from "styled-components";
import { Container } from "./styles";

type TodoProps = {
  priority: string;
  description: string;
  tagName: string;
  tagColor: string;
  dueDate: string;
};

export function Todo({ priority, description, tagName, tagColor, dueDate }: TodoProps) {
  const { colors } = useContext(ThemeContext);

  const [priorityColor, setPriorityColor] = useState("");
  const [tagVisibility, setTagVisibility] = useState<VisibilityState>("hidden");

  useEffect(() => {
    const priorityColorsOptions = [colors.red, colors.green, colors.blue, colors.shape_dark];
    setPriorityColor(priorityColorsOptions[Number(priority[1]) - 1]);

    tagName !== "Definir tag" && setTagVisibility("visible");
  }, [colors.red, colors.green, colors.blue, colors.shape_dark, priority, tagName]);

  return (
    <Container>
      <div>
        <div>
          <button type="button" className="todo-priority-button">
            <div style={{ backgroundColor: priorityColor }}></div>
          </button>
          <p>{description}</p>
        </div>
        <button
          type="button"
          style={{
            background: `rgba(${/\(([^)]+)\)/.exec(tagColor)?.[1]}, 0.2)`,
            color: tagColor,
            border: `1px solid ${tagColor}`,
            visibility: `${tagVisibility}`,
          }}>
          {tagName}
        </button>
        <p>
          {new Intl.DateTimeFormat("pt-br", {
            weekday: "short",
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
          }).format(new Date(dueDate))}
        </p>
        <div className="actions">
          <button type="button">
            <HiDotsCircleHorizontal size={25} fill={colors.shape_dark} />
          </button>
        </div>
      </div>
    </Container>
  );
}
