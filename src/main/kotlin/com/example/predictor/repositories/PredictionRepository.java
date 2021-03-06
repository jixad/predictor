package com.example.predictor.repositories;

import com.example.predictor.entity.Event;
import com.example.predictor.entity.Prediction;
import com.example.predictor.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PredictionRepository extends JpaRepository<Prediction, Long> {

    List<Prediction> findAllByEvent(Event event);
    boolean existsByEventAndUser(Event event, Users user);
    Prediction findByEventAndUser(Event event, Users user);

}
