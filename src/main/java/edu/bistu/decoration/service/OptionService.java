package edu.bistu.decoration.service;

import edu.bistu.decoration.domain.Option;
import org.springframework.data.domain.Page;

import java.util.List;

public interface OptionService {
    Option saveOption(Option option);

    void update(String name, Long id);

    Page<Option> getList(int curr, int limit);

    Option getOption(Long id);

    void deleteOption(Long id);
}
