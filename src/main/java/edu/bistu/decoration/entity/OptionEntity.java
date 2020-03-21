package edu.bistu.decoration.entity;


import lombok.Data;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@Entity
@Table(name = "t_option")
public class OptionEntity {
    @Id
    @TableGenerator(name = "option_generator", allocationSize = 50)
    @GeneratedValue(generator = "option_generator",strategy = GenerationType.TABLE)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "related_id")
    private Long relatedId;

    @Column(name = "amount")
    private Integer amount;

    //乐观锁版本
    @Column(name = "version")
    @Version
    private Timestamp version;
}
