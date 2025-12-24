package org.example.controller;

import org.example.entity.Car;
import org.example.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cars")
public class CarController {

    @Autowired
    private CarRepository carRepository;

    @GetMapping
    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    @GetMapping("/{id}")
    public Car getCarById(@PathVariable Long id) {
        return carRepository.findById(id).orElse(null);
    }

    @GetMapping("/search")
    public List<Car> searchCars(@RequestParam String query) {
        return carRepository.findByBrandContainingIgnoreCaseOrModelContainingIgnoreCase(query, query);
    }

    // 新增車輛 (需要 ADMIN 權限)
    @PostMapping
    public ResponseEntity<?> createCar(@RequestBody Car car,
            @RequestHeader(value = "X-User-Role", required = false) String role) {
        if (!"ADMIN".equals(role)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("權限不足：只有管理員可以新增車輛");
        }
        return ResponseEntity.ok(carRepository.save(car));
    }

    // 更新車輛 (需要 ADMIN 權限)
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCar(@PathVariable Long id, @RequestBody Car carDetails,
            @RequestHeader(value = "X-User-Role", required = false) String role) {
        if (!"ADMIN".equals(role)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("權限不足：只有管理員可以修改車輛");
        }

        Car car = carRepository.findById(id).orElse(null);
        if (car != null) {
            car.setBrand(carDetails.getBrand());
            car.setModel(carDetails.getModel());
            car.setPrice(carDetails.getPrice());
            car.setBodyType(carDetails.getBodyType());
            car.setFuelType(carDetails.getFuelType());
            car.setTransmission(carDetails.getTransmission());
            car.setEngineDisplacement(carDetails.getEngineDisplacement());
            car.setHorsepower(carDetails.getHorsepower());
            car.setDescription(carDetails.getDescription());
            car.setImageUrl(carDetails.getImageUrl());
            return ResponseEntity.ok(carRepository.save(car));
        }
        return ResponseEntity.notFound().build();
    }

    // 刪除車輛 (需要 ADMIN 權限)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCar(@PathVariable Long id,
            @RequestHeader(value = "X-User-Role", required = false) String role) {
        if (!"ADMIN".equals(role)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("權限不足：只有管理員可以刪除車輛");
        }
        carRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
