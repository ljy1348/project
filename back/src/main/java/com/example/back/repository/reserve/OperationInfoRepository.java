package com.example.back.repository.reserve;

import com.example.back.model.entity.reserve.OperationInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

/**
 * packageName : com.example.back.repository.reserve
 * fileName : OperationInfoRepository
 * author : GGG
 * date : 2023-11-22
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-22         GGG          최초 생성
 */
@Repository
public interface OperationInfoRepository extends JpaRepository<OperationInfo, Integer> {
    @Query(value = "select * from OPERATION_INFO " +
            "where (operation_DATE = '매일' or operation_DATE LIKE '%' || :operationDate || '%' ) " +
            "and Start_Airport LIKE '%' || :startAirport || '%' " +
            "and Final_Airport LIKE '%' || :finalAirport || '%' " +
            "and start_date < :sysdate " +
            "and final_date > :sysdate and delete_yn = 'N'",
            nativeQuery = true)
    Page<OperationInfo> selectOperationInfo(@Param("operationDate") String operationDate,
                                            @Param("startAirport") String startAirport,
                                            @Param("finalAirport") String finalAirport,
                                            @Param("sysdate") Date sysdate,
                                            Pageable pageable
    );

    Page<OperationInfo> findAllByStartAirportContainingOrderByOperationId(String startAirport, Pageable pageable);
    Page<OperationInfo> findAllByFinalAirportContainingOrderByOperationId(String finalAirport, Pageable pageable);
    Page<OperationInfo> findAllByAirlineContainingOrderByOperationId(String airline, Pageable pageable);
    Page<OperationInfo> findAllByFlightNameContainingOrderByOperationId(String flightName, Pageable pageable);
    Page<OperationInfo> findAllByOperationIdEqualsOrderByOperationId(Integer operationId, Pageable pageable);
    Page<OperationInfo> findAllByOrderByOperationId(Pageable pageable);


}
