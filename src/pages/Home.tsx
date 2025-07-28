import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Produto {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
  categoria: string;
}

export function Home() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3333/produto")
      .then(response => response.json())
      .then(data => setProdutos(data))
      .catch(error => {
        console.error("Erro ao buscar produtos:", error);
      });
  }, []);

  const handleVerDetalhes = (id: string) => {
    navigate(`/produto/${id}`);
  };

  return (
    <main className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-700 mb-2">
        Seja bem-vindo(a) ao ItaConnect
      </h1>

      <p className="text-gray-700 mb-6 max-w-4xl">
        O site ItaConnect é responsável por divulgar e ajudar empreendedores locais do município
        de Itapajé a ter mais visibilidade na região, com o objetivo de aumentar suas vendas e a
        lucratividade. Como você pode ver, abaixo temos os produtos disponíveis e detalhes de cada
        um, para que seja possível entrar em contato com o responsável. Aproveite!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {produtos.map(produto => (
          <div
            key={produto.id}
            className="bg-white shadow-md rounded-2xl p-4 border border-yellow-300 hover:shadow-lg transition"
          >
            <img
              src={produto.imagem}
              alt={produto.nome}
              className="w-full h-40 object-cover rounded-xl mb-4"
            />
            <h2 className="text-xl font-semibold text-blue-800">{produto.nome}</h2>
            <p className="text-gray-600 mb-2">{produto.descricao}</p>
            <span className="text-yellow-600 font-bold text-lg">
              R$ {produto.preco.toFixed(2)}
            </span>
            <p className="text-sm text-blue-600 mt-2">
              Categoria: {produto.categoria}
            </p>

            <button
              onClick={() => handleVerDetalhes(produto.id)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Ver detalhes
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
