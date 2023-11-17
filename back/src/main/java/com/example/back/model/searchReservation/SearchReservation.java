package com.example.back.model.searchReservation;

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
@Table(name = "TB_BS_RESERVATION")
@SequenceGenerator(
        name = "SQ_BS_RESERVATION_GENERATOR"
        , sequenceName = "SQ_BS_RESERVATION"
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
@SQLDelete(sql = "UPDATE TB_BS_RESERVATION SET DELETE_YN = 'Y', DELETE_TIME=TO_CHAR(SYSDATE, 'YYYY-MM-DD HH24:MI:SS') WHERE AIRLINE_RESERVATION_NUMBER = ? ")
public class SearchReservation extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE
            , generator = "SQ_BS_RESERVATION_GENERATOR"
    )
    @Column
    private String airlineReservationNumber;

    @Column
    private String flightName;

    @Column
    private String userId;

    @Column
    private String roundOrOne;

    @Column
    private String enName;

    @Column
    private String departure;

    @Column
    private String arrival;

    @Column
    private String operationDay;

    @Column
    private String airline;

    @Column
    private String seatType;

    @Column
    private String adultCount;

    @Column
    private String childCount;

    @Column
    private String mileUseStatus;

    @Column
    private String membershipStatus;

    @Column
    private String domesticInternational;

    @Column
    private String startAirport;

    @Column
    private String finalAirport;
}
