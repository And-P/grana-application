package me.umbrella.grana.api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import me.umbrella.grana.api.model.Usuario;


public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

	Optional<Usuario> findByEmail(String email);
	List<Usuario> findByPermissoesDescricao(String permissaoDescricao);
}
