import { MissionUtils } from '@woowacourse/mission-utils';
import InputView from './InputView.js';
import OutputView from './OutputView.js';

class App {
  constructor() {
    this.outputView = new OutputView();
    this.inputView = new InputView();

    this.DAY_DATA = new Map([
      [0, '일요일'],
      [1, '월요일'],
      [2, '화요일'],
      [3, '수요일'],
      [4, '목요일'],
      [5, '금요일'],
      [6, '토요일'],
    ]);

    this.holiday = [1,7,8,14,15,21,22,25,28,29];
  }



  attendanceSystem() {
    const MONTH = MissionUtils.DateTimes.now().getMonth()+1;
    const DAYE = MissionUtils.DateTimes.now().getDate();
    const TIME = MissionUtils.DateTimes.now().getTime();
    const DAY = MissionUtils.DateTimes.now().getDay();

    console.log(DAY);
    this.outputView.printOutput(`오늘은 ${MONTH}월 ${DAYE}일 ${this.DAY_DATA.get(DAY)}입니다. 기능을 선택해주세요.`);
    
    const SELECT_NUMBER = this.inputView.printInput(`1. 출석 확인\n2. 출석 수정\n3. 크루별 출석 기록 확인\n4. 제적 위험자 확인\nQ. 종료\n`);
    // 메뉴 입력 기능---
    
    

  }

  async run() {
    try {
      this.attendanceSystem()
    } catch(error) {
      MissionUtils.Console.print(error.message);
    }
  }
}

export default App;
