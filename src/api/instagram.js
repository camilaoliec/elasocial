export const fetchInstagramPosts = async (limit = 12) => {
  const token = import.meta.env.VITE_INSTAGRAM_TOKEN;
  const userId = import.meta.env.VITE_INSTAGRAM_USER_ID;


  const fields = 'id,caption,media_type,media_url,thumbnail_url,permalink,children{id,media_type,media_url}';

  const res = await fetch(`https://graph.instagram.com/${userId}/media?fields=${fields}&access_token=${token}`);

  const data = await res.json();

  if (data.error) {
    console.error("Erro ao buscar posts do Instagram:", data.error.message);
    return [];
  }

  return data.data.slice(0, limit)
};
// Pega username + foto do perfil
export const fetchInstagramProfile = async () => {
  const token = import.meta.env.VITE_INSTAGRAM_TOKEN;
  
  const url = `https://graph.instagram.com/me?fields=username,profile_picture_url&access_token=${token}`;

  const res = await fetch(url);
  return res.json();
};

// Pega likes + comentários de uma publicação
export const fetchPostDetails = async (mediaId) => {
  const token = import.meta.env.VITE_INSTAGRAM_TOKEN;

  const url = `https://graph.instagram.com/${mediaId}?fields=like_count,comments{id,text,username,timestamp}&access_token=${token}&limit={limit}`;

  const res = await fetch(url);
  const data = await res.json();

  // data.likes_count
  // data.comments.data -> array com {username, text}

  if (data.error) {
    console.error("Erro ao buscar post:", data.error.message);
    return [];
  }

  return data;
};

export const fetchPostLikes = async (mediaId) => {
  const token = import.meta.env.VITE_INSTAGRAM_TOKEN;

  const url = `https://graph.instagram.com/${mediaId}?fields=like_count&access_token=${token}`;
  try{
    const res = await fetch(url);
    const data = await res.json();
    if(data.error){
      console.error("Erro ao buscar likes:", data.error.message);
      return null;
    }
    return data.like_count;
  }catch (err){
    console.error("Erro na requisicao",err);
    return null;
  }
};

//todas as imagens de um carrossel
export const fetchInstagramCarousel = async (mediaId) => {
  const token = import.meta.env.VITE_INSTAGRAM_TOKEN;

  const res = await fetch(
    `https://graph.instagram.com/${mediaId}/children?fields=id,media_type,media_url&access_token=${token}`
  );

  const data = await res.json();
  return data.data; // array com todas as imagens/vídeos
};