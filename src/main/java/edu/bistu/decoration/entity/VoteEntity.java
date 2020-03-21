package edu.bistu.decoration.entity;

import edu.bistu.decoration.domain.Category;
import lombok.Data;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@Entity
@Table(name = "t_vote")
public class VoteEntity {
    @Id
    @TableGenerator(name = "vote_generator", allocationSize = 50)
    @GeneratedValue(generator = "vote_generator",strategy = GenerationType.TABLE)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;


    @Column(name = "title")
    private String title;

    @Column(name = "flag")
    private String flag;

    //乐观锁版本
    @Column(name = "version")
    @Version
    private Timestamp version;

}
