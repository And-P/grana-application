package me.umbrella.grana.api.repository;

import me.umbrella.grana.api.model.Cidade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CidadeRepository  extends JpaRepository<Cidade, Long> {

    List<Cidade> findByEstadoCodigo(Long codigo_estado);

}
