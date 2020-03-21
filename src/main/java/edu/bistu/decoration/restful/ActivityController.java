package edu.bistu.decoration.restful;

import edu.bistu.decoration.domain.Activity;
import edu.bistu.decoration.domain.CommonResult;
import edu.bistu.decoration.service.ActivityService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@Slf4j
public class ActivityController {

    //自动装配JavaBean中的注解，通过byType形式，用来给指定的字段或方法注入所需的外部资源。
    @Autowired
    private ActivityService activityService;

    @PostMapping("/activity/saveactivity")
    public CommonResult<Activity> saveActivity(@RequestBody Activity activity) {

        try {
            Activity newActivity = activityService.saveActivity(activity);
            return new CommonResult(newActivity);

        } catch (Throwable t){
            log.error("保存活动{}发生异常", activity!=null?activity.getName():"null", t);
            return new CommonResult(500,"保存活动出错了");
        }
    }

    @GetMapping("/activity/getbanners")
    public CommonResult<List<Activity>> getBanners(){

        try{
            List<Activity> activityList =activityService.getBanners();
            CommonResult response = new CommonResult(activityList);
            response.setCount(activityList.size());
            return response;
        }catch (Throwable t){
            return new CommonResult(500,"获取活动出错了");
        }
    }

    //后台查询用
    @GetMapping("/activity/list")
    public CommonResult<List<Activity>> getList(@Valid @RequestParam(value = "page", required = false, defaultValue="1") Integer curr,
                                            @Valid @RequestParam(value = "limit", required = false, defaultValue="10") Integer limit,
                                            @Valid @RequestParam(value = "flag", required = false)String flag
    ){

        try{

            Page<Activity> votePage =activityService.getList(curr,limit,flag);
            CommonResult response = new CommonResult(votePage.getContent());
            response.setCount((int)votePage.getTotalElements());
            return response;
        }catch (Throwable t){
            log.error("查询活动发生异常", t);
            return new CommonResult(500,"获取活动出错了");
        }
    }

    @GetMapping("/activity/info/{id}")
    public CommonResult<Activity> getPicture(@PathVariable Long id){

        try{
            Activity activity = activityService.getActivity(id);
            CommonResult response = new CommonResult(activity);
            return response;
        }catch (Throwable t){
            log.error("查询活动发生异常", t);
            return new CommonResult(500,"获取活动出错了");
        }
    }

    @GetMapping("/activity/delete")
    public void delete(Long id){
        activityService.deleteActivity(id);
        return;
    }

}
