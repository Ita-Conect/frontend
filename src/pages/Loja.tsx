import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

interface Loja {
  id: number
  nome: string
  email: string
  telefone: string
  descricao: string
  endereco: string
  categoria: string
}

interface Produto {
  id: number
  nome: string
  descricao: string
  preco: number
  imagem: string
  categoria: string
}

export function Loja() {
  const [loja, setLoja] = useState<Loja | null>(null)
  const [produtos, setProdutos] = useState<Produto[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const dados = localStorage.getItem('dadosUsuario')
    if (dados) {
      const info = JSON.parse(dados)

      axios.get(`http://localhost:3333/loja/empreendedor/${info.id}`)
        .then((res) => {
          setLoja(res.data)

          return axios.get(`http://localhost:3333/produto/loja/${res.data.id}`)
        })
        .then((res) => {
          setProdutos(res.data)
        })
        .catch((err) => {
          console.error('Erro:', err)
        })
    }
  }, [])

  if (!loja) {
    return <div className="p-6">Carregando dados da loja...</div>
  }

  return (
    <div className="flex flex-col items-center p-8 bg-blue-100 min-h-screen">
      <div className="bg-white shadow-md rounded p-6 w-full max-w-xl mb-6">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">Minha Loja</h1>
        <p><strong>Nome:</strong> {loja.nome}</p>
        <p><strong>Email:</strong> {loja.email}</p>
        <p><strong>Telefone:</strong> {loja.telefone}</p>
        <p><strong>Descrição:</strong> {loja.descricao}</p>
        <p><strong>Endereço:</strong> {loja.endereco}</p>
        <p><strong>Categoria:</strong> {loja.categoria}</p>

        <button
          onClick={() => navigate('/produto/cadastrar')}
          className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-white py-2 px-4 rounded w-full"
        >
          Cadastrar novo produto
        </button>
      </div>

      <div className="w-full max-w-5xl">
        <h2 className="text-xl font-semibold text-blue-800 mb-4">Produtos cadastrados</h2>
        {produtos.length === 0 ? (
          <p className="text-gray-600">Nenhum produto cadastrado ainda.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {produtos.map(produto => (
              <div key={produto.id} className="bg-white p-4 shadow rounded">
                <img
                  src={produto.imagem}
                  alt={produto.nome}
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <h3 className="text-lg font-semibold">{produto.nome}</h3>
                <p className="text-sm text-gray-600">{produto.descricao}</p>
                <p className="text-blue-600 font-bold mt-2">R$ {produto.preco.toFixed(2)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
