import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";
import { Container } from "./styles";

export function Login() {
  const { user, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  async function handleSignIn() {
    if (!user) {
      await signInWithGoogle();
    }

    const userRef = await database.ref("users").push("");

    localStorage.setItem("@doit:token", userRef.key ?? "");

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
