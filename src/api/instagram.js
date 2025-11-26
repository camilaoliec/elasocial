export const fetchInstagramPosts = async (limit = 4) => {
    const token = import.meta.env.VITE_INSTAGRAM_TOKEN;
    const userId = import.meta.env.VITE_INSTAGRAM_USER_ID;

    const res = await fetch(`https://graph.instagram.com/${userId}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${token}`);
    const data = await res.json();

    return data.data.slice(0, limit)
}
