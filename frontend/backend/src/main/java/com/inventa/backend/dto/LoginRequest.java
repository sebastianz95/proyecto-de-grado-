package com.inventa.backend.dto;

// DTO = Data Transfer Object
// Son clases simples para recibir/enviar datos en los endpoints

// Lo que React envía al hacer login
public class LoginRequest {
    private String email;
    private String password;

    public String getEmail()    { return email;    }
    public String getPassword() { return password; }
    public void setEmail(String e)    { this.email    = e; }
    public void setPassword(String p) { this.password = p; }
}
