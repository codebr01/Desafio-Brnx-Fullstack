import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormField } from "../components/home/FormField";
import { TextAreaField } from "../components/home/TextAreaField";
import { SelectField } from "../components/home/SelectField";

interface Provedor {
  id: number;
  nomeFantasia: string;
}

const CreateDemand = () => {

  const BASE_URL = import.meta.env.VITE_BASE_URL_API;

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState("");
  const [provedorId, setProvedorId] = useState("");
  const [provedores, setProvedores] = useState<Provedor[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BASE_URL}/providers`)
      .then((res) => res.json())
      .then((data) => setProvedores(data))
      .catch((err) => {
        console.error("Erro ao buscar provedores:", err);
        alert("Erro ao carregar lista de provedores");
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/demands/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, descricao, tipo, provedorId: Number(provedorId) }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Erro ao criar demanda");
        return;
      }

      alert("Demanda criada com sucesso!");
      navigate("/demands");
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      alert("Erro ao criar demanda");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-2xl rounded-lg p-8 mt-10">
      <Link to="/demands" className="text-blue-600 hover:underline mb-4 text-sm inline-block">
        ← Voltar
      </Link>

      <h2 className="text-2xl font-bold text-gray-900 mb-6">Nova Demanda</h2>

      <form onSubmit={handleSubmit}>
        <FormField
          label="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Tópico do problema"
        />

        <TextAreaField
          label="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Descreva o problema em detalhes"
        />

        <SelectField
          label="Tipo"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          options={[
            { value: "DIAGNOSTICO", label: "Diagnóstico" },
            { value: "MANUTENCAO", label: "Manutenção" },
            { value: "CONFIGURACAO", label: "Configuração" },
            { value: "INSTALACAO", label: "Instalação" },
            { value: "OUTRO", label: "Outro" },
          ]}
        />

        <SelectField
          label="Provedor"
          value={provedorId}
          onChange={(e) => setProvedorId(e.target.value)}
          options={provedores.map((p) => ({
            value: p.id.toString(),
            label: p.nomeFantasia,
          }))}
        />

        <button
          type="submit"
          disabled={provedores.length === 0}
          className={`w-full font-semibold py-2 px-4 rounded-md transition ${provedores.length === 0
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
        >
          Criar Demanda
        </button>

      </form>
    </div>
  );
};

export default CreateDemand;
