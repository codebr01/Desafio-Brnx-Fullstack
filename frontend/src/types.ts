export interface Demanda {
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

export interface Provedor {
  id: number;
  nomeFantasia: string;
}

export interface AcaoTecnica {
  id: number;
  descricao: string;
  tecnico: string;
  dataExecucao: string;
  demanda: {
    titulo: string;
    tipo: string;
    status: string;
    provedor: {
      nomeFantasia: string;
    };
  };
}
