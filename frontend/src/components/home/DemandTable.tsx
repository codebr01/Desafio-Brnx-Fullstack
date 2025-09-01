import type { Demanda } from "../../types";

interface Props {
  demandas: Demanda[];
  abrirModal: (demanda: Demanda) => void;
  formatTipo: (tipo: string) => string;
  formatStatus: (status: string) => string;
  getStatusClasses: (status: string) => string;
}

export function DemandTable({ demandas, abrirModal, formatTipo, formatStatus, getStatusClasses }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="text-zinc-600 border-b">
          <tr>
            <th className="px-4 py-2">Título</th>
            <th className="px-4 py-2">Tipo</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Provedor</th>
            <th className="px-4 py-2">Data</th>
            <th className="px-4 py-2">Descrição</th>
          </tr>
        </thead>
        <tbody>
          {demandas.map((d) => (
            <tr key={d.id} className="border-b hover:bg-zinc-50 transition">
              <td className="px-4 py-2">{d.titulo}</td>
              <td className="px-4 py-2">{formatTipo(d.tipo)}</td>
              <td className="px-4 py-2">
                <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusClasses(d.status)}`}>
                  {formatStatus(d.status)}
                </span>
              </td>
              <td className="px-4 py-2">{d.provedor?.nomeFantasia}</td>
              <td className="px-4 py-2">{new Date(d.dataCriacao).toLocaleDateString("pt-BR")}</td>
              <td className="px-4 py-2">
                <button onClick={() => abrirModal(d)} className="text-blue-600 hover:underline text-sm">
                  Ver Descrição
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
