package edu.bistu.decoration.restful;

import edu.bistu.decoration.domain.Appointment;
import edu.bistu.decoration.domain.CommonResult;
import edu.bistu.decoration.domain.Status;
import edu.bistu.decoration.service.AppointmentService;
import lombok.extern.slf4j.Slf4j;
import org.joda.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

import javax.validation.Valid;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@Slf4j
public class AppointmentController {
    private static final String regex = "^((13[0-9])|(14[5,7,9])|(15([0-3]|[5-9]))|(166)|(17[0,1,3,5,6,7,8])|(18[0-9])|(19[8|9]))\\d{8}$";
    private static final Pattern p = Pattern.compile(regex);

    @Autowired
    private AppointmentService appointmentService;

    @PostMapping("/appointment/saveappointment")
    public CommonResult<Appointment> saveAppointment(@RequestBody Appointment appointment) {

        if(appointment==null || appointment.getPhoneNum()==null || appointment.getPhoneNum().isEmpty())
            return new CommonResult(400,"你怎么不输数据");

        try {
            Matcher m = p.matcher(appointment.getPhoneNum());
            if(!m.matches())
                return new CommonResult(400,"你怎么不输手机号");

            Appointment newAppointment = appointmentService.saveAppointment(appointment);
            return new CommonResult(newAppointment);

        } catch (Throwable t){
            log.error("保存预约{}发生异常", appointment!=null?appointment.getCustomerName():"null", t);
            return new CommonResult(500,"保存预约出错了");
        }
    }

    @GetMapping("/appointment/list")
    public CommonResult<List<Appointment>> getList(@Valid @RequestParam(value = "page", required = false, defaultValue="1") Integer curr,
                                                   @Valid @RequestParam(value = "limit", required = false, defaultValue="10") Integer limit,
                                                   @Valid @RequestParam(value = "orderDate", required = false)  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate orderDate,
                                                   @Valid @RequestParam(value = "status", required = false)Status status,
                                                   @Valid @RequestParam(value = "location", required = false)String location){

        try{
            Page<Appointment> appointmentList =appointmentService.getList(curr,limit,(orderDate==null?null:orderDate.toDate()),status,location);
            CommonResult response = new CommonResult(appointmentList.getContent());
            response.setCount(appointmentList.getTotalPages());
            return response;
        }catch (Throwable t){
            log.error("查询预约发生异常", t);
            return new CommonResult(500,"获取预约出错了");
        }
    }

    @GetMapping("/appointment/info/{id}")
    public CommonResult<Appointment> getAppointment(@PathVariable Long id){

        try{
            Appointment appointment = appointmentService.getAppointment(id);
            CommonResult response = new CommonResult(appointment);
            return response;
        }catch (Throwable t){
            log.error("查询预约发生异常", t);
            return new CommonResult(500,"获取预约出错了");
        }
    }

    @InitBinder
    public void initBinder(WebDataBinder binder, WebRequest request) {

        //转换日期
        DateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));// CustomDateEditor为自定义日期编辑器
    }
}
