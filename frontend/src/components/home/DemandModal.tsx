import { X } from "lucide-react";
import type { Demanda } from "../../types";

interface Props {
  demanda: Demanda;
  fechar: () => void;
}

export function DemandModal({ demanda, fechar }: Props) {
  return (
    <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/90 p-8 rounded-xl shadow-2xl max-w-xl w-full relative border border-zinc-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-zinc-800">Descrição</h2>
          <button onClick={fechar} className="text-zinc-500 hover:text-zinc-800" aria-label="Fechar">
            <X className="w-6 h-6" />
          </button>
        </div>
        <p className="text-zinc-700 whitespace-pre-wrap break-words leading-relaxed">
          {demanda.descricao || "Sem descrição fornecida."}
        </p>
      </div>
    </div>
  );
}
