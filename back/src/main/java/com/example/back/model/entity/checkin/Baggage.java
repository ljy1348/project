package com.example.back.model.entity.checkin;

import com.example.back.model.common.BaseTimeEntity;
import lombok.*;
import org.hibernate.Interceptor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

/**
 * packageName : com.example.back.model.entity.checkin
 * fileName : Baggage
 * author : GGG
 * date : 2023-11-29
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-29         GGG          최초 생성
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
public class Baggage extends BaseTimeEntity  {
    @Id
//    BAG_NUMBER	NUMBER(10,0)
//    BAG_COUNT	NUMBER(10,0)
//    BAG_AREA	NUMBER(10,0)
//    BAG_WEIGHT	NUMBER(10,0)
//    BAG_PRICE	NUMBER(10,0)
//    CHECK_ID	VARCHAR2(50 BYTE)
//    BAG_YN	CHAR(1 BYTE)
    private Integer bagNumber;
    private Integer bagCount;
    private Integer bagArea;
    private Integer bagWeight;
    private Integer bagPrice;
    private String checkId;
    private String bagYn;
}
