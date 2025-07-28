import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function PerfilUsuario() {
  const [usuario, setUsuario] = useState<{ nome: string, email: string } | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const usuarioLocal = localStorage.getItem('dadosUsuario')
    if (usuarioLocal) {
      setUsuario(JSON.parse(usuarioLocal))
    }
  }, [])

  if (!usuario) {
    return <div className="p-6">Carregando perfil...</div>
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">Perfil do Usuário</h1>

        <div className="mb-4">
          <p className="text-gray-700"><span className="font-semibold">Nome:</span> {usuario.nome}</p>
          <p className="text-gray-700"><span className="font-semibold">Email:</span> {usuario.email}</p>
        </div>

        <button
          onClick={() => navigate('/')}
          className="mt-6 w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Voltar à Home
        </button>
      </div>
    </div>
  )
}
