package org.example.repository;

import org.example.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByCarIdOrderByCreatedAtDesc(Long carId);

    List<Comment> findByUserIdOrderByCreatedAtDesc(Long userId);
}
