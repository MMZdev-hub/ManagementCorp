import api from "./api";

export interface PlanoAcao {
    id?: number;
    nome: string;
    responsavel: string;
    dataCriacao: string;
    prazo: string;
    status: string;
}

export async function listarPlanos(): Promise<PlanoAcao[]> {
    const response = await api.get("/planos");
    return response.data;
}

export async function criarPlano(data: PlanoAcao): Promise<void> {
    await api.post("/planos", data);
}

export async function atualizarStatus(id: number, status: string): Promise<void> {
    await api.put(`/planos/${id}/status`, { status });
}