// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "jumptofunction" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let prevDisposable = vscode.commands.registerCommand(
    "extension.jumpToPrevFunction",
    () => {
      jumpToPrevFunction();
    }
  );

  let nextDisposable = vscode.commands.registerCommand(
    "extension.jumpToNextFunction",
    () => {
      jumpToNextFunction();
    }
  );

  context.subscriptions.push(prevDisposable);
  context.subscriptions.push(nextDisposable);
}

function jumpToPrevFunction() {
  // Get the currently active text editor
  const editor = vscode.window.activeTextEditor;

  if (editor) {
    const document = editor.document;
    const currentPosition = editor.selection.active;
    const currentLine = document.lineAt(currentPosition);

    // Find the position of the current line within the document
    const currentLineIndex = document.lineAt(currentPosition).lineNumber;

    // Loop through lines from the current line to the beginning of the document
    for (let lineIndex = currentLineIndex - 1; lineIndex >= 0; lineIndex--) {
      const line = document.lineAt(lineIndex);
      const lineText = line.text.trim();

      // Check if the line contains a function declaration
      if (
        lineText.startsWith("function") ||
        lineText.startsWith("async function")
      ) {
        // Move the cursor to the start of the function
        const newPosition = new vscode.Position(line.lineNumber, 0);
        const newSelection = new vscode.Selection(newPosition, newPosition);
        editor.selection = newSelection;
        editor.revealRange(
          new vscode.Range(newPosition, newPosition),
          vscode.TextEditorRevealType.InCenter
        );
        break; // Stop searching after finding the previous function
      }
    }
  }
}

function jumpToNextFunction() {
  // Get the currently active text editor
  const editor = vscode.window.activeTextEditor;

  if (editor) {
    const document = editor.document;
    const currentPosition = editor.selection.active;
    const currentLine = document.lineAt(currentPosition);

    // Find the position of the current line within the document
    const currentLineIndex = document.lineAt(currentPosition).lineNumber;

    // Loop through lines from the current line to the end of the document
    for (
      let lineIndex = currentLineIndex + 1;
      lineIndex < document.lineCount;
      lineIndex++
    ) {
      const line = document.lineAt(lineIndex);
      const lineText = line.text.trim();

      // Check if the line contains a function declaration
      if (
        lineText.startsWith("function") ||
        lineText.startsWith("async function")
      ) {
        // Move the cursor to the start of the function
        const newPosition = new vscode.Position(line.lineNumber, 0);
        const newSelection = new vscode.Selection(newPosition, newPosition);
        editor.selection = newSelection;
        editor.revealRange(
          new vscode.Range(newPosition, newPosition),
          vscode.TextEditorRevealType.InCenter
        );
        break; // Stop searching after finding the next function
      }
    }
  }
}

// This method is called when your extension is deactivated
export function deactivate() {}
