import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

interface Demanda {
  id: number;
  titulo: string;
  tipo: string;
  status: string;
  provedor: {
    nomeFantasia: string;
  };
}

const CreateAction = () => {

  const BASE_URL = import.meta.env.VITE_BASE_URL_API;

  const [demandas, setDemandas] = useState<Demanda[]>([]);
  const [descricao, setDescricao] = useState("");
  const [tecnico, setTecnico] = useState("");
  const [demandaId, setDemandaId] = useState<number | "">("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BASE_URL}/demands`)
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar demandas");
        return res.json();
      })
      .then((data) => setDemandas(data))
      .catch((err) => setErro(err.message))
      .finally(() => setCarregando(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!descricao || !tecnico || !demandaId) return;

    try {

      console.log(demandaId);

      const res = await fetch(`${BASE_URL}/actions/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ descricao, tecnico, demandaId }),
      });

      if (!res.ok) throw new Error("Erro ao cadastrar ação");

      navigate("/actions");
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar ação técnica.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-2xl max-w-3xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-zinc-800 mb-6">Cadastrar Ação Técnica</h1>
      <Link to="/actions" className="text-blue-600 hover:underline mb-4 text-sm inline-block">
        ← Voltar
      </Link>

      {carregando && <p className="text-gray-500">Carregando demandas...</p>}
      {erro && <p className="text-red-600">{erro}</p>}

      {!carregando && !erro && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-zinc-700 mb-1">Descrição da Ação</label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block font-medium text-zinc-700 mb-1">Nome do Técnico</label>
            <input
              type="text"
              value={tecnico}
              onChange={(e) => setTecnico(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-zinc-700 mb-1">Demanda Relacionada</label>
            <select
              value={demandaId}
              onChange={(e) => setDemandaId(Number(e.target.value))}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            >
              <option value="">Selecione uma demanda</option>
              {demandas.map((d) => (
                <option key={d.id} value={d.id}>
                  # {d.id} | {d.titulo} | ({d.tipo}) | {d.provedor.nomeFantasia}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={demandas.length === 0}
            className={`px-4 py-2 rounded text-white transition ${demandas.length === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
              }`}
          >
            Registrar Ação Técnica
          </button>

        </form>
      )}
    </div>
  );
};

export default CreateAction;
