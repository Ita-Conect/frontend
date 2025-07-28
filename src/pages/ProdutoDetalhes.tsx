import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
  categoria: string;
  loja: {
    nome: string;
    telefone: string;
    email: string;
  };
}

export function ProdutoDetalhes() {
  const { id } = useParams();
  const [produto, setProduto] = useState<Produto | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3333/produto/${id}`)
      .then(response => response.json())
      .then(data => setProduto(data))
      .catch(error => console.error("Erro ao carregar detalhes do produto:", error));
  }, [id]);

  if (!produto) return <p className="p-4">Carregando...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <img
        src={produto.imagem}
        alt={produto.nome}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />

      <h1 className="text-3xl font-bold text-blue-800 mb-2">{produto.nome}</h1>
      <p className="text-gray-700 text-lg mb-4">{produto.descricao}</p>
      <p className="text-yellow-600 text-xl font-semibold mb-2">R$ {produto.preco.toFixed(2)}</p>
      <p className="text-sm text-blue-700 mb-4">Categoria: {produto.categoria}</p>

      <div className="mt-6 border-t pt-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">Informações da Loja</h2>
        <p><span className="font-medium">Nome:</span> {produto.loja.nome}</p>
        <p><span className="font-medium">Telefone:</span> {produto.loja.telefone}</p>
        <p><span className="font-medium">Email:</span> {produto.loja.email}</p>
      </div>
    </div>
  );
}
