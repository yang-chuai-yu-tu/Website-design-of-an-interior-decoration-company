package edu.bistu.decoration.domain;

import lombok.Data;

import java.util.Date;

@Data
public class CaseInfo {
    private Long id;
    //设计案例的设计师编号
    private Long designerId;
    //案例名称
    private String name;
    //案例风格
    private String style;
    //案例面积
    private Float area;
    //案例所在城市
    private String city;
    //案例设计理念
    private String concept;
    //案例户型
    private Integer bedroomNum;
    //案例优先级
    private Integer priority;
    //案例完成时间
    private Date crateTime;
}
