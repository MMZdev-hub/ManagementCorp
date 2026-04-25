package com.example.managementcorp.repository;

import com.example.managementcorp.model.AuditoriaInterna;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuditoriaInternaRepository extends JpaRepository<AuditoriaInterna,Long> {
    
}