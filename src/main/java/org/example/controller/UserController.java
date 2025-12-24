package org.example.controller;

import org.example.entity.User;
import org.example.repository.UserRepository;
import org.example.service.RecaptchaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RecaptchaService recaptchaService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, Object> registerData) {
        // 驗證 reCAPTCHA
        String recaptchaToken = (String) registerData.get("recaptchaToken");
        if (!recaptchaService.verify(recaptchaToken)) {
            return ResponseEntity.badRequest().body("reCAPTCHA 驗證失敗");
        }

        User user = new User();
        user.setUsername((String) registerData.get("username"));
        user.setEmail((String) registerData.get("email"));
        user.setPassword((String) registerData.get("password"));
        user.setRole("USER");

        try {
            User savedUser = userRepository.save(user);
            return ResponseEntity.ok(savedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("註冊失敗：使用者名稱或信箱已存在");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        // 驗證 reCAPTCHA
        String recaptchaToken = loginData.get("recaptchaToken");
        if (!recaptchaService.verify(recaptchaToken)) {
            return ResponseEntity.badRequest().body("reCAPTCHA 驗證失敗");
        }

        String username = loginData.get("username");
        String password = loginData.get("password");
        return userRepository.findByUsername(username)
                .filter(u -> u.getPassword().equals(password))
                .map(u -> ResponseEntity.ok((Object) u))
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("帳號或密碼錯誤"));
    }

    // 取得所有會員 (管理員)
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // 刪除會員 (管理員)
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
    }
}
