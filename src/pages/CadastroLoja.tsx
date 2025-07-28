import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export function CadastroLoja() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [endereco, setEndereco] = useState('')
  const [descricao, setDescricao] = useState('')
  const [categoria, setCategoria] = useState('')

  const navigate = useNavigate()

  const dados = localStorage.getItem('dadosUsuario')
  const empreendedorId = dados ? JSON.parse(dados).id : null

  async function handleCadastroLoja(e: React.FormEvent) {
    e.preventDefault()

    if (!empreendedorId) {
      alert('Empreendedor não identificado.')
      return
    }

    try {
      await axios.post('http://localhost:3333/lojas', {
        nome,
        email,
        telefone,
        endereco,
        descricao,
        categoria,
        empreendedorId: Number(empreendedorId),
      })

      alert('Loja cadastrada com sucesso!')
      navigate('/')
    } catch (err) {
      console.error(err)
      alert('Erro ao cadastrar loja.')
    }
  }

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Cadastro de Loja</h1>
      <form onSubmit={handleCadastroLoja} className="space-y-4">
        <input
          type="text"
          placeholder="Nome da loja"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full border border-gray-300 rounded p-2"
          required
        />
        <input
          type="email"
          placeholder="E-mail da loja"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded p-2"
          required
        />
        <input
          type="text"
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          className="w-full border border-gray-300 rounded p-2"
          required
        />
        <input
          type="text"
          placeholder="Endereço"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
          className="w-full border border-gray-300 rounded p-2"
          required
        />
        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="w-full border border-gray-300 rounded p-2"
          required
        />
        <input
          type="text"
          placeholder="Categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="w-full border border-gray-300 rounded p-2"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded p-2 hover:bg-blue-700"
        >
          Cadastrar Loja
        </button>
      </form>
    </div>
  )
}
