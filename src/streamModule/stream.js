import memoize from 'fast-memoize';
import { assignIn, mapValues, forEach } from 'lodash/fp';
import { Subject } from 'rxjs';

import createBaseModule from '../baseModule/base';

import { buttonMap, stickMap } from '../common/utils';

export default function createStreamModule(params = {}) {
    const { state, module: baseModule } = createBaseModule(params);

    const buttonMapMemoized = memoize(buttonMap);
    const stickMapMemoized = memoize(stickMap);

    const buttonStream = new Subject().map(a => a());
    const stickStream = new Subject().map(a => a());

    const buttonStreamMap = {};
    const stickStreamMap = {};

    const updateStream = streamMap => streamMap.stream.next(streamMap.updateFn);

    const mapButtons = () => mapValues(
        button => buttonMapMemoized(
            state.pad,
            state.prevPad,
            button,
            state.threshold,
            state.clampThreshold
        ),
        state.buttons
    );

    const mapSticks = () => mapValues(
        stick => stickMapMemoized(
            state.pad,
            state.prevPad,
            stick.indexes,
            stick.inverts,
            state.threshold,
            state.clampThreshold
        ),
        state.sticks
    );

    const module = assignIn(baseModule, {
        ...baseModule,

        getButtonStream: buttonName => {
            if (!buttonName) {
                return buttonStream;
            }

            if (state.buttons[buttonName]) {
                if (!buttonStreamMap[buttonName]) {
                    buttonStreamMap[buttonName] = {
                        stream: new Subject().map(a => a()),
                        updateFn: () => buttonMapMemoized(
                            state.pad,
                            state.prevPad,
                            state.buttons[buttonName],
                            state.threshold,
                            state.clampThreshold
                        )
                    };
                }

                return buttonStreamMap[buttonName].stream;
            }

            return null;
        },

        getStickStream: stickName => {
            if (!stickName) {
                return stickStream;
            }

            if (state.sticks[stickName]) {
                if (!stickStreamMap[stickName]) {
                    stickStreamMap[stickName] = {
                        stream: new Subject().map(a => a()),
                        updateFn: () => stickMapMemoized(
                            state.pad,
                            state.prevPad,
                            state.sticks[stickName].indexes,
                            state.sticks[stickName].inverts,
                            state.threshold,
                            state.clampThreshold
                        )
                    };
                }

                return stickStreamMap[stickName].stream;
            }

            return null;
        },

        update: gamepad => {
            baseModule.update(gamepad);

            buttonStream.next(mapButtons);
            stickStream.next(mapSticks);
            forEach(updateStream, buttonStreamMap);
            forEach(updateStream, stickStreamMap);
        },

        destroy: () => {
            baseModule.destroy();

            buttonStream.dispose();
            stickStream.dispose();
            forEach(({ stream }) => stream.dispose(), buttonStreamMap);
            forEach(({ stream }) => stream.dispose(), stickStreamMap);
        }
    });

    return module;
}
