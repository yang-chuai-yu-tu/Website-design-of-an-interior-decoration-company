package edu.bistu.decoration.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GeneratorType;

import javax.persistence.*;
import java.math.BigInteger;
import java.sql.Timestamp;
import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "t_case", indexes = {
        @Index(name = "idx_case_style",  columnList = "style"),
        @Index(name = "idx_case_bedroom",  columnList = "bedroom_num"),
        @Index(name = "idx_case_area",  columnList = "area")})
public class CaseEntity {
    @Id
    @TableGenerator(name = "case_generator",allocationSize = 50)
    @GeneratedValue(strategy = GenerationType.TABLE ,generator="case_generator")
    @Column(name = "id")
    private Long id;

    @Column(name = "designer_id")
    private Long designerId;

    @Column(name = "name")
    private String name;

    @Column(name = "style")
    private String style;

    @Column(name = "area")
    private Float area;

    @Column(name = "city")
    private String city;

    @Column(name = "concept")
    private String concept;

    @Column(name = "bedroom_num")
    private Integer bedroomNum;

    @Column(name = "priority")
    private Integer priority;

    @Column(name = "crate_time")
    private Date crateTime;

    //乐观锁版本
    @Column(name = "version")
    @Version
    private Timestamp version;
}
