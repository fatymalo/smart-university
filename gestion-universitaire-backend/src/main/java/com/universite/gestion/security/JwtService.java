package com.universite.gestion.security;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;


@Service
public class JwtService {


    @Value("${jwt.secret}")
    private String secretKey;


    @Value("${jwt.expiration}")
    private long expiration;



    private SecretKey getSigningKey() {

        return Keys.hmacShaKeyFor(
                secretKey.getBytes(StandardCharsets.UTF_8)
        );
    }



    // Générer un token JWT
    public String generateToken(String username) {

        return Jwts.builder()
                .subject(username)
                .issuedAt(new Date())
                .expiration(
                    new Date(System.currentTimeMillis() + expiration)
                )
                .signWith(getSigningKey())
                .compact();
    }



    // Extraire le nom utilisateur
    public String extractUsername(String token) {

        return extractClaim(token, Claims::getSubject);
    }



    // Extraire une information du token
    public <T> T extractClaim(
            String token,
            Function<Claims, T> resolver
    ) {

        Claims claims = Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();


        return resolver.apply(claims);
    }



    // Vérifier validité token
    public boolean isTokenValid(
            String token,
            String username
    ) {

        return extractUsername(token).equals(username)
                && !isTokenExpired(token);
    }



    // Vérifier expiration
    private boolean isTokenExpired(String token) {

        return extractClaim(
                token,
                Claims::getExpiration
        ).before(new Date());
    }

}
