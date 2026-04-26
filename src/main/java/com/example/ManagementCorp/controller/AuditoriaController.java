package com.example.managementcorp.controller;

import com.example.managementcorp.dto.AuditoriaDTO;
import com.example.managementcorp.model.Auditoria;
import com.example.managementcorp.repository.AuditoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auditorias")
@CrossOrigin(origins = "*")
public class AuditoriaController {

    @Autowired
    private AuditoriaRepository auditoriaRepository;

    @GetMapping
    public List<Auditoria> listar() {
        return auditoriaRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> criar(@RequestBody AuditoriaDTO data) {
        Auditoria auditoria = new Auditoria();
        auditoria.setNome(data.nome);
        auditoria.setDataInicio(data.dataInicio);
        auditoria.setResponsavel(data.responsavel);
        auditoria.setPrazo(data.prazo);
        auditoria.setSetor(data.setor);
        auditoria.setObjetivo(data.objetivo);
        auditoria.setStatus(data.status != null ? data.status : "Pendente");
        auditoriaRepository.save(auditoria);
        return ResponseEntity.ok("Auditoria criada com sucesso");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        auditoriaRepository.deleteById(id);
        return ResponseEntity.ok("Auditoria deletada");
    }

    @GetMapping("/historico")
    public List<Auditoria> historico(@RequestParam(required = false) String ordem) {
        List<Auditoria> auditorias = auditoriaRepository.findAll();

        if ("data".equals(ordem)) {
            auditorias.sort((a, b) -> {
                if (a.getDataInicio() == null) return 1;
                if (b.getDataInicio() == null) return -1;
                return a.getDataInicio().compareTo(b.getDataInicio());
            });
        } else if ("crescente".equals(ordem)) {
            auditorias.sort((a, b) -> {
                if (a.getNome() == null) return 1;
                if (b.getNome() == null) return -1;
                return a.getNome().compareTo(b.getNome());
            });
        }

        return auditorias;
    }

    @GetMapping("/stats/areas")
        public ResponseEntity<?> statsPorArea() {
            List<Auditoria> auditorias = auditoriaRepository.findAll();

            java.util.Map<String, java.util.Map<String, Long>> resultado = new java.util.HashMap<>();

        for (Auditoria a : auditorias) {
            String setor = a.getSetor() != null ? a.getSetor() : "Outros";
            String status = a.getStatus() != null ? a.getStatus() : "Pendente";

            resultado.putIfAbsent(setor, new java.util.HashMap<>());
            resultado.get(setor).merge(status, 1L, Long::sum);
        }

        java.util.List<java.util.Map<String, Object>> lista = new java.util.ArrayList<>();
        for (java.util.Map.Entry<String, java.util.Map<String, Long>> entry : resultado.entrySet()) {
            java.util.Map<String, Object> item = new java.util.HashMap<>();
            item.put("area", entry.getKey());
            item.put("concluidas", entry.getValue().getOrDefault("Concluída", 0L));
            item.put("andamento", entry.getValue().getOrDefault("Em Andamento", 0L));
            item.put("pendentes", entry.getValue().getOrDefault("Pendente", 0L));
            lista.add(item);
        }

        return ResponseEntity.ok(lista);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> atualizarStatus(@PathVariable Long id, @RequestBody AuditoriaDTO data) {
        var auditoria = auditoriaRepository.findById(id);
        if (audi.isEmpty()) return ResponseEntity.notFound().build();
        Auditoria a = auditoria.get();
        a.setStatus(data.status);
        auditoriaRepository.save(a);
        return ResponseEntity.ok(a);
    }
}