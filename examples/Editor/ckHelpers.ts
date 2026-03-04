import { ClassicEditor, Model } from 'ckeditor5/dist';
import { CommandValue } from './commands';

export function setCursor(model: Model | undefined, direction?: CommandValue) {
  model?.change((writer) => {
    if (direction === 'backward' || direction === 'forward') {
      writer.model.modifySelection(writer.model.document.selection, { direction });

      const curr =
        direction === 'backward'
          ? writer.model.document.selection.getFirstPosition()
          : writer.model.document.selection.getLastPosition();
      if (curr) {
        writer.setSelection(writer.createPositionFromPath(curr.root, curr.path));
      }
    } else {
      const root = model.document.getRoot();
      if (root) {
        writer.setSelection(writer.createPositionAt(root, direction === 'downward' ? 'end' : 0));
      }
    }
  });
}

export function setSelection(model: Model | undefined, direction?: CommandValue) {
  model?.change((writer) => {
    if (direction === 'backward' || direction === 'forward') {
      writer.model.modifySelection(writer.model.document.selection, { direction });
    } else {
      const root = model.document.getRoot();
      if (root) {
        const start =
          direction === 'downward'
            ? writer.model.document.selection.getFirstPosition()
            : writer.createPositionAt(root, 0);
        const end =
          direction === 'downward'
            ? writer.createPositionAt(root, 'end')
            : writer.model.document.selection.getLastPosition();
        const range = writer.createRange(start!, end || undefined);

        writer.setSelection(range);
      }
    }
  });
}

export function executeCommand(
  editorRef: { current: ClassicEditor | null },
  commandName: string,
  value?: CommandValue,
) {
  if (commandName === 'move') {
    setCursor(editorRef.current?.model, value);
  } else if (commandName === 'select') {
    setSelection(editorRef.current?.model, value);
  } else {
    if (value) {
      editorRef.current?.execute(commandName, typeof value === 'function' ? value() : value);
    } else {
      editorRef.current?.execute(commandName);
    }
  }
}
