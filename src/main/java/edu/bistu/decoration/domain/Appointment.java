package edu.bistu.decoration.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 预约的数据模型
 */
@Data
public class Appointment implements Serializable {
    private static final long serialVersionUID = -1702857856965604059L;
    //预约编号
    private Long id;
    //预约时间
    private Date orderDate;
    //所在省市
    private String province;
    //顾客姓名
    private String customerName;
    //电话
    private String phoneNum;
    //处理时间
    private Date processDate;
    //接待的设计师
    private String designerName;
    //批注
    private String note;
    //状态
    private Status status;

}
