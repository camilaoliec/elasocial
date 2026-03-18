import { useEffect, useState } from "react";
import { fetchPostDetails } from "../../api/instagram";
import Likes from "../../assets/icon_like.svg";

const IgLikes = ({ mediaId }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (!mediaId) return;

    const load = async () => {
      try {
        const data = await fetchPostDetails(mediaId);
        console.log("Dados de detalhes do Post recebidos:", data);
        setDetails(data);
      } catch {
        setError("Erro ao carregar comentários");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [mediaId]);

  if (loading) return <p style={{ color: "#777" }}>Carregando comentários...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const likes = details.like_count || 0;
  const comments = details.comments?.data || [];

  return (
    <div className="details">
      {/* Likes */}
      <div className="likes">
        <img src={Likes} alt="like icon" />
        <p>Curtido por {likes} pessoas</p>
      </div>

      Comentários:
      <div className="comments">
        {comments.map((c) => (
          <div key={c.id}>
            <strong>@{c.username}</strong>
            <p>{c.text}</p>
          </div>
        ))}

        {comments.length === 0 && (
          <p style={{ color: "#555" }}>Nenhum comentário ainda.</p>
        )}
      </div>

    </div>
  );
};

export default IgLikes;
