package edu.bistu.decoration.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

/**
 * 活动的数据模型
 */
@Data
public class Activity {
    //活动编号
    private Long id;
    //活动名称
    private String name;
    //活动详情页地址
    private String link;
    //活动图片地址
    @JsonProperty("img")
    private String image;
    //活动说明
    @JsonProperty("dsc")
    private String description;
    //是否启用
    private String flag;
}
