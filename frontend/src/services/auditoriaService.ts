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

export async function ListaAuditorias(): Promise<Auditoria[]> {
    const response = await api.get("/auditorias");
    return response.data;
}

export async function criarAuditoria(data: Auditoria): Promise<void> {
    await api.post("/auditorias", data);
}