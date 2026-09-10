package me.umbrella.grana.api.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import me.umbrella.grana.api.model.Cidade;
import me.umbrella.grana.api.repository.CidadeRepository;


@RestController
@RequestMapping("/cidades")
public class CidadeResource {

    @Autowired
    private CidadeRepository cidadeRepository;


    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public List<Cidade> pesquisar(@RequestParam Long estado) {
        return cidadeRepository.findByEstadoCodigo(estado);
    }
}
