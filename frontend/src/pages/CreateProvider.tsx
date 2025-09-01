import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateProvider = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL_API;

  const [nomeFantasia, setNomeFantasia] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/providers/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nomeFantasia, responsavel, telefone, email }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Erro ao criar provedor");
        return;
      }

      toast.success("Provedor criado com sucesso!");
      setTimeout(() => {
        navigate("/demands");
      }, 1500);
    } catch (err) {
      console.error(err);
      toast.error("Erro ao enviar dados");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-2xl rounded-lg p-8 mt-10">
      <ToastContainer />
      <Link to="/demands" className="text-blue-600 hover:underline mb-4 text-sm inline-block">
        ← Voltar
      </Link>

      <h2 className="text-2xl font-bold text-gray-900 mb-6">Novo Provedor</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Nome Fantasia</label>
          <input
            type="text"
            value={nomeFantasia}
            onChange={(e) => setNomeFantasia(e.target.value)}
            placeholder="Nome Fantasia"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Responsável</label>
          <input
            type="text"
            value={responsavel}
            onChange={(e) => setResponsavel(e.target.value)}
            placeholder="Nome do responsável"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
          <input
            type="tel"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            placeholder="(XX) XXXXX-XXXX"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@provedor.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
        >
          Criar Provedor
        </button>
      </form>
    </div>
  );
};

export default CreateProvider;
