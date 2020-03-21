package edu.bistu.decoration.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;


@Getter
@Setter
@Entity
@Table(name = "t_activity", indexes = {@Index(name = "idx_activity_flag",  columnList = "flag")})
public class ActivityEntity {
    @Id
    @TableGenerator(name = "activity_generator",allocationSize = 50)
    @GeneratedValue(generator ="activity_generator", strategy = GenerationType.TABLE)
    @Column(name = "id")
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "link")
    private String link;

    @Column(name = "image", nullable = false)
    private String image;

    @Column(name = "description")
    @Lob
    private String description;

    @Column(name = "flag")
    private String flag;

    //乐观锁版本
    @Column(name = "version")
    @Version
    private Timestamp version;
}
