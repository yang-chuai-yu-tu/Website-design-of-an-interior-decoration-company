package edu.bistu.decoration.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;



@Data
public class Picture {
    private Long id;
    //图片标题
    private String title;
    //图片描述
    @JsonProperty("dsc")
    private String description;
    //图片路径
    private String url;
    //图片名称
    private String name;
    //图片大类
    private String type;
    //相关id
    private Long relatedId;
    //图片排序
    private Integer displayOrder;
    //图片具体类型
    private Category category;
}
