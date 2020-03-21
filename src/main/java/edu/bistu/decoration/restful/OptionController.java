package edu.bistu.decoration.restful;


import edu.bistu.decoration.domain.CommonResult;
import edu.bistu.decoration.domain.Option;
import edu.bistu.decoration.service.OptionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@Slf4j
public class OptionController {
    @Autowired
    private OptionService optionService;

    @PostMapping("/option/saveoption")
    public CommonResult<Option> savePicture(@RequestBody Option option) {

        try {
            Option newOption = optionService.saveOption(option);
            return new CommonResult(newOption);

        } catch (Throwable t){
            log.error("保存选项{}发生异常", option!=null?option.getName():"null", t);
            return new CommonResult(500,"保存选项出错了");
        }
    }

    @GetMapping("/option/updateoption")
    public CommonResult getPictures(String name, Long id){

        try{
            optionService.update(name,id);
            return new CommonResult();
        }catch (Throwable t){
            return new CommonResult(500,"更新选项票数出错了");
        }
    }

    //后台查询用
    @GetMapping("/option/list")
    public CommonResult<List<Option>> getList(@Valid @RequestParam(value = "page", required = false, defaultValue="1") Integer curr,
                                            @Valid @RequestParam(value = "limit", required = false, defaultValue="10") Integer limit
    ){

        try{

            Page<Option> votePage =optionService.getList(curr,limit);
            CommonResult response = new CommonResult(votePage.getContent());
            response.setCount((int)votePage.getTotalElements());
            return response;
        }catch (Throwable t){
            log.error("查询选项发生异常", t);
            return new CommonResult(500,"获取选项出错了");
        }
    }

    @GetMapping("/option/info/{id}")
    public CommonResult<Option> getPicture(@PathVariable Long id){

        try{
            Option option = optionService.getOption(id);
            CommonResult response = new CommonResult(option);
            return response;
        }catch (Throwable t){
            log.error("查询选项发生异常", t);
            return new CommonResult(500,"获取选项出错了");
        }
    }

    @GetMapping("/option/delete")
    public void delete(Long id){
        optionService.deleteOption(id);
        return;
    }
}
