package me.umbrella.grana.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import me.umbrella.grana.api.model.Estado;


@Repository
public interface EstadoRepository extends JpaRepository<Estado, Long> {
}
