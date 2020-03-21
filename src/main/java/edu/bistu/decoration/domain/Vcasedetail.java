package edu.bistu.decoration.domain;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class Vcasedetail {
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
    //案例图片
    private List<Picture> casePicture;
    //设计师图片
    private List<Picture> designerPicture;
    //设计师姓名
    private String designerName;
    //设计师头衔
    private String rank;
}
