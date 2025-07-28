import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const navigate = useNavigate()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:3333/login', {
        email,
        senha
      })

      const { tipo, dados } = response.data

      localStorage.setItem('tipoUsuario', tipo)
      localStorage.setItem('dadosUsuario', JSON.stringify(dados))

      if (tipo === 'usuario') {
        navigate('/')
      } else if (tipo === 'empreendedor') {
        navigate('/')
      }
    } catch (err) {
      setErro('Email ou senha inválidos')
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-blue-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-blue-700">Login</h1>

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        {erro && <p className="text-red-500 mb-4">{erro}</p>}

        <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 w-full py-2 rounded text-white font-semibold">
          Entrar
        </button>
      </form>
    </div>
  )
}
