package edu.bistu.decoration.cms.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
//全参数构造函数
@AllArgsConstructor
public class LoginReq {
    //表示对model属性的说明或者数据操作更改 example-举例说明 value-字段说明
    @ApiModelProperty(example = "mbx100860258", value = "账号")
    //json传输名字
    @JsonProperty("acct")
    private String account;
    @ApiModelProperty(example = "mbx100860258", value = "密码")
    @JsonProperty("pswd")
    private String password;
}
