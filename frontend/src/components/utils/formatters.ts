export const formatTipo = (tipo: string) => ({
  DIAGNOSTICO: "Diagnóstico",
  MANUTENCAO: "Manutenção",
  CONFIGURACAO: "Configuração",
  INSTALACAO: "Instalação",
  OUTRO: "Outro"
}[tipo] || tipo);

export const formatStatus = (status: string) => ({
  PENDENTE: "Pendente",
  EM_ANDAMENTO: "Em andamento",
  CONCLUIDA: "Concluída",
  CANCELADA: "Cancelada"
}[status] || status);

export const getStatusClasses = (status: string) => ({
  PENDENTE: "bg-yellow-100 text-yellow-800",
  CONCLUIDA: "bg-green-100 text-green-800",
  EM_ANDAMENTO: "bg-blue-100 text-blue-800",
  CANCELADA: "bg-red-100 text-red-800"
}[status] || "bg-gray-100 text-gray-800");
