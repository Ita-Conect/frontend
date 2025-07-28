import { useNavigate } from "react-router-dom"

export function EscolherAcesso() {
  const navigate = useNavigate()

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-blue-700 mb-8">Como deseja continuar?</h1>

      <div className="space-y-4 w-full max-w-sm">
        <button
          onClick={() => navigate("/cadastro-usuario")}
          className="w-full py-3 px-6 bg-yellow-400 text-white font-semibold rounded-2xl shadow hover:bg-yellow-500 transition"
        >
          Criar conta como usuário
        </button>

        <button
          onClick={() => navigate("/cadastro-empreendedor")}
          className="w-full py-3 px-6 bg-yellow-400 text-white font-semibold rounded-2xl shadow hover:bg-yellow-500 transition"
        >
          Criar conta como empreendedor
        </button>

        <button
          onClick={() => navigate("/login")}
          className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-2xl shadow hover:bg-blue-700 transition"
        >
          Já tenho conta (Login)
        </button>
      </div>
    </main>
  )
}
