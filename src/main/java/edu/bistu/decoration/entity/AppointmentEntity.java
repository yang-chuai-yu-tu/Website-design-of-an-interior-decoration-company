package edu.bistu.decoration.entity;

import edu.bistu.decoration.domain.Status;
import lombok.Getter;
import lombok.Setter;


import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "t_appointment", indexes = {@Index(name = "idx_appointment_adate",  columnList = "a_date")})
public class AppointmentEntity {
    @Id
    @TableGenerator(name = "appoint_generator",allocationSize = 50)
    @GeneratedValue(generator = "appoint_generator", strategy= GenerationType.TABLE)
    @Column(name = "id")
    private Long id;

    @Column(name = "province")
    private String province;

    @Column(name = "c_name")
    private String customerName;

    @Column(name = "phone")
    private String phoneNum;

    @Temporal(TemporalType.DATE)
    @Column(name = "a_date")
    private Date orderDate;

    @Temporal(TemporalType.DATE)
    @Column(name = "p_date")
    private Date processDate;

    @Column(name = "d_name")
    private String designerName;

    @Column(name = "note")
    private String note;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private Status status;

    //乐观锁版本
    @Column(name = "version")
    @Version
    private Timestamp version;
}
