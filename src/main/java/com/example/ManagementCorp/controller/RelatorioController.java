package com.example.managementcorp.controller;

import com.example.managementcorp.model.Relatorio;
import com.example.managementcorp.repository.RelatorioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/relatorios")
@CrossOrigin(origins = "*")
public class RelatorioController {
    
    @Autowired
    private RelatorioRepository repo;

    @GetMapping
    public List<Relatorio> listar() {
        return repo.findAll();
    }

    @GetMapping("/stats")
    public ResponseEntity<?> stats() {
        List<Relatorio> relatorios = repo.findAll();
        if (relatorios.isEmpty()) {
            return ResponseEntity.ok(Map.of(
                "tempoMedio", 0,
                "taxaRetrabalho", 0,
                "gargalos", 0
            ));
        }

        int tempoMedio = (int) relatorios.stream()
            .mapToInt(Relatorio::getTempoExecucao).average().orElse(0);
        int taxaMedia = (int) relatorios.stream()
            .mapToInt(Relatorio::getTaxaRetrabalho).average().orElse(0);
        int totalGargalos = relatorios.stream()
            .mapToInt(Relatorio::getGargalosDetectados).sum();
        
        return ResponseEntity.ok(Map.of(
            "tempoMedio", tempoMedio,
            "taxaRetrabalho", taxaMedia,
            "gargalos", totalGargalos
        ));
    }
}