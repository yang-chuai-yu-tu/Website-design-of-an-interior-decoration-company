package edu.bistu.decoration.restful;

import edu.bistu.decoration.domain.CommonResult;
import edu.bistu.decoration.domain.Designer;
import edu.bistu.decoration.domain.Vdesigner;
import edu.bistu.decoration.service.DesignerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@Slf4j
public class DesignerController {

    @Autowired
    DesignerService designerService;

    @PostMapping("/designer/savedesigner")
    public CommonResult<Designer> saveDesigner(@RequestBody Designer designer){
        try{
           Designer newDesigner=designerService.saveDesigner(designer);
            return new CommonResult(newDesigner);
        }catch(Throwable t){
            log.error("保存设计师{}出错了",designer!=null?designer.getName():"null",t);
            return new CommonResult(500,"保存设计师出错了");
        }
    }

    @GetMapping("/designer/getdesigner")
    public CommonResult<Vdesigner> getDesigner(Long designerid){

        try{
            Vdesigner vdesigner = designerService.getDesigner(designerid);
            CommonResult response = new CommonResult(vdesigner);
            return response;
        }catch (Throwable t){
            return new CommonResult(500,"获取设计师出错了");
        }
    }

    @GetMapping("/designer/getdesigner2")
    public CommonResult<List<Vdesigner>> getDesigner2(String style, String rank){

        try{
            List<Vdesigner> designers =designerService.getDesigner2(style, rank);
            CommonResult response = new CommonResult(designers);
            response.setCount(designers.size());
            return response;
        }catch (Throwable t){
            return new CommonResult(500,"获取设计师出错了");
        }
    }


    //后台查询用
    @GetMapping("/designer/list")
    public CommonResult<List<Designer>> getList(@Valid @RequestParam(value = "page", required = false, defaultValue="1") Integer curr,
                                               @Valid @RequestParam(value = "limit", required = false, defaultValue="10") Integer limit,
                                               @Valid @RequestParam(value = "rank", required = false) String rank){

        try{

            Page<Designer> designerPage =designerService.getList(curr,limit,rank);
            CommonResult response = new CommonResult(designerPage.getContent());
            response.setCount((int)designerPage.getTotalElements());
            return response;
        }catch (Throwable t){
            log.error("查询设计师发生异常", t);
            return new CommonResult(500,"获取设计师出错了");
        }
    }

    @GetMapping("/designer/info/{id}")
    public CommonResult<Designer> getDesigner3(@PathVariable Long id){

        try{
            Designer designer = designerService.getDesigner3(id);
            CommonResult response = new CommonResult(designer);
            return response;
        }catch (Throwable t){
            log.error("查询设计师发生异常", t);
            return new CommonResult(500,"获取图片出错了");
        }
    }

    @GetMapping("/designer/delete")
    public void delete(Long id){
        designerService.deleteDesigner(id);
        return;
    }
}
