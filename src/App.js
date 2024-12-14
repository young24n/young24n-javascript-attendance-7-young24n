import { MissionUtils } from '@woowacourse/mission-utils';
import InputView from './InputView.js';
import OutputView from './OutputView.js';
import ReadFile from './ReadFile.js';
import Student from './Student.js';

class App {
  constructor() {
    this.outputView = new OutputView();
    this.inputView = new InputView();
    this.readFile = new ReadFile();
    this.student = new Student();

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


  async attendanceSystem() {
    while(true) {
      try {
        const MONTH = MissionUtils.DateTimes.now().getMonth()+1;
        const DATE = MissionUtils.DateTimes.now().getDate();
        const DAY = MissionUtils.DateTimes.now().getDay();
    
        this.readFile.readAttendances();
        const STUDENTS = this.readFile.dataCleansing();
    
        this.outputView.printOutput(`오늘은 ${MONTH}월 ${DATE}일 ${this.DAY_DATA.get(DAY)}입니다. 기능을 선택해주세요.`);
        
        const SELECT_MENU = await this.inputView.printInput(`1. 출석 확인\n2. 출석 수정\n3. 크루별 출석 기록 확인\n4. 제적 위험자 확인\nQ. 종료\n`);
        // 메뉴 입력 기능---
        
        if (SELECT_MENU === '1') {
          //if (this.holiday.some(date => date === DATE)) {
            //this.outputView.printError(`${MONTH}월 ${DATE}일 ${this.DAY_DATA.get(DAY)}은 등교하는 날이 아닙니다.`);
          //}
    
          STUDENTS.push(await this.attendanceCheck(MONTH, DATE, DAY, STUDENTS));
        }
        else if (SELECT_MENU === '2') {

        }
        else if (SELECT_MENU === '3') {
          await this.checkAttendanceList(STUDENTS);
        }
        else if (SELECT_MENU === '4') {
          
        }
        else if (SELECT_MENU === 'Q') {
          return 0;
        }    
        else {
          this.outputView.printError('잘못된 형식을 입력하였습니다.');
        }
      } catch (error) {
        MissionUtils.Console.print(error.message);
      }
    }
  }

  async checkAttendanceList(students) {
    const NAME = await this.inputView.printInput('닉네임을 입력해주세요.\n');
    const FILTERED_STUDENT = students.filter((student) => student.nickName === NAME);

    FILTERED_STUDENT.forEach((student) => {
      this.outputView.printOutput(`${student.month}월 ${student.day}일 ${this.DAY_DATA.get(new Date(student.dateTime).getDay())} ${student.hour}:${student.min} ${student.state}`);
    })

  }

  async attendanceCheck(MONTH,DATE,DAY,student) {
    const YEAR = MissionUtils.DateTimes.now().getFullYear();
    const NAME = await this.inputView.printInput('닉네임을 입력해주세요.\n');
    this.validateName(student, NAME);
    const ATTENDANCE_TIME = await this.inputView.printInput('등교시간을 입력해주세요.\n');
    const [ATTENDANCE_HOUR, ATTENDANCE_MIN] = ATTENDANCE_TIME.split(':').map(Number);
    let attendanceState = '출석';
    
    if(ATTENDANCE_HOUR > 24 || ATTENDANCE_MIN > 60 || /[^\d]{1,}/.test(ATTENDANCE_HOUR) || /[^\d]{1,}/.test(ATTENDANCE_MIN) ) {
      this.outputView.printError('잘못된 형식을 입력하였습니다.');
    }
    if(ATTENDANCE_HOUR > 23 || ATTENDANCE_HOUR < 8 ) {
      this.outputView.printError('캠퍼스 운영 시간에만 출석이 가능합니다.');
    }

    if (DAY === 1 && (ATTENDANCE_HOUR > 13 || ATTENDANCE_MIN > 5)) {
      attendanceState = '지각';
      if ((ATTENDANCE_HOUR > 13 || ATTENDANCE_MIN > 30)) {
        attendanceState = '결석';
      }
    }
    if (DAY === 2 && (ATTENDANCE_HOUR > 10 || ATTENDANCE_MIN > 5)) {
      attendanceState = '지각';
      if ((ATTENDANCE_HOUR > 10 || ATTENDANCE_MIN > 30)) {
        attendanceState = '결석';
      }
    }
    if (DAY === 3 && (ATTENDANCE_HOUR > 10 || ATTENDANCE_MIN > 5)) {
      attendanceState = '지각';
      if ((ATTENDANCE_HOUR > 10 || ATTENDANCE_MIN > 30)) {
        attendanceState = '결석';
      }
    }
    if (DAY === 4 && (ATTENDANCE_HOUR > 10 || ATTENDANCE_MIN > 5)) {
      attendanceState = '지각';
      if ((ATTENDANCE_HOUR > 10 || ATTENDANCE_MIN > 30)) {
        attendanceState = '결석';
      }
    }
    if (DAY === 5 && (ATTENDANCE_HOUR > 10 || ATTENDANCE_MIN > 5)) {
      attendanceState = '지각';
      if ((ATTENDANCE_HOUR > 10 || ATTENDANCE_MIN > 30)) {
        attendanceState = '결석';
      }
    }

    this.outputView.printOutput(`${MONTH}월 ${DATE}일 ${this.DAY_DATA.get(DAY)} ${ATTENDANCE_TIME} (${attendanceState})`);
    
    return new Student(NAME, `${YEAR}-${MONTH}-${DATE} ${ATTENDANCE_TIME}`);
  }

  validateName(students, name) {
    let studentNameList = [];

    students.forEach(student => {
      studentNameList.push(student);
    })

    if (!studentNameList.some(studentName => studentName.nickName === name)) {
      this.outputView.printError('등록되지 않은 닉네임입니다.');
    }
  }

  async run() {
    try {      
      this.attendanceSystem();
      
    } catch(error) {
      MissionUtils.Console.print(error.message);
    }
  }
}

export default App;
