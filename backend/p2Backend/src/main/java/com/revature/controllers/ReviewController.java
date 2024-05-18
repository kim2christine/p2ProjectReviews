package com.revature.controllers;

import com.revature.models.Review;
import com.revature.models.dtos.ReviewDTO;
import com.revature.services.ReviewService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reviews")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ReviewController {

    private ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    //This method will return a List of outbound review DTOs that all belong to a userId
    @GetMapping("/{userId}")
    public ResponseEntity<?> getAllRevByUserId(@PathVariable int userId) {
        //TODO: Login security checks

        try {
            return ResponseEntity.ok(reviewService.getAllRevByUserId(userId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
  
    /**
     * Handles the HTTP PUT request to edit a review.
     *
     * @param id      The ID of the review to be edited.
     * @param review  The updated review data in the form of a ReviewDTO object.
     * @param session The HttpSession object to check user authentication (optional).
     * @return ResponseEntity containing the edited review data or an error message.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Object> editReview(@PathVariable int id, @RequestBody ReviewDTO review){
        try{
            Review r = reviewService.editReview(id, review);
            // Convert the updated review to a ReviewDTO object
            ReviewDTO rDTO = new ReviewDTO(r.getTitle(), r.getBody(), r.getId(),  r.getRating());
            // Return a ResponseEntity containing the updated review data
            return ResponseEntity.ok().body(rDTO);
        }catch (IllegalArgumentException e){
            // Handle the case where editing the review fails due to invalid input or other errors
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }
}
