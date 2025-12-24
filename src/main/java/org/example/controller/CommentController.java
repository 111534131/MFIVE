package org.example.controller;

import org.example.entity.Comment;
import org.example.entity.Car;
import org.example.entity.User;
import org.example.repository.CommentRepository;
import org.example.repository.CarRepository;
import org.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private UserRepository userRepository;

    // 取得特定車輛的所有留言
    @GetMapping("/car/{carId}")
    public List<Comment> getCommentsByCarId(@PathVariable Long carId) {
        return commentRepository.findByCarIdOrderByCreatedAtDesc(carId);
    }

    // 新增留言
    @PostMapping
    public ResponseEntity<?> createComment(@RequestBody Map<String, Object> payload) {
        try {
            Long carId = Long.parseLong(payload.get("carId").toString());
            Long userId = Long.parseLong(payload.get("userId").toString());
            String content = payload.get("content").toString();

            Car car = carRepository.findById(carId).orElse(null);
            User user = userRepository.findById(userId).orElse(null);

            if (car == null || user == null) {
                return ResponseEntity.badRequest().body("車輛或使用者不存在");
            }

            Comment comment = new Comment();
            comment.setCar(car);
            comment.setUser(user);
            comment.setContent(content);

            Comment savedComment = commentRepository.save(comment);
            return ResponseEntity.ok(savedComment);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("新增留言失敗: " + e.getMessage());
        }
    }

    // 刪除留言
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteComment(@PathVariable Long id) {
        try {
            commentRepository.deleteById(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "刪除成功");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("刪除失敗: " + e.getMessage());
        }
    }

    // 取得使用者的所有留言
    @GetMapping("/user/{userId}")
    public List<Comment> getCommentsByUserId(@PathVariable Long userId) {
        return commentRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }
}
