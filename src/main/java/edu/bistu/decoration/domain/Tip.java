package edu.bistu.decoration.domain;

import lombok.Data;

import java.util.Date;

@Data
public class Tip {
    private Long id;
    //贴士标题
    private String title;
    //创建时间
    private Date crateTime;
    //作者姓名
    private String author;
    //贴士内容
    private String content;
    //贴士封面
    private String image;
}
