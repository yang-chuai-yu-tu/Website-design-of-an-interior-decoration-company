package edu.bistu.decoration.domain;

import lombok.Data;

@Data
public class Tag {
    //标签编号
    private Long id;
    //标签类型
    private String key;
    //标签内容
    private String value;
    //标签名字
    private String name;
    //父级标签
    private Long parentId;
}
