import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Container } from "./styles";

export function Login() {
  const { user, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  async function handleSignIn() {
    if (!user) {
      await signInWithGoogle();
    }

    localStorage.setItem("@doit:token", user?.id ?? "");

    navigate("/");
  }

  return (
    <Container>
      <h1>
        Organize tudo com o <span>Do-it!</span>
      </h1>
      <div>
        <button type="button" onClick={handleSignIn}>
          <FaGoogle size={20} />
          Entrar com o Google
        </button>
      </div>
    </Container>
  );
}
