package edu.bistu.decoration.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.springframework.validation.annotation.Validated;

import java.util.Objects;

/**
 * CommonResult
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-07-03T05:59:05.714Z")
@ApiModel
public class CommonResult<T> {
  //结果状态；200：成功；404：无数据；500：服务内部错误;400:参数错误
  @JsonProperty("status")
  private Integer status = null;

  //错误信息
  @JsonProperty("error")
  private String error = null;

  //真实的结果数据
  @JsonProperty("data")
  private T data = null;

  //结果产生时间戳
  @JsonProperty("timestamp")
  private Long timestamp = null;

  //结果数据条数
  @JsonProperty("count")
  private Integer count = null;

  public CommonResult status(Integer status) {
    this.status = status;
    return this;
  }

  /**
   * 状态码
   * @return status
  **/
  @ApiModelProperty(value = "状态码")


  public Integer getStatus() {
    return status;
  }

  public void setStatus(Integer status) {
    this.status = status;
  }

  public CommonResult error(String error) {
    this.error = error;
    return this;
  }

  /**
   * 错误说明
   * @return error
  **/
  @ApiModelProperty(value = "错误说明")


  public String getError() {
    return error;
  }

  public void setError(String error) {
    this.error = error;
  }

  public CommonResult data(T data) {
    this.status = 200;
    this.timestamp = System.currentTimeMillis();
    this.data = data;
    return this;
  }

  /**
   * 数据
   * @return data
  **/
  @ApiModelProperty(value = "数据")


  public T getData() {
    return data;
  }

  public void setData(T data) {
      this.status = 200;
      this.timestamp = System.currentTimeMillis();
    this.data = data;
  }

  public CommonResult timestamp(Long timestamp) {
    this.timestamp = timestamp;
    return this;
  }
  public CommonResult(int status, String error){
    this.status = status;
    this.error = error;
    this.timestamp = System.currentTimeMillis();
    this.count = 0;
  }

  public CommonResult(){
    this.status = 200;
    this.timestamp = System.currentTimeMillis();
    this.count = 1;
  }

  public CommonResult(T data) {
    this();
    this.data = data;
  }

  /**
   * 时间戳
   * @return timestamp
  **/
  @ApiModelProperty(value = "时间戳")


  public Long getTimestamp() {
    return timestamp;
  }

  public void setTimestamp(Long timestamp) {
    this.timestamp = timestamp;
  }

  public CommonResult count(Integer count) {
    this.count = count;
    return this;
  }

  /**
   * 数据条数
   * @return count
  **/
  @ApiModelProperty(value = "数据条数")


  public Integer getCount() {
    return count;
  }

  public void setCount(Integer count) {
    this.count = count;
  }


  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    CommonResult commonResult = (CommonResult) o;
    return Objects.equals(this.status, commonResult.status) &&
        Objects.equals(this.error, commonResult.error) &&
        Objects.equals(this.data, commonResult.data) &&
        Objects.equals(this.timestamp, commonResult.timestamp) &&
        Objects.equals(this.count, commonResult.count);
  }

  @Override
  public int hashCode() {
    return Objects.hash(status, error, data, timestamp, count);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class CommonResult {\n");

    sb.append("    status: ").append(toIndentedString(status)).append("\n");
    sb.append("    error: ").append(toIndentedString(error)).append("\n");
    sb.append("    data: ").append(toIndentedString(data)).append("\n");
    sb.append("    timestamp: ").append(toIndentedString(timestamp)).append("\n");
    sb.append("    count: ").append(toIndentedString(count)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}

