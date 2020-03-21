package edu.bistu.decoration.service;

import edu.bistu.decoration.domain.Tip;
import org.springframework.data.domain.Page;

import java.util.List;

public interface TipService {
    Tip saveTip(Tip tip);

    List<Tip> getTips();

    Tip getTip(Long id);

    Page<Tip> getList(int curr, int limit);

    void deleteTip(Long id);
}
