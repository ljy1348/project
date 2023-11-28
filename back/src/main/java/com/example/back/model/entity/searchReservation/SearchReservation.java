package com.example.back.model.entity.searchReservation;

import com.example.back.model.common.BaseTimeEntity;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;

/**
 * packageName : com.example.back.model.SearchReservation
 * fileName : SearchReservation
 * author : GGG
 * date : 2023-11-17
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-17         GGG          최초 생성
 */
@Entity
@Table(name = "TB_RESERVATION")
@SequenceGenerator(
        name = "SQ_RESERVATION_GENERATOR"
        , sequenceName = "SQ_RESERVATION"
        , initialValue = 1
        , allocationSize = 1
)
@Setter
@Getter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
@DynamicUpdate
// soft delete
@Where(clause = "DELETE_YN = 'N'")
@SQLDelete(sql = "UPDATE TB_RESERVATION SET DELETE_YN = 'Y', DELETE_TIME=TO_CHAR(SYSDATE, 'YYYY-MM-DD HH24:MI:SS') WHERE AIRLINE_RESERVATION_NUMBER = ? ")
public class SearchReservation extends BaseTimeEntity {

    //    기본키 : 예약 번호
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE
            , generator = "SQ_RESERVATION_GENERATOR"
    )
    @Column
    private Integer airlineReservationNumber;

    //    성인 인수
    @Column
    private String adultCount;

    //    소아 인수
    @Column
    private String childCount;

    //    마일리지 사용 여부
    @Column
    private String mileUseYn;

    //    좌석 등급
    @Column
    private String seatType;

    //    회원 여부
    @Column
    private String memberYn;

    //    체크인 여부
    @Column
    private String checkYn;

    //    회원 ID
    @Column
    private String memberId;

    //    비회원 번호
    @Column
    private Integer userNumber;

    //    운항 번호
    @Column
    private Integer operationId;
}

