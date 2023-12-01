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
@Table(name="TB_BAGGAGE")
@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
@DynamicUpdate
@Where(clause = "DELETE_YN = 'N'")
@SQLDelete(sql = "UPDATE TB_BAGGAGE SET DELETE_YN = 'Y', DELETE_TIME=TO_CHAR(SYSDATE, 'YYYY-MM-DD HH24:MI:SS') WHERE BAG_NUMBER = ?")
public class BoardingPass {
    @Id
    private String seatNumber;
    private String seatType;
    private String checkYn;
    private Integer bagCount;
    private String bagYn;


}
