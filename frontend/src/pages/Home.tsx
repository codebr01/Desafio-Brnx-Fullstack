import { useEffect, useState } from "react";
import { DemandHeader } from "../components/home/DemandHeader";
import { DemandFilters } from "../components/home/DemandFilters";
import { DemandTable } from "../components/home/DemandTable";
import { DemandModal } from "../components/home/DemandModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


interface Demanda {
  id: string;
  titulo: string;
  tipo: string;
  status: string;
  descricao: string;
  provedor: {
    nomeFantasia: string;
  };
  dataCriacao: string;
}

interface Provedor {
  id: number;
  nomeFantasia: string;
}

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

const Home = () => {

  const BASE_URL = import.meta.env.VITE_BASE_URL_API;

  const [demandas, setDemandas] = useState<Demanda[]>([]);
  const [provedores, setProvedores] = useState<Provedor[]>([]);
  const [statusSelecionado, setStatusSelecionado] = useState<string>("");
  const [provedorSelecionado, setProvedorSelecionado] = useState<string>("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [demandaSelecionada, setDemandaSelecionada] = useState<Demanda | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const demandasRes = await fetch(`${BASE_URL}/demands`);
        if (!demandasRes.ok) throw new Error("Erro ao buscar demandas");
        const demandasData = await demandasRes.json();

        const provedoresRes = await fetch(`${BASE_URL}/providers`);
        if (!provedoresRes.ok) throw new Error("Erro ao buscar provedores");
        const provedoresData = await provedoresRes.json();

        setDemandas(demandasData);
        setProvedores(provedoresData);
      } catch (err: any) {
        setErro(err.message);
      } finally {
        setCarregando(false);
      }
    };

    fetchData();
  }, []);

  const demandasFiltradas = demandas.filter((d) => {
    return (
      (!statusSelecionado || d.status === statusSelecionado) &&
      (!provedorSelecionado || d.provedor?.nomeFantasia === provedorSelecionado)
    );
  });

  const abrirModal = (demanda: Demanda) => {
    setDemandaSelecionada(demanda);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setDemandaSelecionada(null);
  };

  return (

    <div className="p-6 bg-white rounded-xl shadow-2xl max-w-5xl mx-auto mt-10">
      <ToastContainer />
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-zinc-800">Listagem de Demandas</h1>
        <DemandFilters
          provedores={provedores}
          statusSelecionado={statusSelecionado}
          setStatusSelecionado={setStatusSelecionado}
          provedorSelecionado={provedorSelecionado}
          setProvedorSelecionado={setProvedorSelecionado}
        />
      </div>


      <DemandHeader />

      {carregando && <p className="text-gray-500">Carregando...</p>}
      {erro && <p className="text-red-600">{erro}</p>}

      {!carregando && !erro && (
        <>
          {demandasFiltradas.length === 0 ? (
            <p className="text-center text-gray-500 py-6">Não há demandas cadastradas.</p>
          ) : (
            <DemandTable
              demandas={demandasFiltradas}
              abrirModal={abrirModal}
              formatTipo={formatTipo}
              formatStatus={formatStatus}
              getStatusClasses={getStatusClasses}
            />
          )}
        </>
      )}

      {modalAberto && demandaSelecionada && (
        <DemandModal demanda={demandaSelecionada} fechar={fecharModal} />
      )}

    </div>
  );
};

export default Home;
