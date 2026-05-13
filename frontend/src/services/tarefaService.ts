import api from "./api";

export interface Tarefa {
    id?: number;
    titulo: string;
    responsavel: string;
    data: string;
    status: string;
    prioridade: string;
}

export async function listarTarefas(): Promise<Tarefa[]> {
    const response = await api.get("/tarefas");
    return response.data; 
}

export async function criarTarefa(data: Tarefa): Promise<void> {
    await api.post("/tarefas", data);
}

export async function atualizarStatusTarefa(id: number, status: string): Promise<void> {
    await api.put(`/tarefas/${id}/status`, { status });
}

export async function deletarTarefa(id: number): Promise<void> {
    await api.delete(`/tarefas/${id}`);
}