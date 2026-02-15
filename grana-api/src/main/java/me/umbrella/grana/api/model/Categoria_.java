package me.umbrella.grana.api.model;

import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@StaticMetamodel(Categoria.class)
public abstract class Categoria_ {
    public static volatile SingularAttribute<Categoria, Long> codigo;
    public static volatile SingularAttribute<Categoria, String> nome;
    public static final String CODIGO = "codigo";
    public static final String NOME = "nome";

    public Categoria_() {
    }
}
