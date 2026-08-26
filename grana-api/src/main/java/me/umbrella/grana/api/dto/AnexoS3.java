package me.umbrella.grana.api.dto;

public class AnexoS3 {

    private String nome;
    private String url;

    public AnexoS3(String nome, String url) {
        this.nome = nome;
        this.url = url;
    }

    public String getNome() {
        return nome;
    }

    public String getUrl() {
        return url;
    }

}
