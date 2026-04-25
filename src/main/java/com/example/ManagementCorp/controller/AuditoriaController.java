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
}