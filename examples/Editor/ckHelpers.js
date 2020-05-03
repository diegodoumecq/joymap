export function setCursor(editorRef, direction) {
  editorRef.current.model.change((writer) => {
    if (direction === 'backward' || direction === 'forward') {
      // move text cursor left or right
      writer.model.modifySelection(writer.model.document.selection, { direction });

      const curr =
        direction === 'backward'
          ? writer.model.document.selection.getFirstPosition()
          : writer.model.document.selection.getLastPosition();
      writer.setSelection(writer.createPositionFromPath(curr.root, curr.path));
    } else {
      // move text cursor to start or end of doc
      // TODO: figure out how to actually move it only one line at a time
      writer.setSelection(
        writer.createPositionAt(
          editorRef.current.model.document.getRoot(),
          direction === 'downward' ? 'end' : 0,
        ),
      );
    }
  });
}

export function setSelection(editorRef, direction) {
  editorRef.current.model.change((writer) => {
    if (direction === 'backward' || direction === 'forward') {
      // move text cursor left or right
      writer.model.modifySelection(writer.model.document.selection, { direction });
    } else {
      // move selection cursor to start or end of doc
      // TODO: figure out how to actually move the selection only one line at a time
      const start = direction === 'downward' ? writer.model.document.selection.getFirstPosition() : writer.createPositionAt(
        editorRef.current.model.document.getRoot(),
       0
      );
      const end = direction === 'downward' ? writer.createPositionAt(
        editorRef.current.model.document.getRoot(),
       'end'
      ) : writer.model.document.selection.getLastPosition();
      const range = writer.createRange(start, end);

      writer.setSelection(range);
    }
  });
}

export function executeCommand(editorRef, command, options) {
  if (command === 'move') {
    setCursor(editorRef, options);
  } else if (command === 'select') {
    setSelection(editorRef, options);
  } else {
    if (options) {
      editorRef.current.execute(command, typeof options === 'function' ? options() : options);
    } else {
      editorRef.current.execute(command);
    }
  }
}
