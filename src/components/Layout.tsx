import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logoitaconnect1.png";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState<string | null>(null);

  useEffect(() => {
    const tipo = localStorage.getItem("tipoUsuario");
    const dados = localStorage.getItem("dadosUsuario");

    if (tipo && dados) {
      setIsLoggedIn(true);
      setTipoUsuario(tipo);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("tipoUsuario");
    localStorage.removeItem("dadosUsuario");
    setIsLoggedIn(false);
    navigate("/");
  }

  function handleLoginRedirect() {
    navigate("/acesso");
  }

  function handlePerfilRedirect() {
    if (tipoUsuario === "usuario") {
      navigate("/perfil-usuario");
    } else if (tipoUsuario === "empreendedor") {
      navigate("/perfil-empreendedor");
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-blue-600 p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Logo ItaConnect" className="h-12" />
          <div>
            <h1 className="text-white text-2xl font-bold">ItaConnect</h1>
            <p className="text-white text-sm">Seja visto e lembrado!</p>
          </div>
        </div>

        <div className="space-x-4">
          {!isLoggedIn ? (
            <button
              onClick={handleLoginRedirect}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded"
            >
              Entrar / Criar Conta
            </button>
          ) : (
            <>
              <button
                onClick={handlePerfilRedirect}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded"
              >
                Meu Perfil
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Sair
              </button>
            </>
          )}
        </div>
      </header>

      <main className="p-6">{children}</main>
    </div>
  );
}
