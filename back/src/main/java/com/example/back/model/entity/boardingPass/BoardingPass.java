package com.example.back.model.entity.boardingPass;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;

/**
 * packageName : com.example.back.model.entity.boardinPpass
 * fileName : BoardingPass
 * author : GGG
 * date : 2023-11-30
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-30         GGG          최초 생성
 */
@Entity
@Table(name="TB_CHECKIN")
@SequenceGenerator(
        name = "CHECKIN_SEQ_GENERATOR"
        , sequenceName = "CHECKIN_SEQ"
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
@Where(clause = "DELETE_YN = 'N'")
@SQLDelete(sql = "UPDATE TB_CHECKIN SET DELETE_YN = 'Y', DELETE_TIME=TO_CHAR(SYSDATE, 'YYYY-MM-DD HH24:MI:SS') WHERE CHECK_ID = ?")
public class BoardingPass {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE
            , generator = "CHECKIN_SEQ_GENERATOR"
    )
    private String seatType;
    private String seatNumber;
    private Integer airlineReservationNumber;

}
