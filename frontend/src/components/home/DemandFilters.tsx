interface Props {
  provedores: { id: number; nomeFantasia: string }[];
  statusSelecionado: string;
  setStatusSelecionado: (value: string) => void;
  provedorSelecionado: string;
  setProvedorSelecionado: (value: string) => void;
}

export function DemandFilters({
  provedores,
  statusSelecionado,
  setStatusSelecionado,
  provedorSelecionado,
  setProvedorSelecionado
}: Props) {
  return (
    <div className="flex gap-2 w-full sm:w-auto flex-wrap">
      <select
        value={provedorSelecionado}
        onChange={(e) => setProvedorSelecionado(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2"
      >
        <option value="">Provedor</option>
        {provedores.map((p) => (
          <option key={p.id} value={p.nomeFantasia}>
            {p.nomeFantasia}
          </option>
        ))}
      </select>

      <select
        value={statusSelecionado}
        onChange={(e) => setStatusSelecionado(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2"
      >
        <option value="">Status</option>
        <option value="PENDENTE">Pendente</option>
        <option value="CONCLUIDA">Concluída</option>
        <option value="EM_ANDAMENTO">Em andamento</option>
        <option value="CANCELADA">Cancelada</option>
      </select>
    </div>
  );
}
