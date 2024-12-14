import { MissionUtils } from '@woowacourse/mission-utils';
import OutputView from './OutputView.js';

    class Student {
        constructor(nickName, dateTime) {
            this.outputView = new OutputView();
            this.nickName = nickName;
            this.dateTime = dateTime;
            this.state = '';
               
        }

        stateReturn(dateTime, ) {
            const [ATTENDANCE_YEAR, ATTENDANCE_TIME] = dateTime.split(' ');
            const [ATTENDANCE_HOUR, ATTENDANCE_MIN] = ATTENDANCE_TIME.split(':').map(Number);
            const DAY = new Date(ATTENDANCE_YEAR).getDay();
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
            this.state = attendanceState;
        }
    }

    export default Student;