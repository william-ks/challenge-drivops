import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import "./style.css";

export default function LoginPage() {
  const { login, token } = useUser();

  const navigate = useNavigate("/");

  const email = useRef(null);
  const pass = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = {
      email: email.current.value,
      pass: pass.current.value,
    };

    if (!email.current.value || !pass.current.value) return;

    const res = await login(form);

    if (res) {
      alert("Email ou senha incorretos");
      return;
    }

    navigate("/dashboard");
  };

  return (
    <main className="styled loginPage">
      <div className="center">
        <div className="box">
          <h1 className="title">Seja bem vindo!</h1>
          <p className="description">Faça login para continuar.</p>

          <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="email">
              <p className="inputDescription">Email:</p>
              <input
                className="inputs"
                type="email"
                ref={email}
                id="email"
                required
              />
            </label>

            <label htmlFor="password">
              <p className="inputDescription">Senha:</p>
              <input
                className="inputs"
                type="password"
                ref={pass}
                id="password"
                required
              />
            </label>

            <button>Entrar</button>
          </form>
        </div>
      </div>
    </main>
  );
}
