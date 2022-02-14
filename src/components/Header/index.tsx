/* eslint-disable jsx-a11y/img-redundant-alt */
import { Container } from "./styles";
import { VscBell } from "react-icons/vsc";
import { MdSearch } from "react-icons/md";
import { useAuth } from "../../hooks/useAuth";

export function Header() {
  const { user } = useAuth();

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
        <div>
          <img src={user?.avatar} alt="Profile picture" referrerPolicy="no-referrer" />
        </div>
      </div>
    </Container>
  );
}
