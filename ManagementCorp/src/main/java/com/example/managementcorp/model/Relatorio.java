package com.example.managementcorp.model;

import jakarta.persistence.*;

@Entity
@Table(name = "relatorios")
public class Relatorio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String mes;
    private int tempoExecucao;
    private int taxaRetrabalho;
    private int gargalosDetectados;

    public Long getId() { return id; }
    public void setID(Long id) { this.id = id; }

    public String getMes() { return mes; }
    public void setMes(String mes) { this.mes = mes; }

    public int getTempoExecucao() { return tempoExecucao; }
    public void setTempoExecucao(int tempoExecucao) { this.tempoExecucao = tempoExecucao; }

    public int getTaxaRetrabalho() { return taxaRetrabalho; }
    public void setTaxaRetrabalho(int taxaRetrabalho) { this.taxaRetrabalho = taxaRetrabalho; }

    public int getGargalosDetectados() { return gargalosDetectados; }
    public void setGargalosDetectados(int gargalosDetectados) { this.gargalosDetectados = gargalosDetectados; }
}