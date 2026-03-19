import { cleanupCode, makePckJson, tsconfig } from '../utils';
import CanvasRendererCode from './canvasRenderer.ts?raw';
import ColorEditorCode from './colorEditor.ts?raw';
import DateEditorCode from './dateEditor.ts?raw';
import FocusUtilsCode from './focusUtils.ts?raw';
import ImgToCheckboxesCode from './imgToCheckboxes.ts?raw';
import NavigationHTML from './index.html?raw';
import NavigationCode from './index.ts?raw';
import NumberEditorCode from './numberEditor.ts?raw';
import PixelArtCode from './pixelArt.ts?raw';
import RangeEditorCode from './rangeEditor.ts?raw';
import RepeatUtilsCode from './repeatUtils.ts?raw';
import ScrollUtilsCode from './scrollUtils.ts?raw';
import SelectEditorCode from './selectEditor.ts?raw';
import VoiceUtilsCode from './voiceUtils.ts?raw';

export const navigationFiles = {
  'index.ts': cleanupCode(NavigationCode),
  'index.html': NavigationHTML,
  'canvasRenderer.ts': cleanupCode(CanvasRendererCode),
  'colorEditor.ts': cleanupCode(ColorEditorCode),
  'dateEditor.ts': cleanupCode(DateEditorCode),
  'focusUtils.ts': cleanupCode(FocusUtilsCode),
  'numberEditor.ts': cleanupCode(NumberEditorCode),
  'rangeEditor.ts': cleanupCode(RangeEditorCode),
  'selectEditor.ts': cleanupCode(SelectEditorCode),
  'repeatUtils.ts': cleanupCode(RepeatUtilsCode),
  'scrollUtils.ts': cleanupCode(ScrollUtilsCode),
  'pixelArt.ts': cleanupCode(PixelArtCode),
  'imgToCheckboxes.ts': cleanupCode(ImgToCheckboxesCode),
  'voiceUtils.ts': cleanupCode(VoiceUtilsCode),
  'package.json': makePckJson({
    hasLodash: false,
    hasReact: false,
  }),
  'tsconfig.json': tsconfig,
};
