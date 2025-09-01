import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Provedor {
  id: number;
  nomeFantasia: string;
  responsavel: string;
  telefone: string;
  email: string;
  criadoEm: string;
}

const Providers = () => {

  const BASE_URL = import.meta.env.VITE_BASE_URL_API;

  const [provedores, setProvedores] = useState<Provedor[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${BASE_URL}/providers`)
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar provedores");
        return res.json();
      })
      .then((data) => {
        setProvedores(data);
        setCarregando(false);
      })
      .catch((err) => {
        setErro(err.message);
        setCarregando(false);
      });
  }, []);

  return (
    <div className="p-6 bg-white rounded-xl shadow-2xl max-w-5xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-zinc-800">Lista de Provedores</h1>
        <Link to="/demands" className="text-blue-600 hover:underline mb-4 text-sm inline-block">
          ← Voltar
        </Link>
      </div>

      {carregando && <p className="text-gray-500">Carregando...</p>}
      {erro && <p className="text-red-600">{erro}</p>}

      {!carregando && !erro && (
        <>
          {provedores.length === 0 ? (
            <p className="text-gray-500">Nenhum provedor encontrado.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-zinc-600 border-b">
                  <tr>
                    <th className="px-4 py-2">Nome Fantasia</th>
                    <th className="px-4 py-2">Responsável</th>
                    <th className="px-4 py-2">Telefone</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Criado em</th>
                  </tr>
                </thead>
                <tbody>
                  {provedores.map((p) => (
                    <tr key={p.id} className="border-b hover:bg-zinc-50 transition">
                      <td className="px-4 py-2">{p.nomeFantasia}</td>
                      <td className="px-4 py-2">{p.responsavel}</td>
                      <td className="px-4 py-2">{p.telefone}</td>
                      <td className="px-4 py-2">{p.email}</td>
                      <td className="px-4 py-2">
                        {new Date(p.criadoEm).toLocaleDateString("pt-BR")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Providers;
