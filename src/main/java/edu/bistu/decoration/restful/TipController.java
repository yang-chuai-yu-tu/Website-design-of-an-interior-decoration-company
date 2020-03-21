package edu.bistu.decoration.restful;

import edu.bistu.decoration.domain.CommonResult;
import edu.bistu.decoration.domain.Tip;
import edu.bistu.decoration.service.TipService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@Slf4j

public class TipController {

    @Autowired
    private TipService tipService;

    @PostMapping("/tip/savetip")
    public CommonResult<Tip> saveTip(@RequestBody Tip tip){
        try{
            Tip newTip = tipService.saveTip(tip);
            return new CommonResult(newTip);
        }catch(Throwable t){
            log.error("保存贴士{}发生异常", tip!=null?tip.getTitle():"null", t);
            return new CommonResult(500,"保存贴士出错了");
        }
    }

    @GetMapping("/tip/gettips")
    public CommonResult<List<Tip>> getTips(){

        try{
            List<Tip> tipList =tipService.getTips();
            CommonResult response = new CommonResult(tipList);
            response.setCount(tipList.size());
            return response;
        }catch (Throwable t){
            return new CommonResult(500,"获取贴士出错了");
        }
    }

    @GetMapping("/tip/gettip/{tipid}")
    public CommonResult<Tip> getCaseDetail(@PathVariable Long tipid){

        try{
            Tip tip =tipService.getTip(tipid);
            CommonResult response = new CommonResult(tip);
            return response;
        }catch (Throwable t){
            return new CommonResult(500,"获取贴士出错了");
        }
    }

    //后台查询用
    @GetMapping("/tip/list")
    public CommonResult<List<Tip>> getList(@Valid @RequestParam(value = "page", required = false, defaultValue="1") Integer curr,
                                                @Valid @RequestParam(value = "limit", required = false, defaultValue="10") Integer limit
                                                ){

        try{

            Page<Tip> tipPage =tipService.getList(curr,limit);
            CommonResult response = new CommonResult(tipPage.getContent());
            response.setCount((int)tipPage.getTotalElements());
            return response;
        }catch (Throwable t){
            log.error("查询贴士发生异常", t);
            return new CommonResult(500,"获取贴士出错了");
        }
    }

    @GetMapping("/tip/delete")
    public void delete(Long id){
        tipService.deleteTip(id);
        return;
    }
}
