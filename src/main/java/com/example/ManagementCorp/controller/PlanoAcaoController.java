package com.example.managementcorp.controller;

import com.example.managementcorp.dto.PlanoAcaoDTO;
import com.example.managementcorp.model.PlanoAcao;
import com.example.managementcorp.repository.PlanoAcaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/planos")
@CrossOrigin(origins = "*")
public class PlanoAcaoController {

    @Autowired
    private PlanoAcaoRepository repo;

    @GetMapping
    public List<PlanoAcao> listar() {
        return repo.findAll();
    }

    @PostMapping
    public ResponseEntity<?> criar(@RequestBody PlanoAcaoDTO data) {
        PlanoAcao plano = new PlanoAcao();
        plano.setNome(data.nome);
        plano.setResponsavel(data.responsavel);
        plano.setDataCriacao(data.dataCriacao);
        plano.setPrazo(data.prazo);
        plano.setStatus(data.status != null ? data.status : "Pendentes");
        repo.save(plano);
        return ResponseEntity.ok("Plano criado com sucesso");
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> atualizarStatus(@PathVariable Long id, @RequestBody PlanoAcaoDTO data) {
        var plano = repo.findById(id);
        if (plano.isEmpty()) return ResponseEntity.notFound().build();
        PlanoAcao p = plano.get();
        p.setStatus(data.status);
        repo.save(p);
        return ResponseEntity.ok(p);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        repo.deleteById(id);
        return ResponseEntity.ok("Plano deletado");
    }
}