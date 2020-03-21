package edu.bistu.decoration.restful;

import edu.bistu.decoration.domain.CaseInfo;
import edu.bistu.decoration.domain.CommonResult;
import edu.bistu.decoration.domain.Vcase;
import edu.bistu.decoration.domain.Vcasedetail;
import edu.bistu.decoration.service.CaseService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@Slf4j
public class CaseController {

    @Autowired
    private CaseService caseService;

    @PostMapping("/case/savecase")
    public CommonResult<CaseInfo> saveActivity(@RequestBody CaseInfo caseInfo) {

        try {
            CaseInfo newCase = caseService.saveCase(caseInfo);
            return new CommonResult(newCase);

        } catch (Throwable t){
            log.error("保存案例{}发生异常", caseInfo!=null?caseInfo.getName():"null", t);
            return new CommonResult(500,"保存案例出错了");
        }
    }

    @GetMapping("/case/getcases/{caseid}")
    public CommonResult<Vcasedetail> getCaseDetail(@PathVariable Long caseid){

        try{
            Vcasedetail cases =caseService.getCases(caseid);
            CommonResult response = new CommonResult(cases);
            return response;
        }catch (Throwable t){
            return new CommonResult(500,"获取案例出错了");
        }
    }

    //筛选用
    @GetMapping("/case/getcases2")
    public CommonResult<List<Vcase>> getCases(String style,Integer bedroomnum,Integer area1,Integer area2){

        try{
            List<Vcase> cases =caseService.getCases2(style,bedroomnum,area1,area2);
            CommonResult response = new CommonResult(cases);
            response.setCount(cases.size());
            return response;
        }catch (Throwable t){
            return new CommonResult(500,"获取案例出错了");
        }
    }

    @GetMapping("/case/getcases3")
    public CommonResult<List<CaseInfo>> getCases2(Long id){

        try{
            List<Vcase> cases = caseService.getCases3(id);
            CommonResult response = new CommonResult(cases);
            response.setCount(cases.size());
            return response;
        }catch(Throwable t){
            return new CommonResult(500,"获取案例出错了");
        }
    }

    //后台查询用
    @GetMapping("/case/list")
    public CommonResult<List<CaseInfo>> getList(@Valid @RequestParam(value = "page", required = false, defaultValue="1") Integer curr,
                                                @Valid @RequestParam(value = "limit", required = false, defaultValue="10") Integer limit,
                                                @Valid @RequestParam(value = "style", required = false) String style){

        try{

            Page<CaseInfo> casePage =caseService.getList(curr,limit,style);
            CommonResult response = new CommonResult(casePage.getContent());
            response.setCount((int)casePage.getTotalElements());
            return response;
        }catch (Throwable t){
            log.error("查询设计师发生异常", t);
            return new CommonResult(500,"获取案例出错了");
        }
    }

    @GetMapping("/case/info/{id}")
    public CommonResult<CaseInfo> getCase3(@PathVariable Long id){

        try{
            CaseInfo caseInfo = caseService.getCases4(id);
            CommonResult response = new CommonResult(caseInfo);
            return response;
        }catch (Throwable t){
            log.error("查询图片发生异常", t);
            return new CommonResult(500,"获取图片出错了");
        }
    }

    @GetMapping("/case/delete")
    public void delete(Long id){
        caseService.deleteCase(id);
        return;
    }

}
