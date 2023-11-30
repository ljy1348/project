package com.example.back.model.dto.searchReservation;

import lombok.*;

/**
 * packageName : com.example.back.model.dto.searchReservation
 * fileName : SearchNonMemberDto
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

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SearchNonMemberDto {
    int airlineReservationNumber;
    String startAirport;
    String finalAirport;
    String memberName;
}
