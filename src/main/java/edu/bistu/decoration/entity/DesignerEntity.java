package edu.bistu.decoration.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigInteger;
import java.sql.Timestamp;

@Getter
@Setter
@Entity
@Table(name = "t_designer")
public class DesignerEntity {

    @Id
    @TableGenerator(name="designer_generator",allocationSize= 50)
    @GeneratedValue(strategy = GenerationType.TABLE,generator = "designer_generator")
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "style")
    private String style;

    @Column(name = "introduce")
    private String introduce;

    @Column(name = "experience")
    private Integer experience;

    @Column(name = "rank")
    private String rank;
    //乐观锁版本
    @Column(name = "version")
    @Version
    private Timestamp version;
}
