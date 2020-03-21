package edu.bistu.decoration.service;

import edu.bistu.decoration.domain.Designer;
import edu.bistu.decoration.domain.Vdesigner;
import org.springframework.data.domain.Page;

import java.util.List;

public interface DesignerService {
    Designer saveDesigner(Designer designer);

    Vdesigner getDesigner(Long id);

    List<Vdesigner> getDesigner2(String style, String rank);

    Page<Designer> getList(int curr, int limit, String rank);

    Designer getDesigner3(Long id);

    void deleteDesigner(Long id);
}
