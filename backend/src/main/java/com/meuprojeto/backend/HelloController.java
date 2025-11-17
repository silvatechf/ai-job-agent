package com.meuprojeto.backend;

// Importe esta linha!
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

// ADICIONE ESTA LINHA:
@CrossOrigin("http://localhost:5173") // Permite pedidos desta origem (o nosso React)
@RestController
public class HelloController {

    @GetMapping("/api/hello")
    public String sayHello() {
        return "Olá Fernando do Back-end Java!";
    }
}