package edu.bistu.decoration.domain;

import lombok.Data;

@Data
public class Option {
    //选项编号
    private Long id;
    //选项名称
    private String name;
    //选项票数
    private Integer amount;
    //相关投票id
    private Long relatedId;

}
