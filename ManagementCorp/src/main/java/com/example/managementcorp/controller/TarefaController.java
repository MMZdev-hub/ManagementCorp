package com.example.managementcorp.controller;

import com.example.managementcorp.dto.TarefaDTO;
import com.example.managementcorp.model.Tarefa;
import com.example.managementcorp.repository.TarefaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tarefas")
@CrossOrigin(origins = "*")
public class TarefaController {

    @Autowired
    private TarefaRepository repo;

    @GetMapping
    public List<Tarefa> listar() {
        return repo.findAll();
    }

    @PostMapping
    public ResponseEntity<?> criar(@RequestBody TarefaDTO data) {
        Tarefa tarefa = new Tarefa();
        tarefa.setTitulo(data.titulo);
        tarefa.setResponsavel(data.responsavel);
        tarefa.setData(data.data);
        tarefa.setStatus(data.status != null ? data.status : "Pendente");
        tarefa.setPrioridade(data.prioridade != null ? data.prioridade : "Normal");
        repo.save(tarefa);
        return ResponseEntity.ok("Tarefa criada com sucesso");
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> atualizarStatus(@PathVariable Long id, @RequestBody TarefaDTO data) {
        var tarefa = repo.findById(id);
        if (tarefa.isEmpty()) return ResponseEntity.notFound().build();
        Tarefa t = tarefa.get();
        t.setStatus(data.status);
        repo.save(t);
        return ResponseEntity.ok(t);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        repo.deleteById(id);
        return ResponseEntity.ok("Tarefa deletada");
    }
}