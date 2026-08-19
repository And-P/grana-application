package me.umbrella.grana.api.resource;

import me.umbrella.grana.api.model.Cidade;
import me.umbrella.grana.api.repository.CidadeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cidades")
public class CidadeResource {

    @Autowired
    private CidadeRepository cidadeRepository;

    @GetMapping
    public List<Cidade> listar() {
        return cidadeRepository.findAll();
    }

    @GetMapping( "/{codigo_estado}")
    @PreAuthorize("hasAuthority('ROLE_PESQUISAR_PESSOA') and hasAuthority('SCOPE_read')")
    public List<Cidade> pesquisar(@PathVariable Long codigo_estado) {
        return cidadeRepository.findByEstadoCodigo(codigo_estado);
    }
}
