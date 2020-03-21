package edu.bistu.decoration.domain;


import lombok.Data;

@Data
public class Vote {
    //投票编号
    private Long id;
    //投票名称
    private String name;
    //投票标题
    private String title;
    //投票状态
    private String flag;

}
