package edu.bistu.decoration.entity;

import lombok.Data;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Date;

@Data
@Entity
@Table(name = "t_tip")
public class TipEntity {
    @Id
    @TableGenerator(name = "tip_generator",allocationSize = 50)
    @GeneratedValue(generator = "tip_generator",strategy = GenerationType.TABLE)
    @Column(name = "id")
    private Long id;

    @Column(name = "title",nullable = false)
    private String title;

    @Column(name = "crate_time")
    private Date crateTime;

    @Column(name = "author")
    private String author;

    @Column(name = "content")
    private String content;

    @Column(name = "image")
    private String image;

    //乐观锁版本
    @Column(name = "version")
    @Version
    private Timestamp version;
}
