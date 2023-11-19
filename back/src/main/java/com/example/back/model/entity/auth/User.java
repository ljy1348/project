package com.example.back.model.entity.auth;

import com.example.back.model.common.BaseTimeEntity;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

/**
 * packageName : com.example.simpledms.repository.auth
 * fileName : User
 * author : GGG
 * date : 2023-11-14
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-14         GGG          최초 생성
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="BS_USER_INFORMATION")
@DynamicInsert
@DynamicUpdate
@ToString
// soft delete
@Where(clause = "DELETE_YN = 'N'")
@SQLDelete(sql = "UPDATE BS_USER_INFORMATION SET DELETE_YN = 'Y', DELETE_TIME=TO_CHAR(SYSDATE, 'YYYY-MM-DD HH24:MI:SS') WHERE USER_ID = ?")
public class User extends BaseTimeEntity {

    @Id
    private String userId;
    @Column(unique = true)
    private String userPassword;
    private String userName;
    private String enName;
    private String userEmail;
    private String userPhone;
    private String userSex;
    private String userAdd;
    private ERole right;
    private String birthDate;
    private String userNationality;
    private int milePoint;

    public User(String userId, String userPassword, String userName) {
        this.userId = userId;
        this.userPassword = userPassword;
        this.userName = userName;
    }

    public User(String userId, String userPassword, String userName, ERole right) {
        this.userId = userId;
        this.userPassword = userPassword;
        this.userName = userName;
        this.right = right;
    }

    public User(String userId, String userPassword, String userName, String userEmail, String userAdd, String userPhone, String userSex, String userNationality, String birthDate, String enName) {
        this.userId = userId;
        this.userPassword = userPassword;
        this.userName = userName;
        this.right = right;
        this.birthDate = birthDate;
        this.enName = enName;
        this.userAdd = userAdd;
        this.userPhone = userPhone;
        this.userSex = userSex;
        this.userNationality = userNationality;
        this.userEmail = userEmail;
        this.milePoint = 0;
    }
}
