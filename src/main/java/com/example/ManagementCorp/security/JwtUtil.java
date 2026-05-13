package com.example.managementcorp.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;

public class JwtUtil {
    
    private static final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    
    public static String generateToken(String email) {
        return Jwts.builder()
        .setSubject(email)
        .setIssuedAt(new Date())
        .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))
        .signWith(key)
        .compact();
    }
}