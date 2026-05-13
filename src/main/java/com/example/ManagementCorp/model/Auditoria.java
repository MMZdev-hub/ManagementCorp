package com.example.managementcorp.model;

import jakarta.persistence.*;

@Entity
@Table(name="auditorias")
public class Auditoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String dataInicio;
    private String responsavel;
    private String prazo;
    private String setor;
    private String objetivo;
    private String status;

    public Long getId() { return id;}
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getDataInicio() { return dataInicio;}
    public void setDataInicio(String dataInicio) { this.dataInicio = dataInicio; }

    public String getResponsavel() { return responsavel;}
    public void setResponsavel(String responsavel) { this.responsavel = responsavel; }

    public String getPrazo() { return prazo; }
    public void setPrazo(String prazo) { this.prazo = prazo; }

    public String getSetor() { return setor; }
    public void setSetor(String setor) { this.setor = setor; }

    public String getObjetivo() { return objetivo; }
    public void setObjetivo(String  objetivo) { this.objetivo = objetivo; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}