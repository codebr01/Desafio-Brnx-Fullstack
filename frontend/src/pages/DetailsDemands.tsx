  import { useParams } from "react-router-dom";

const DetailsDemands = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Detalhes da Demanda</h1>
      <p>ID: {id}</p>
    </div>
  );
};

export default DetailsDemands;
