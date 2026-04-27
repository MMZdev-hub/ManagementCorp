package com.example.managementcorp.controller;

import com.example.managementcorp.dto.AuditoriaInternaDTO;
import com.example.managementcorp.model.AuditoriaInterna;
import com.example.managementcorp.repository.AuditoriaInternaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auditorias-internas")
@CrossOrigin(origins = "*")
public class AuditoriaInternaController {

    @Autowired
    private AuditoriaInternaRepository repo;

    @GetMapping
    public List<AuditoriaInterna> lista(){
        return repo.findAll();
    }

    @PostMapping
    public ResponseEntity<?> criar(@RequestBody AuditoriaInternaDTO data) {
        AuditoriaInterna auditoria = new AuditoriaInterna();
        auditoria.setNome(data.nome);
        auditoria.setDepartamento(data.departamento);
        auditoria.setResponsavel(data.responsavel);
        auditoria.setData(data.data);
        repo.save(auditoria);
        return ResponseEntity.ok("Auditoria interna criada com sucesso");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        repo.deleteById(id);
        return ResponseEntity.ok("Auditoria interna deletada");
    }

    @PutMapping("/{id}/status")
public ResponseEntity<?> atualizarStatus(@PathVariable Long id, @RequestBody AuditoriaInternaDTO data) {
    var auditoria = repo.findById(id);
    if (auditoria.isEmpty()) return ResponseEntity.notFound().build();
    AuditoriaInterna a = auditoria.get();
    a.setStatus(data.status);
    repo.save(a);
    return ResponseEntity.ok(a);
}
}