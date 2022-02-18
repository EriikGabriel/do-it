import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";
import { Container } from "./styles";

type FirebaseUser = Record<
  string,
  {
    googleId: string;
    projects: string;
    tags: string;
  }
>;

type UsersType = {
  googleId: string;
  projects: string;
  tags: string;
};

export function Login() {
  const { user, signInWithGoogle } = useAuth();

  const [userFirebaseKey, setUserFirebaseKey] = useState("");

  const navigate = useNavigate();

  async function handleSignIn() {
    if (!user) {
      await signInWithGoogle();
    } else {
      const usersRef = database.ref("users");

      usersRef.on("value", (accountUser) => {
        const databaseUser = accountUser.val() as FirebaseUser;
        const firebaseUser = databaseUser ?? {};

        const parsedUsersUid = Object.entries(firebaseUser).map(([key, value]) => {
          return {
            key,
            googleId: value.googleId,
          };
        });

        parsedUsersUid.forEach(({ googleId, key }) => {
          console.log(`userId: ${user.id} | googleId: ${googleId} (${key}) = ${user.id === googleId}`);
          if (user.id === googleId) {
            setUserFirebaseKey(key);
          }
        });
      });

      console.log(`userFirebaseKey: ${userFirebaseKey}`);
      if (userFirebaseKey) {
        localStorage.setItem("@doit:token", userFirebaseKey);
        navigate("/");
      } else {
        const userRef = await database.ref("users").push({
          googleId: user?.id,
        });
        localStorage.setItem("@doit:token", userRef.key ?? "null");
        navigate("/");
      }
    }

    return () => {
      setUserFirebaseKey("");
    };
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
