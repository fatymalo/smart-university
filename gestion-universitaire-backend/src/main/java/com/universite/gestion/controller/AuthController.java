package com.universite.gestion.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.universite.gestion.dto.LoginRequest;
import com.universite.gestion.dto.LoginResponse;
import com.universite.gestion.entity.Utilisateur;
import com.universite.gestion.repository.UtilisateurRepository;
import com.universite.gestion.security.JwtService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {


    private final UtilisateurRepository utilisateurRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;



    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {


        // Recherche de l'utilisateur par email
        Utilisateur utilisateur = utilisateurRepository
                .findByEmail(request.getEmail())
                .orElse(null);



        // Vérification existence utilisateur
        if (utilisateur == null) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Email ou mot de passe incorrect");
        }



        // Vérification du mot de passe
        boolean passwordCorrect = passwordEncoder.matches(
                request.getPassword(),
                utilisateur.getMotDePasse()
        );


        if (!passwordCorrect) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Email ou mot de passe incorrect");
        }



        // Génération du token JWT
        String token = jwtService.generateToken(
                utilisateur.getEmail()
        );



        // Retour du token au frontend
        LoginResponse response = new LoginResponse(token);


        return ResponseEntity
                .status(HttpStatus.OK)
                .body(response);
    }

}
