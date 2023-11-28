package com.example.back.model.entity.reserve;

import com.example.back.model.common.BaseTimeEntity;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.Date;

/**
 * packageName : com.example.back.model.entity.reserve
 * fileName : OperationInfo
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
@Entity
@Table(name="OPERATION_INFO")
@SequenceGenerator(
        name = "SQ_OPERATION_INFO_GENERATOR"
        , sequenceName = "SQ_OPERATION_INFO"
        , initialValue = 1
        , allocationSize = 1
)
@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
@DynamicUpdate
// soft delete
@Where(clause = "DELETE_YN = 'N'")
@SQLDelete(sql = "UPDATE OPERATION_INFO SET DELETE_YN = 'Y', DELETE_TIME=TO_CHAR(SYSDATE, 'YYYY-MM-DD HH24:MI:SS') WHERE OPERATION_ID = ?")
public class OperationInfo extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,
            generator = "SQ_OPERATION_INFO_GENERATOR")

    private Integer operationId;
    private String airline;
    private String flightName;
    private String startAirport;
    private String finalAirport;
    private String startTime;   //datetime
    private String finalTime;   //datetime
    private String operationDate;
    private Date startDate;   //date
    private Date finalDate;   //date
    private String domesticInternational;
    private Integer price;





}
