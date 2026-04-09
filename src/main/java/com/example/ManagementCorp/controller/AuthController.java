package com.example.managementcorp.controller;

import com.example.managementcorp.dto.LoginDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO data) {

        if(data.email.equals("admin@email.com") && data.password.equals("123")) {
            return ResponseEntity.ok("fake-jwt-token");
        }

        return ResponseEntity.status(401)
                .body("Credenciais inválidas");
    }


}