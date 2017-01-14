import {
    reduce, isNumber, flow,
    split, map, join, compact
} from 'lodash/fp';

// Utility function to count the number of pressed inputs of the given collection
export function countPressed(inputs) {
    return reduce((result, { pressed }) => result + (pressed ? 1 : 0), 0, inputs);
}

// Utility function to render to HTML all inputs divided by type
export function renderRows(params) {
    return reduce((result, { displayName, inputType, compilation }) => `${result}
        <div class="row">
            <span class="input-type">${displayName}:</span>
            ${flow(
                split(', '),
                compact,
                map(value => `<span class="${inputType}">${value}</span>`),
                join('')
            )(compilation)}
        </div>`, '', params);
}

// Utility function to print the state of all activated inputs of a type
export function stringifyInputs(player, inputType) {
    return reduce((result, inputName) => {
        const input = player[inputType][inputName];

        if (input.pressed || input.justChanged) {
            if (isNumber(input.value)) {
                return `${result} ${inputName}: ${input.pressed ? 'pressed' : 'released'}(${input.value}),`;
            }

            const [x, y] = input.value;
            return `${result} ${inputName}: ${input.pressed ? 'pressed' : 'released'}(x: ${x}, y: ${y}),`;
        }

        return result;
    }, '', Object.keys(player[inputType])).slice(0, -1);
}

// Utility function to print the state of all inputs of a type
export function stringifyAggregators(player) {
    return reduce((result, aggregatorName) => {
        const stuff = player.aggregators[aggregatorName];

        if (!!stuff && !!stuff.value) {
            return `${result} ${aggregatorName}: ${stuff.value},`;
        }

        return result;
    }, '', Object.keys(player.aggregators)).slice(0, -1);
}
