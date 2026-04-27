export function isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
        const payload = token.split(".")[1];
        const decoded = JSON.parse(atob(payload));
        const expiracao = decoded.exp * 1000;
        
        if (Date.now() > expiracao) {
            localStorage.removeItem("token");
            return false;
        }

        return true;
    } catch {
        localStorage.removeItem("token");
        return false;
    }
}