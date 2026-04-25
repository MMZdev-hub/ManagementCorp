package com.example.managementcorp.model;

import jakarta.persistence.*;

@Entity
@Table(name = "auditorias_internas")
public class AuditoriaInterna {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String departamento;
    private String responsavel;
    private String data;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getDepartamento() { return departamento; }
    public void setDepartamento(String departamento) { this.departamento = departamento; }

    public String getResponsavel() { return responsavel; }
    public void setResponsavel(String responsavel) { this.responsavel = responsavel; }

    public String getData() { return data; }
    public void setData(String data) { this.data = data; }
}