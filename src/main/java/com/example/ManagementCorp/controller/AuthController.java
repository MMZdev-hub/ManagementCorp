package com.example.managementcorp.controller;

import com.example.managementcorp.dto.LoginDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.managementcorp.model.User;
import com.example.managementcorp.repository.UserRepository;
import com.example.managementcorp.dto.RegisterDTO;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO data) {

        var user = userRepository.findByEmail(data.email);

        if(user.isPresent() && user.get().getPassword().equals(data.password)) {
            return ResponseEntity.ok("fake-jwt-token");
        }

        return ResponseEntity.status(401)
                .body("Credenciais inválidas");
    }

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterDTO data) {

        if (userRepository.findByEmail(data.email).isPresent()) {
            return ResponseEntity.badRequest().body("Usuário já existe");
        }

        User user = new User();
        user.setEmail(data.email);
        user.setPassword(data.password);

        userRepository.save(user);

        return ResponseEntity.ok("Usuário cadastrado com sucesso");
    }


}