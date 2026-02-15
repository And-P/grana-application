package me.umbrella.grana.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import me.umbrella.grana.api.model.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> { }
