package edu.bistu.decoration.service;


import edu.bistu.decoration.domain.CaseInfo;
import edu.bistu.decoration.domain.Vcase;
import edu.bistu.decoration.domain.Vcasedetail;
import org.springframework.data.domain.Page;

import java.util.List;

public interface CaseService {
    CaseInfo saveCase(CaseInfo caseInfo);

    Vcasedetail getCases(Long id);

    List<Vcase> getCases2(String style, Integer bedroomnum, Integer area1, Integer area2);

    List<Vcase> getCases3(Long id);

    Page<CaseInfo> getList(int curr, int limit, String style);

    CaseInfo getCases4(Long id);

    void deleteCase(Long id);
}
