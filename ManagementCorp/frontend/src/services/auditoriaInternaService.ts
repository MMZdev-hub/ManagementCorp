import api from "./api";

export interface AuditoriaInterna {
    id?: number;
    nome: string;
    departamento: string;
    responsavel: string;
    data: string;
}

export async function listarAuditoriasInternas(): Promise<AuditoriaInterna[]> {
    const response = await api.get("/auditorias-internas");
    return response.data;
}

export async function criarAuditoriaInterna(data: AuditoriaInterna): Promise<void> {
    await api.post("/auditorias-internas", data);
}