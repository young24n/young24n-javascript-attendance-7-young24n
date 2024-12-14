import { MissionUtils } from '@woowacourse/mission-utils';
import OutputView from './OutputView.js';

    class Student {
        constructor(nickName, dateTime) {
            this.outputView = new OutputView()
            this.nickName = nickName
            this.dateTime = dateTime
        }
    }
    
    export default Student;