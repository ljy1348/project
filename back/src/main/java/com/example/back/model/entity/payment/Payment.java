package com.example.back.model.entity.payment;


import com.example.back.model.common.BaseTimeEntity;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;

@Entity
@Table(name="TB_PAY_INFORMATION")
@SequenceGenerator(
        name = "SQ_PAY_INFORMATION_GENERATOR"
        , sequenceName = "SQ_PAY_INFORMATION"
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
@SQLDelete(sql = "UPDATE TB_PAY_INFORMATION SET DELETE_YN = 'Y', DELETE_TIME=TO_CHAR(SYSDATE, 'YYYY-MM-DD HH24:MI:SS') WHERE PAY_ID = ?")
public class Payment extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,
            generator = "SQ_PAY_INFORMATION_GENERATOR")
    private int payId;
    private String certifiedId;
    private String productCode;
    private int productPrice;
    private int productCount;
    private int operationId;
    private int milePrice;
    private String startReservationNumber;
    private String finalReservationNumber;

}
