package com.example.managementcorp.controller;

import com.example.managementcorp.model.User;
import com.example.managementcorp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<User> listar() {
        return userRepository.findAll();
    }

    @PutMapping("/{id}/acesso")
    public ResponseEntity<?> toggleAcesso(@PathVariable Long id) {
        var user = userRepository.findById(id);
        if (user.isEmpty()) return ResponseEntity.notFound().build();

        User u = user.get();
        u.setAcesso(!u.isAcesso());
        u.setPermissoes(u.isAcesso() ? "ON" : "OFF");
        userRepository.save(u);

        return ResponseEntity.ok(u);
    }
}