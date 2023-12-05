package com.example.back.model.dto.checkin;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * packageName : com.example.back.model.dto.checkin
 * fileName : CheckgetDto
 * author : GGG
 * date : 2023-12-01
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-12-01         GGG          최초 생성
 */
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class CheckgetDto {


    Integer airlineReservationNumber;
    String seatNumber;
    Integer userNumber;
    String userName;
    String adultCount;
    String childCount;
}
