import { Link } from "react-router-dom";

export function DemandHeader() {
  return (
    <div className="flex justify-end space-x-2">
      <Link to="/providers" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
        Ver Provedores
      </Link>
      <Link to="/demands/create" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
        Nova Demanda
      </Link>
      <Link to="/providers/create" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
        Cadastrar Provedor
      </Link>
      <Link to="/actions" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
        Ação Técnicas
      </Link>
    </div>
  );
}
