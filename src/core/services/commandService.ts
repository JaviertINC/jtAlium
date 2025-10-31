 import * as vscode from 'vscode';

export class CommandService {
    public static registerOpenWorkspaceColorCommand(): vscode.Disposable {
        return vscode.commands.registerCommand('jt-alium.openWorkspaceColor', () => {
            vscode.commands.executeCommand('workbench.view.extension.jt-alium-container', 'jt-alium.workspace-color');
        });
    }
}