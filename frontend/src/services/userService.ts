import api from "./api";

export interface Usuario {
    id: number;
    email: string;
    perfil: string;
    permissoes: string;
    acesso: boolean;
}

export async function listarUsuarios(): Promise<Usuario[]> {
    const response = await api.get("/users");
    return response.data;

}

export  async function toggleAcesso(id: number): Promise<Usuario> {
    const response = await api.put(`/users/${id}/acesso`);
    return response.data;
}