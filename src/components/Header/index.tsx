/* eslint-disable jsx-a11y/img-redundant-alt */
import { Container } from "./styles";
import { VscBell } from "react-icons/vsc";
import { MdDarkMode, MdLightMode, MdSearch } from "react-icons/md";
import { useAuth } from "../../hooks/useAuth";
import ReactTooltip from "react-tooltip";
import { useContext } from "react";
import { ThemeContext } from "styled-components";
import { BsDoorOpen } from "react-icons/bs";
import {} from "react-icons/md";
import ReactSwitch from "react-switch";
import { ThemeAppContext } from "../../contexts/ThemeAppContext";
import { lighten, shade } from "polished";

export function Header() {
  const { user, googleSignOut } = useAuth();
  const { colors, title } = useContext(ThemeContext);
  const { toggleTheme } = useContext(ThemeAppContext);

  return (
    <Container>
      <form>
        <MdSearch size={25} />
        <input type="search" placeholder="Pesquise o que quiser"></input>
      </form>
      <div>
        <ReactSwitch
          id="switch-mode"
          onChange={toggleTheme}
          checked={title === "dark"}
          checkedIcon={<MdDarkMode size={15} fill="#ffffff" style={{ marginRight: "12px" }} />}
          uncheckedIcon={<MdLightMode size={15} fill="#fcfbc1" style={{ marginRight: "5px" }} />}
          onHandleColor="#0F1A20"
          offHandleColor="#ffffff"
          height={20}
          width={44}
          handleDiameter={16}
          onColor={lighten(0.1, colors.shape_dark)}
          offColor={lighten(0.1, colors.shape_dark)}
        />

        <button type="button">
          <VscBell size={25} fill={colors.text_body} />
        </button>
        <div data-tip data-for="account" data-event="click" className="border-account">
          <img src={user?.avatar} alt="Profile picture" referrerPolicy="no-referrer" />
        </div>
      </div>

      <ReactTooltip
        id="account"
        place="bottom"
        arrowColor="transparent"
        effect="solid"
        clickable={true}
        globalEventOff="click"
        className="tooltip account-tooltip"
        backgroundColor={colors.themeColor}>
        <div onClick={(e) => e.stopPropagation()} className="tooltip-wrapper">
          <button type="button" onClick={googleSignOut}>
            <BsDoorOpen size={15} />
            Sair da conta
          </button>
        </div>
      </ReactTooltip>
    </Container>
  );
}
