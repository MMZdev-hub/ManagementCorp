package com.example.managementcorp.dto;

public class UserResponseDTO {
    public Long id;
    public String email;
    public String name;
    public String perfil;
    public String permissoes;
    public boolean acesso;

    public UserResponseDTO(Long id, String email, String name, String perfil, String permissoes, boolean acesso) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.perfil = perfil;
        this.permissoes = permissoes;
        this.acesso = acesso;
    }
}