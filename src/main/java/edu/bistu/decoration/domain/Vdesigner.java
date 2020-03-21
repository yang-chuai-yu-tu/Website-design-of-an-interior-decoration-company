package edu.bistu.decoration.domain;

import lombok.Data;

@Data
public class Vdesigner {
        private Long id;
        //设计师姓名
        private String name;
        //擅长风格
        private String style;
        //详细介绍
        private String introduce;
        //从业经验
        private int experience;
        //设计师头衔
        private String rank;
        //图片编号
        private Long picId;
        //图片路径
        private String url;
}
