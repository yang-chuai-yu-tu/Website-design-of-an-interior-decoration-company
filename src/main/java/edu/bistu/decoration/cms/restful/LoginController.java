package edu.bistu.decoration.cms.restful;

import com.fasterxml.jackson.databind.ObjectMapper;
import edu.bistu.decoration.cms.domain.LoginReq;
import edu.bistu.decoration.cms.domain.LoginToken;
import edu.bistu.decoration.domain.CommonResult;
import io.swagger.annotations.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@Api(value = "login", description = "CMS登录API")
@RestController
public class LoginController {
    private final ObjectMapper objectMapper;
    private final HttpServletRequest request;
    //private final UserService userService;

    public LoginController(ObjectMapper objectMapper, HttpServletRequest request) {
        this.objectMapper = objectMapper;
        this.request = request;
        //this.userService = userService;
    }

    @ApiOperation(value = "登录接口", nickname = "loginPost", notes = "", tags = {"local",})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "登录成功，获取用户信息.")})
    @RequestMapping(value = "/cmslogin",
            produces = {"application/json"},
            method = RequestMethod.POST)
    public CommonResult<LoginToken> loginPost(@Valid @RequestBody LoginReq loginReq) {
        String sid = request.getSession().getId();
        CommonResult<LoginToken> result = new CommonResult<>();

        LoginToken token = validPass(loginReq);
        if (token!=null){
            result.setData(token);
        } else {
            return new CommonResult(HttpStatus.BAD_REQUEST.value(), "账号或密码错误");
        }
        return result;
    }

    @ApiOperation(value = "登出接口", nickname = "logoutPost", notes = "", tags = {"local",})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "登出成功")})
    @RequestMapping(value = "/cmslogout",
            produces = {"application/json"},
            method = RequestMethod.POST)
    public CommonResult<Boolean> logoutPost() {
        String sid = request.getSession().getId();
        //userService.logout(sid);
        CommonResult<Boolean> result = new CommonResult<>();
        result.setData(Boolean.TRUE);
        return result;
    }

    private LoginToken validPass(LoginReq loginReq) {
        //TODO 拿用户名和密码去验证，返回令牌
        LoginToken token = new LoginToken();
        token.setUltk("TKsslsf3252532553");
        return token;
    }
}
