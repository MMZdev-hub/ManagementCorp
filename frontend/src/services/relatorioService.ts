import api from "./api";

export interface DadosGargalo {
    mes: string;
    tempoExecução: number;
    taxaRetrabalho: number;
    gargalosDetectados: number;
}

export interface Stats {
    tempoMedio: number;
    taxaRetrabalho: number;
    gargalos: number;
}

export async function listarRelatorios(): Promise<DadosGargalo[]> {
    const response = await api.get("/relatorios");
    return response.data;
}

export async function buscarStats(): Promise<Stats> {
    const response = await api.get("/relatorios/stats");
    return response.data;
}