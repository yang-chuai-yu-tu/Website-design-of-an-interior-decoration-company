package edu.bistu.decoration.cms.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginToken {
    //令牌
    @ApiModelProperty(example = "mbx100860258", value = "用户登录Token")
    @JsonProperty("ultk")
    private String ultk;
}
