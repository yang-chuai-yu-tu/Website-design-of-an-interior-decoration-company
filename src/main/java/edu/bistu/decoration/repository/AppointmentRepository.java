package edu.bistu.decoration.repository;

import edu.bistu.decoration.entity.AppointmentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;

public interface AppointmentRepository extends JpaRepository<AppointmentEntity,Long> {
    AppointmentEntity findByOrderDateAndPhoneNum( Date orderDate,String phoneNum);

    AppointmentEntity findById(Long id);
}
