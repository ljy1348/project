package com.example.back.model.entity.reserve;

import com.example.back.model.common.BaseTimeEntity;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;

/**
 * packageName : com.example.back.model.entity.reserve
 * fileName : Reservation
 * author : GGG
 * date : 2023-11-27
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-27         GGG          최초 생성
 */
@Entity
@Table(name="TB_RESERVATION")
@SequenceGenerator(
        name = "SQ_RESERVATION_GENERATOR"
        , sequenceName = "SQ_RESERVATION"
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
@SQLDelete(sql = "UPDATE TB_RESERVATION SET DELETE_YN = 'Y', DELETE_TIME=TO_CHAR(SYSDATE, 'YYYY-MM-DD HH24:MI:SS') WHERE OperationId = ?")
public class Reservation extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,
            generator = "SQ_RESERVATION_GENERATOR")

    private Integer airlineReservaitonNumber;
    private String adultCount;
    private String childCount;
    private String mileUseYn;
    private String seatType;
    private String memberYn;
    private String memberId;
    private Integer userNumber;
    private Integer operationId;
    private String checkYn;

}
