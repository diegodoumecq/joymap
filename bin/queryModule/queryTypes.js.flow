import type {
    IModule,
    IButtonState, IButtonStates,
    IStickState, IStickStates
} from '../common/types';

export type IMapperValue = any;
export type IMapperValues = { [index: string]: IMapperValue };
export type IMapper = () => IMapperValue;
export type IMappers = { [key: string]: IMapper };

export type IQueryModule = IModule & {
    getButtons: (...names: string[]) => IButtonState | IButtonStates,
    getSticks: (...names: string[]) => IStickState | IStickStates,
    getMappers: (...names: string[]) => IMapperValue | IMapperValues,

    removeMapper: (mapperName: string) => void,
    clearMappers: () => void,
    setMapper: (mapperName: string, callback: IMapper) => void
};
