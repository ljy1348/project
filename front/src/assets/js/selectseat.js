let seats = [
    [1,1,1,0,1,1,1],
    [1,1,1,0,1,1,1],
    [1,1,1,0,1,1,1],
    [1,1,1,0,1,1,1],
    [0,0,0,0,0,0,0],
    [1,1,1,0,1,1,1],
    [1,1,1,0,1,1,1],
    [1,1,1,0,1,1,1],
    [1,1,1,0,1,1,1],
    [0,0,0,0,0,0,0],
    [1,1,1,0,1,1,1],
    [1,1,1,0,1,1,1],
    [1,1,1,0,1,1,1],
    [1,1,1,0,1,1,1],
  ];
  let app = document.getElementById('app');
  let seatsDiv = document.getElementById('seats');
  let selectedSeatsDiv = document.getElementById('selected_seats');
  let selectedSeats = [];
  
  /**
   * onLoad
   */
  const onLoad = () => {
    createSeats();
  };
  
  /**
   * 좌석생성
   */
  const createSeats = () => {
    let container = document.createElement('div');
    let newSeat;
  
    seatsDiv.innerHTML = '';
    container.classList.add('line');
  
    // #1
    seats.map(function(xSeats, x) {
      // #2
      xSeats.map(function(ySeat, y){
        // 좌석 그리기
        newSeat = document.createElement('div');
        // 좌석 값 설정
        let style = '';
        if(ySeat === 1){
          style = 'enable';
        }else if(ySeat === 2){
          style = 'disable';
        }else if(ySeat === 3){
          style = 'soldout';
        }
  
        // 스타일값 여부에 따라 스타일 적용
        if(style){
          newSeat.classList.add('seat', style);
        }else {
          newSeat.classList.add('seat');
        }
  
        
        if(style === 'enable'){
          newSeat.addEventListener('click', handleClickSeat)
        }
        newSeat.data = {x, y, value: ySeat}
        // 줄에 좌석 추가
        container.appendChild(newSeat);
      });// #2
    }); // #1
    // 줄 추가
    seatsDiv.appendChild(container);
  };
  
  
  /**
   * 좌석 클릭함수
   * --
   */
  const handleClickSeat = (event) => {
    let {x, y, value} = event.target.data
    // alert(seats[x][y]);
    if(value === 1){
      seats[x][y] = 2;
      event.target.classList.toggle('disable')
    }else if(value === 2){
      seats[x][y] = 1;
      event.target.classList.toggle('disable')
    }
    createSeats();
  }