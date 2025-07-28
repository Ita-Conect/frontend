import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export function CadastrarProduto() {
  const navigate = useNavigate()
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [preco, setPreco] = useState('')
  const [imagem, setImagem] = useState('')
  const [categoria, setCategoria] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const dados = localStorage.getItem('dadosUsuario')
    if (!dados) return alert('Usuário não autenticado')

    const { id: empreendedorId } = JSON.parse(dados)

    try {
      const lojaRes = await axios.get(`http://localhost:3333/loja/empreendedor/${empreendedorId}`)
      const lojaId = lojaRes.data.id

      await axios.post('http://localhost:3333/produto', {
        nome,
        descricao,
        preco: parseFloat(preco),
        imagem,
        categoria,
        lojaId,
      })

      alert('Produto cadastrado com sucesso!')
      navigate('/')
    } catch (err) {
      console.error('Erro ao cadastrar produto:', err)
      alert('Erro ao cadastrar produto.')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Cadastrar Produto</h2>

        <input
          type="text"
          placeholder="Nome do produto"
          value={nome}
          onChange={e => setNome(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <input
          type="number"
          placeholder="Preço"
          value={preco}
          onChange={e => setPreco(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <input
          type="text"
          placeholder="URL da imagem"
          value={imagem}
          onChange={e => setImagem(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <input
          type="text"
          placeholder="Categoria"
          value={categoria}
          onChange={e => setCategoria(e.target.value)}
          className="w-full p-2 mb-6 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded"
        >
          Cadastrar Produto
        </button>
      </form>
    </div>
  )
}
