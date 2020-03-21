package edu.bistu.decoration.service;

import edu.bistu.decoration.domain.Activity;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ActivityService {
    Activity saveActivity(Activity activity);

    List<Activity> getBanners();

    Page<Activity> getList(int curr, int limit, String flag);

    Activity getActivity(Long id);

    void deleteActivity(Long id);
}
