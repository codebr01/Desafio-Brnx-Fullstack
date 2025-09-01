import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ActionTable from "../components/actions/ActionTable";
import DescriptionModal from "../components/actions/DescriptionModal";
import type { AcaoTecnica } from "../types";

const Actions = () => {

  const BASE_URL = import.meta.env.VITE_BASE_URL_API;

  const [acoes, setAcoes] = useState<AcaoTecnica[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [descricaoAberta, setDescricaoAberta] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${BASE_URL}/actions/history`)
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar ações técnicas");
        return res.json();
      })
      .then((data) => setAcoes(data))
      .catch((err) => setErro(err.message))
      .finally(() => setCarregando(false));
  }, []);

  return (
    <div className="p-6 bg-white rounded-xl shadow-2xl max-w-6xl mx-auto mt-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-zinc-800 mb-6">Ações Técnicas Registradas</h1>
      </div>
      <Link to="/actions" className="text-blue-600 hover:underline mb-4 text-sm inline-block">
        ← Voltar
      </Link>

      {carregando && <p className="text-gray-500">Carregando ações...</p>}
      {erro && <p className="text-red-600">{erro}</p>}

      {!carregando && !erro && acoes.length === 0 && (
        <p className="text-zinc-600">Nenhuma ação técnica registrada até o momento.</p>
      )}

      {!carregando && !erro && acoes.length > 0 && (
        <ActionTable acoes={acoes} setDescricaoAberta={setDescricaoAberta} />
      )}

      {descricaoAberta && (
        <DescriptionModal descricao={descricaoAberta} onClose={() => setDescricaoAberta(null)} />
      )}
    </div>
  );
};

export default Actions;