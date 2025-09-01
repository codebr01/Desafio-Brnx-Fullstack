import { X } from "lucide-react";
import type { Demanda } from "../../types";

interface Props {
  demanda: Demanda;
  novoStatus: string;
  setNovoStatus: (status: string) => void;
  fecharModal: () => void;
  salvarAlteracoes: () => void;
  formatTipo: (tipo: string) => string;
}

export default function StatusModal({ demanda, novoStatus, setNovoStatus, fecharModal, salvarAlteracoes, formatTipo }: Props) {
  return (
    <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/90 p-8 rounded-xl shadow-2xl max-w-md w-full relative border border-zinc-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-zinc-800">Alterar Status</h2>
          <button onClick={fecharModal} className="text-zinc-500 hover:text-zinc-800" aria-label="Fechar">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="text-zinc-700 mb-4 space-y-1">
          <p><strong>ID:</strong> {demanda.id}</p>
          <p><strong>Título:</strong> {demanda.titulo}</p>
          <p><strong>Tipo:</strong> {formatTipo(demanda.tipo)}</p>
          <p><strong>Data:</strong> {new Date(demanda.dataCriacao).toLocaleDateString("pt-BR")}</p>
          <p className="whitespace-pre-wrap break-words leading-relaxed"><strong>Descrição:</strong> {demanda.descricao}</p>
          <p><strong>Provedor:</strong> {demanda.provedor.nomeFantasia}</p>
        </div>
        <select
          value={novoStatus}
          onChange={(e) => setNovoStatus(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
        >
          <option value="PENDENTE">Pendente</option>
          <option value="EM_ANDAMENTO">Em andamento</option>
          <option value="CONCLUIDA">Concluída</option>
          <option value="CANCELADA">Cancelada</option>
        </select>
        <button
          onClick={salvarAlteracoes}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Alterar Status
        </button>
      </div>
    </div>
  );
}
