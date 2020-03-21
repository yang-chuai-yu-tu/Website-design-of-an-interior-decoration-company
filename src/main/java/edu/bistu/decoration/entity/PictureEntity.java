package edu.bistu.decoration.entity;

import edu.bistu.decoration.domain.Category;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigInteger;
import java.sql.Timestamp;

@Data
@Entity
@Table(name = "t_picture", indexes = {@Index(name = "idx_picture_1",  columnList = "type, related_id, display_order")})
public class PictureEntity {
    @Id
    @TableGenerator(name = "picture_generator", allocationSize = 50)
    @GeneratedValue(generator = "picture_generator",strategy = GenerationType.TABLE)
    @Column(name = "id")
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "url")
    private String url;

    @Column(name = "type", nullable = false,length = 16)
    private String type;

    @Column(name = "related_id")
    private Long relatedId;

    @Column(name = "display_order")
    private Integer displayOrder;

    @Enumerated(EnumType.STRING)
    private Category category;

    //乐观锁版本
    @Column(name = "version")
    @Version
    private Timestamp version;

}
