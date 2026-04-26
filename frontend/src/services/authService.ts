export function getEmailFromToken(): string {
    const token = localStorage.getItem("token");
    if (!token) return "Usuário";

    try {
        const payload = token.split(".")[1];
        const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
        const decoded = JSON.parse(decodeURIComponent(escape(atob(base64))));
        return decoded.nome || decoded.sub || "Usuário";
    } catch {
        return "Usuário";
    }
}