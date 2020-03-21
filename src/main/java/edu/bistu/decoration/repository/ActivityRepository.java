package edu.bistu.decoration.repository;

import edu.bistu.decoration.entity.ActivityEntity;
import edu.bistu.decoration.entity.CaseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;


public interface ActivityRepository extends JpaRepository<ActivityEntity,Long> {
    //查找启用中的活动
    List<ActivityEntity> findByFlag(String flag);
    //后台用，按id查找活动
    ActivityEntity findById(Long id);
    //开启事务，修改，自己写nativeQuery语句
    @Transactional
    @Modifying
    @Query(value="delete from t_activity where id=?1",nativeQuery = true)
    //按id删除
    void delete( @Param(value = "id") Long id);
}
