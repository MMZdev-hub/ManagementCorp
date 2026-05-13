import api from "./api";

export interface Auditoria {
    id?: number;
    nome: string;
    dataInicio: string;
    responsavel: string;
    prazo: string;
    setor: string;
    objetivo: string;
    status?: string;
}

export interface StatsArea {
    area: string;
    concluidas: number;
    andamento: number;
    pendentes: number;
}

export async function listarAuditorias(): Promise<Auditoria[]> {
    const response = await api.get("/auditorias");
    return response.data;
}

export async function criarAuditoria(data: Auditoria): Promise<void> {
    await api.post("/auditorias", data);
}

export async function listarHistorico(ordem?: string): Promise<Auditoria[]> {
    const params = ordem ? `?ordem=${ordem}` : "";
    const response = await api.get(`/auditorias/historico${params}`);
    return response.data;
}

export async function buscarStatsPorArea(): Promise<StatsArea[]> {
    const response = await api.get("/auditoria/stats/areas");
    return response.data;
}

export async function atualizarStatusAuditoria(id: number, status: string): Promise<void> {
    await api.put(`/auditorias/${id}/status`, { status });    
}

export async function deletarAuditoria(id: number): Promise<void> {
    await api.delete(`/auditorias/${id}`);
}

export async function listarAuditoriasPorResponsavel(nome: string): Promise<Auditoria[]> {
    const response = await api.get(`/auditorias/responsavel/${encodeURIComponent(nome)}`);
    return response.data;
}