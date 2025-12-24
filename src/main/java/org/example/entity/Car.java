package org.example.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "cars")
@Data
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String brand;

    @Column(nullable = false)
    private String model;

    @Column(nullable = false)
    private Double price;

    @Column(name = "body_type")
    private String bodyType;

    @Column(name = "fuel_type")
    private String fuelType;

    private String transmission;

    @Column(name = "engine_displacement")
    private String engineDisplacement;

    private Integer horsepower;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "image_url")
    private String imageUrl;

    // 新增詳細規格欄位
    private Integer length;
    private Integer width;
    private Integer height;
    private Integer weight;

    @Column(columnDefinition = "int default 5")
    private Integer seats;

    private Double acceleration;
    private String torque;

    @Column(name = "drive_type")
    private String driveType;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}
