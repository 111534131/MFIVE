package org.example.controller;

import org.example.entity.Car;
import org.example.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    @PostMapping
    public Car createCar(@RequestBody Car car) {
        return carRepository.save(car);
    }

    @PutMapping("/{id}")
    public Car updateCar(@PathVariable Long id, @RequestBody Car carDetails) {
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
            return carRepository.save(car);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteCar(@PathVariable Long id) {
        carRepository.deleteById(id);
    }
}
