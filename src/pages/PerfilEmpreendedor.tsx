import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

interface Empreendedor {
  id: string
  nome: string
  email: string
  telefone: string
}

export function PerfilEmpreendedor() {
  const navigate = useNavigate()
  const [empreendedor, setEmpreendedor] = useState<Empreendedor | null>(null)
  const [temLoja, setTemLoja] = useState(false)

  useEffect(() => {
    const dados = localStorage.getItem('dadosUsuario')
    if (dados) {
      const info = JSON.parse(dados)
      setEmpreendedor(info)

      axios.get(`http://localhost:3333/loja/empreendedor/${info.id}`)
        .then((res) => {
          if (res.data) {
            setTemLoja(true)
          }
        })
        .catch(() => {
          setTemLoja(false)
        })
    }
  }, [])

  if (!empreendedor) {
    return <div className="p-6">Carregando...</div>
  }

  return (
    <div className="flex flex-col items-center p-8 bg-blue-100 min-h-screen">
      <div className="bg-white shadow-md rounded p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">Perfil do Empreendedor</h1>
        <p><strong>Nome:</strong> {empreendedor.nome}</p>
        <p><strong>Email:</strong> {empreendedor.email}</p>
        <p><strong>Telefone:</strong> {empreendedor.telefone}</p>

        <div className="mt-6">
          {!temLoja ? (
            <button
              className="bg-yellow-400 hover:bg-yellow-500 text-white py-2 px-4 rounded w-full"
              onClick={() => navigate('/cadastro-loja')}
            >
              Cadastrar loja
            </button>
          ) : (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
              onClick={() => navigate('/loja')}
            >
              Ver loja
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
