package com.example.managementcorp.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String password;
    private String perfil;
    private String permissoes;
    private boolean acesso = true;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getPerfil() { return perfil; }
    public void setPerfil(String perfil) { this.perfil = perfil; }

    public String getPermissoes() { return permissoes; }
    public void setPermissoes(String permissoes) { this.permissoes = permissoes; }

    public boolean isAcesso() { return acesso; }
    public void setAcesso(boolean acesso) { this.acesso = acesso; } 
}