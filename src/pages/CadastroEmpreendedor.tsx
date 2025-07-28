import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function CadastroEmpreendedor() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [telefone, setTelefone] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const response = await fetch('http://localhost:3333/empreendedor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha, telefone }),
    })

    if (response.ok) {
      alert('Empreendedor cadastrado com sucesso!')
      navigate('/login')
    } else {
      alert('Erro ao cadastrar empreendedor')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md w-80">
        <h2 className="text-xl font-bold text-center mb-4">Cadastro de Empreendedor</h2>

        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
          required
        />

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
          required
        />

        <input
          type="password"
          placeholder="Senha (mín. 8 caracteres)"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
          minLength={8}
          required
        />

        <input
          type="text"
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <button type="submit" className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600">
          Cadastrar
        </button>
      </form>
    </div>
  )
}
