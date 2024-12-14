import { MissionUtils } from '@woowacourse/mission-utils';

class InputView {
    printInput(message) {
        return MissionUtils.Console.readLineAsync(message);
    }
}

export default InputView;