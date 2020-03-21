package edu.bistu.decoration.service;

import edu.bistu.decoration.domain.Appointment;
import edu.bistu.decoration.domain.Status;
import org.springframework.data.domain.Page;

import java.util.Date;

public interface AppointmentService {
        Appointment saveAppointment(Appointment appointment);

        Page<Appointment> getList(int curr, int limit, Date orderDate, Status status, String location);

        Appointment getAppointment(Long id);
}
