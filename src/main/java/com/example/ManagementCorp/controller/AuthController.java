package com.example.managementcorp.controller;

import com.example.managementcorp.dto.LoginDTO;
import com.example.managementcorp.dto.RegisterDTO;
import com.example.managementcorp.model.User;
import com.example.managementcorp.repository.UserRepository;
import com.example.managementcorp.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO data) {

        var user = userRepository.findByEmail(data.email);

        if(user.isPresent() && encoder.matches(data.password, user.get().getPassword())) {
            String token = jwtService.generateToken(data.email);
            return ResponseEntity.ok(token);
        }

        return ResponseEntity.status(401)
                .body("Credenciais inválidas");
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterDTO data) {

        if (userRepository.findByEmail(data.email).isPresent()) {
            return ResponseEntity.badRequest().body("Usuário já existe");
        }

        User user = new User();
        user.setEmail(data.email);
        user.setPassword(encoder.encode(data.password) );

        userRepository.save(user);

        return ResponseEntity.ok("Usuário cadastrado com sucesso");
    }
}