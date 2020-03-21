package edu.bistu.decoration.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
public class Vcase {
    //案例编号
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
    private int bedroomNum;
    //案例优先级
    private int priority;
    //案例完成时间
    private Date crateTime;
    //图片编号
    private Long picId;
    //图片路径
    private String url;
    //图片具体类型
    private Category category;
}
