package com.backend.userAndSecurityManagement;



import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/home")
    public String home() {


        String password = "admin";

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String encodedPassword = encoder.encode(password);
        System.out.println("normal text "+password);
        System.out.println("encoded form "+encodedPassword);

        return "password admin encoded form is: "+ encodedPassword;
    }
}