import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { PerfilUsuario } from "./pages/PerfilUsuario"
import { PerfilEmpreendedor } from "./pages/PerfilEmpreendedor"
import { CadastroLoja } from "./pages/CadastroLoja"
import { Loja } from "./pages/Loja"
import { CadastrarProduto } from "./pages/CadastrarProduto"
import { CadastroUsuario } from './pages/CadastroUsuario'
import { CadastroEmpreendedor } from './pages/CadastroEmpreendedor'
import { EscolherAcesso } from "./pages/EscolherAcesso"
import { ProdutoDetalhes } from './pages/ProdutoDetalhes'
import { Layout } from './components/Layout'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/perfil-usuario" element={<Layout><PerfilUsuario /></Layout>} />
        <Route path="/perfil-empreendedor" element={<Layout><PerfilEmpreendedor /></Layout>} />
        <Route path="/cadastro-loja" element={<Layout><CadastroLoja /></Layout>} />
        <Route path="/loja" element={<Layout><Loja /></Layout>} />
        <Route path="/produto/cadastrar" element={<Layout><CadastrarProduto /></Layout>} />
        <Route path="/cadastro-usuario" element={<Layout><CadastroUsuario /></Layout>} />
        <Route path="/cadastro-empreendedor" element={<Layout><CadastroEmpreendedor /></Layout>} />
        <Route path="/acesso" element={<Layout><EscolherAcesso /></Layout>} />
        <Route path="/produto/:id" element={<Layout><ProdutoDetalhes /></Layout>} />
      </Routes>
    </BrowserRouter>
  )
}
