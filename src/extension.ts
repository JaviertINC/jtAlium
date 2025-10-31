// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { CommandService } from './core/services/commandService';
import { WorkspaceColorProvider } from './views/workspace-color/WorkspaceColorProvider';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('[jtAlium] ¡Todo bien!');

	// Register the open workspace color command
	const openWorkspaceColorDisposable = CommandService.registerOpenWorkspaceColorCommand();

	// Register the workspace color provider
	const workspaceColorProvider = new WorkspaceColorProvider(context.extensionUri);
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(workspaceColorProvider.viewType, workspaceColorProvider)
	);

	context.subscriptions.push(openWorkspaceColorDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
