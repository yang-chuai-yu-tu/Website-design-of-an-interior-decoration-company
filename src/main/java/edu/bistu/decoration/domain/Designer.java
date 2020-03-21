package edu.bistu.decoration.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class Designer {
    private Long id;
    //设计师姓名
    private String name;
    //擅长风格
    private String style;
    //详细介绍
    @JsonProperty("intro")
    private String introduce;
    //从业经验
    @JsonProperty("exp")
    private Integer experience;
    //设计师头衔
    private String rank;
}
