import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DemandTable from "../components/actions/DemandTable";
import StatusModal from "../components/actions/StatusModal";
import type { Demanda } from "../types";

const formatTipo = (tipo: string) => {
  const map: Record<string, string> = {
    DIAGNOSTICO: "Diagnóstico",
    MANUTENCAO: "Manutenção",
    CONFIGURACAO: "Configuração",
    INSTALACAO: "Instalação",
    OUTRO: "Outro"
  };
  return map[tipo] || tipo;
};

const formatStatus = (status: string) => {
  const map: Record<string, string> = {
    PENDENTE: "Pendente",
    EM_ANDAMENTO: "Em andamento",
    CONCLUIDA: "Concluída",
    CANCELADA: "Cancelada"
  };
  return map[status] || status;
};

const getStatusClasses = (status: string) => {
  switch (status) {
    case "PENDENTE":
      return "bg-yellow-100 text-yellow-800";
    case "CONCLUIDA":
      return "bg-green-100 text-green-800";
    case "EM_ANDAMENTO":
      return "bg-blue-100 text-blue-800";
    case "CANCELADA":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const TechnicalHistory = () => {

  const BASE_URL = import.meta.env.VITE_BASE_URL_API;

  const [demandas, setDemandas] = useState<Demanda[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [demandaSelecionada, setDemandaSelecionada] = useState<Demanda | null>(null);
  const [novoStatus, setNovoStatus] = useState<string>("");

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

  const abrirModal = (demanda: Demanda) => {
    setDemandaSelecionada(demanda);
    setNovoStatus(demanda.status);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setDemandaSelecionada(null);
  };

  const salvarAlteracoes = async () => {
    if (!demandaSelecionada) return;
    try {
      const res = await fetch(`${BASE_URL}/demands/${demandaSelecionada.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: novoStatus })
      });

      if (!res.ok) throw new Error("Erro ao atualizar status");

      setDemandas((prev) =>
        prev.map((d) =>
          d.id === demandaSelecionada.id ? { ...d, status: novoStatus } : d
        )
      );
      fecharModal();
    } catch (err) {
      alert("Erro ao salvar alterações");
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-2xl max-w-5xl mx-auto mt-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-zinc-800 mb-6">Ações Técnicas</h1>
        <div className="flex justify-end space-x-2">
          <Link to="/actions/history" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
            Hístorico de Ações
          </Link>
          <Link to="/actions/create" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
            Cadastrar Ação
          </Link>
        </div>
      </div>
      <Link to="/demands" className="text-blue-600 hover:underline mb-4 text-sm inline-block">
        ← Voltar
      </Link>

      {carregando && <p className="text-gray-500">Carregando...</p>}
      {erro && <p className="text-red-600">{erro}</p>}

      {!carregando && !erro && (
        demandas.length > 0 ? (
          <DemandTable
            demandas={demandas}
            onEditar={abrirModal}
            formatTipo={formatTipo}
            formatStatus={formatStatus}
            getStatusClasses={getStatusClasses}
          />
        ) : (
          <p className="text-gray-600 text-center mt-6">Não há demandas cadastradas.</p>
        )
      )}


      {modalAberto && demandaSelecionada && (
        <StatusModal demanda={demandaSelecionada} novoStatus={novoStatus} setNovoStatus={setNovoStatus} fecharModal={fecharModal} salvarAlteracoes={salvarAlteracoes} formatTipo={formatTipo} />
      )}
    </div>
  );
};

export default TechnicalHistory;
