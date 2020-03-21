package edu.bistu.decoration.service.impl;

import edu.bistu.decoration.domain.Appointment;
import edu.bistu.decoration.domain.Status;
import edu.bistu.decoration.entity.AppointmentEntity;
import edu.bistu.decoration.repository.AppointmentRepository;
import edu.bistu.decoration.service.AppointmentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Slf4j

public class AppointmentServiceImpl implements AppointmentService {
    private final AppointmentRepository appointmentRepository;

    public AppointmentServiceImpl(AppointmentRepository appointmentRepository){this.appointmentRepository=appointmentRepository;}

    @Override
    @Transactional(rollbackOn = Exception.class)
    public Appointment saveAppointment(Appointment appointment){
        if(appointment==null||appointment.getPhoneNum()==null){
            String msg="必填项不能为空";
            log.error(msg);
            throw new IllegalArgumentException(msg);
        }
        if (appointment.getOrderDate()==null){
            appointment.setOrderDate(new Date());
        }
        AppointmentEntity appointmentEntity=null;
        if (appointment.getId()!=null) {
            appointmentEntity=appointmentRepository.findByOrderDateAndPhoneNum(appointment.getOrderDate(),appointment.getPhoneNum());
        }
        if (appointmentEntity == null) {
            appointmentEntity = new AppointmentEntity();
            appointment.setStatus(Status.CREATE);
        }
        BeanUtils.copyProperties(appointment, appointmentEntity);
        appointmentEntity = appointmentRepository.save(appointmentEntity);
        BeanUtils.copyProperties(appointmentEntity, appointment);
        return appointment;
    }

    @Override
    public Page<Appointment> getList(int curr, int limit, Date orderDate, Status status, String location) {
        Pageable pageable = new PageRequest(curr - 1, limit);
        List<Appointment> list = new ArrayList();
        AppointmentEntity condition = new AppointmentEntity();
        condition.setOrderDate(orderDate);
        condition.setStatus(status);
        condition.setProvince(location);
        Example<AppointmentEntity> example = Example.of(condition);
        Page<AppointmentEntity> page = appointmentRepository.findAll(example, pageable);
        for (AppointmentEntity entity : page.getContent()) {
            Appointment appointment = new Appointment();
            BeanUtils.copyProperties(entity, appointment);
            list.add(appointment);
        }
        return new PageImpl<>(list, pageable, page.getTotalElements());
    }

    @Override
    public Appointment getAppointment(Long id){
        AppointmentEntity appointmentEntity = appointmentRepository.findById(id);
        Appointment appointment = new Appointment();
        BeanUtils.copyProperties(appointmentEntity,appointment);

        return appointment;
    }
}


