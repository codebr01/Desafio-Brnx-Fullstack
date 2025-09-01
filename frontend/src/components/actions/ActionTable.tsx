import type { AcaoTecnica } from "../../types";
import { formatStatus, formatTipo } from "../utils/formatters";

interface Props {
  acoes: AcaoTecnica[];
  setDescricaoAberta: (descricao: string) => void;
}

export default function ActionTable({ acoes, setDescricaoAberta }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="text-zinc-600 border-b">
          <tr>
            <th className="px-4 py-2">Descrição</th>
            <th className="px-4 py-2">Técnico</th>
            <th className="px-4 py-2">Data</th>
            <th className="px-4 py-2">Demanda</th>
            <th className="px-4 py-2">Tipo</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Provedor</th>
          </tr>
        </thead>
        <tbody>
          {acoes.map((acao) => (
            <tr key={acao.id} className="border-b hover:bg-zinc-50 transition">
              <td className="px-4 py-2">
                <button onClick={() => setDescricaoAberta(acao.descricao)} className="text-blue-600 hover:underline">
                  Ver descrição
                </button>
              </td>
              <td className="px-4 py-2">{acao.tecnico}</td>
              <td className="px-4 py-2">{new Date(acao.dataExecucao).toLocaleDateString("pt-BR")}</td>
              <td className="px-4 py-2">{acao.demanda.titulo}</td>
              <td className="px-4 py-2">{formatTipo(acao.demanda.tipo)}</td>
              <td className="px-4 py-2">{formatStatus(acao.demanda.status)}</td>
              <td className="px-4 py-2">{acao.demanda.provedor.nomeFantasia}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
