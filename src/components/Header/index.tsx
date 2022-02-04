/* eslint-disable jsx-a11y/img-redundant-alt */
import { Container } from "./styles";
import { VscBell } from "react-icons/vsc";
import { MdSearch } from "react-icons/md";

export function Header() {
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
          <img
            src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            alt="Profile picture"
          />
        </div>
      </div>
    </Container>
  );
}
