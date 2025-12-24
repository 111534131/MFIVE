package org.example.controller;

import org.example.entity.Car;
import org.example.entity.Favorite;
import org.example.entity.User;
import org.example.repository.CarRepository;
import org.example.repository.FavoriteRepository;
import org.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class FavoriteController {

    @Autowired
    private FavoriteRepository favoriteRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CarRepository carRepository;

    // Get all favorite cars for a user
    @GetMapping("/users/{userId}/favorites")
    public ResponseEntity<List<Car>> getFavoriteCars(@PathVariable Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        User user = userOptional.get();
        List<Car> favoriteCars = favoriteRepository.findByUser(user).stream()
                .map(Favorite::getCar)
                .collect(Collectors.toList());
        return ResponseEntity.ok(favoriteCars);
    }

    // Add a car to favorites
    @PostMapping("/favorites")
    public ResponseEntity<?> addFavorite(@RequestBody Map<String, Long> payload) {
        Long userId = payload.get("userId");
        Long carId = payload.get("carId");

        if (userId == null || carId == null) {
            return ResponseEntity.badRequest().body("User ID and Car ID must be provided.");
        }

        Optional<User> userOptional = userRepository.findById(userId);
        Optional<Car> carOptional = carRepository.findById(carId);

        if (userOptional.isEmpty() || carOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        User user = userOptional.get();
        Car car = carOptional.get();

        if (favoriteRepository.existsByUserAndCarId(user, carId)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Favorite already exists.");
        }

        Favorite favorite = new Favorite();
        favorite.setUser(user);
        favorite.setCar(car);
        favoriteRepository.save(favorite);

        return ResponseEntity.status(HttpStatus.CREATED).body(favorite);
    }

    // Remove a car from favorites
    @DeleteMapping("/favorites")
    public ResponseEntity<?> removeFavorite(@RequestParam Long userId, @RequestParam Long carId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found.");
        }

        User user = userOptional.get();
        List<Favorite> favorites = favoriteRepository.findByUser(user);

        Optional<Favorite> favoriteToRemove = favorites.stream()
                .filter(fav -> fav.getCar().getId().equals(carId))
                .findFirst();

        if (favoriteToRemove.isPresent()) {
            favoriteRepository.delete(favoriteToRemove.get());
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Check if a car is a favorite
    @GetMapping("/favorites/exists")
    public ResponseEntity<Boolean> isFavorite(@RequestParam Long userId, @RequestParam Long carId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest().body(false);
        }
        boolean isFav = favoriteRepository.existsByUserAndCarId(userOptional.get(), carId);
        return ResponseEntity.ok(isFav);
    }
}
