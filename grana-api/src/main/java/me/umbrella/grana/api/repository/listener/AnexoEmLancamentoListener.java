package me.umbrella.grana.api.repository.listener;

import javax.persistence.PostLoad;

import org.springframework.util.StringUtils;

import me.umbrella.grana.api.GranaApiApplication;
import me.umbrella.grana.api.storage.S3;
import me.umbrella.grana.api.model.Lancamento;

public class AnexoEmLancamentoListener {

    @PostLoad
    public void postLoad(Lancamento lancamento) {
        if (StringUtils.hasText(lancamento.getAnexo())) {
            S3 s3 = GranaApiApplication.getBean(S3.class);
            lancamento.setUrlAnexo(s3.configuraURL(lancamento.getAnexo()));
        }
    }
}
