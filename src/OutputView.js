import { MissionUtils } from '@woowacourse/mission-utils';

class OutputView {
    printOutput(message) {
        MissionUtils.Console.print(message);
    }
    
    printError(error) {
        throw new Error(`[ERROR] ${error}`);
    }
}

export default OutputView;