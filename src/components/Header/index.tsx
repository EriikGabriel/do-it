/* eslint-disable jsx-a11y/img-redundant-alt */
import { Container } from "./styles";
import { VscBell } from "react-icons/vsc";
import { MdSearch } from "react-icons/md";
import { useAuth } from "../../hooks/useAuth";
import ReactTooltip from "react-tooltip";
import { useContext } from "react";
import { ThemeContext } from "styled-components";
import { BsDoorOpen } from "react-icons/bs";

export function Header() {
  const { user, googleSignOut } = useAuth();
  const { colors } = useContext(ThemeContext);

  return (
    <Container>
      <form>
        <MdSearch size={25} />
        <input type="search" placeholder="Pesquise o que quiser"></input>
      </form>
      <div>
        <button type="button">
          <VscBell size={25} />
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
