package com.example.managementcorp.repository;

import com.example.managementcorp.model.PlanoAcao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlanoAcaoRepository extends JpaRepository<PlanoAcao, Long> {
    List<PlanoAcao> findByStatus(String status);
}