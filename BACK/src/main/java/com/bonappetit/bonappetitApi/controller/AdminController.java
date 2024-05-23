package com.bonappetit.bonappetitApi.controller;

import com.bonappetit.bonappetitApi.service.IUsuarioService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    IUsuarioService iUsuarioService;

    @PostMapping("/rolAdmin/{id}")
    public ResponseEntity<?> grantAdminRole(@PathVariable Long id) {
        try {
            iUsuarioService.grantAdminRole(id);
            return ResponseEntity.ok("Rol de ADMIN asignado correctamente al usuario con ID " + id);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/revokeRole/{id}")
    public ResponseEntity<?> revokeAdminRole(@PathVariable Long id) {
        try {
            iUsuarioService.revokeAdminRole(id);
            return ResponseEntity.ok("Rol de ADMIN revocado correctamente al usuario con ID " + id);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
