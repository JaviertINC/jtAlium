import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { getPackageVersionUpdaterHtmlForWebview } from './html';
import { IWebviewProvider } from '../../core/interfaces/webviewProvider';

interface PackageInfo {
    name: string;
    version: string;
    path: string;
}

export class PackageVersionUpdaterProvider implements vscode.WebviewViewProvider, IWebviewProvider {
    public readonly viewType = 'jt-alium.package-version-updater';

    constructor(private readonly _extensionUri: vscode.Uri) {}

    public resolveWebviewView(
        webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext,
        _token: vscode.CancellationToken,
    ) {
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [
                this._extensionUri
            ]
        };

        webviewView.webview.html = getPackageVersionUpdaterHtmlForWebview(webviewView.webview, this._extensionUri);

        // Handle messages from the webview
        webviewView.webview.onDidReceiveMessage(
            async (message) => {
                switch (message.type) {
                    case 'getPackages':
                        await this.sendPackages(webviewView.webview);
                        break;
                    case 'updateVersion':
                        await this.updateVersion(message.packagePath, message.versionType, message.newVersion);
                        await this.sendPackages(webviewView.webview);
                        break;
                    case 'openPackageFile':
                        await this.openPackageFile(message.path);
                        break;
                }
            },
            undefined,
            []
        );
    }

    private async sendPackages(webview: vscode.Webview) {
        const packages = await this.findPackageJsonFiles();
        webview.postMessage({ type: 'packages', packages });
    }

    private async findPackageJsonFiles(): Promise<PackageInfo[]> {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            return [];
        }

        const packages: PackageInfo[] = [];
        const ignoredDirs = ['node_modules', 'vendor', '.git', '.svn', '.hg', 'dist', 'build'];

        for (const folder of workspaceFolders) {
            await this.scanDirectory(folder.uri.fsPath, packages, ignoredDirs);
        }

        // Sort packages: root package.json first, then others alphabetically
        return packages.sort((a, b) => {
            const aIsRoot = a.path === 'package.json';
            const bIsRoot = b.path === 'package.json';

            if (aIsRoot && !bIsRoot) {return -1;}
            if (!aIsRoot && bIsRoot) {return 1;}

            return a.path.localeCompare(b.path);
        });
    }

    private async scanDirectory(dirPath: string, packages: PackageInfo[], ignoredDirs: string[]): Promise<void> {
        try {
            const entries = await fs.promises.readdir(dirPath, { withFileTypes: true });

            for (const entry of entries) {
                const fullPath = path.join(dirPath, entry.name);

                if (entry.isDirectory()) {
                    if (!ignoredDirs.includes(entry.name)) {
                        await this.scanDirectory(fullPath, packages, ignoredDirs);
                    }
                } else if (entry.isFile() && entry.name === 'package.json') {
                    try {
                        const content = await fs.promises.readFile(fullPath, 'utf-8');
                        const packageJson = JSON.parse(content);
                        const relativePath = vscode.workspace.asRelativePath(fullPath);

                        packages.push({
                            name: packageJson.name || 'Unknown',
                            version: packageJson.version || '0.0.0',
                            path: relativePath
                        });
                    } catch (error) {
                        // Skip invalid package.json files
                    }
                }
            }
        } catch (error) {
            // Skip directories that can't be read
        }
    }

    private async updateVersion(packagePath: string, versionType: 'major' | 'minor' | 'patch', newVersion: number) {
        try {
            const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
            if (!workspaceFolder) {
                return;
            }

            const fullPath = vscode.Uri.joinPath(workspaceFolder.uri, packagePath).fsPath;
            const content = await fs.promises.readFile(fullPath, 'utf-8');
            const packageJson = JSON.parse(content);

            const currentVersion = packageJson.version || '0.0.0';
            const versionParts = currentVersion.split('.').map((v: string) => parseInt(v, 10));

            if (versionType === 'major') {
                versionParts[0] = newVersion;
                versionParts[1] = 0;
                versionParts[2] = 0;
            } else if (versionType === 'minor') {
                versionParts[1] = newVersion;
                versionParts[2] = 0;
            } else if (versionType === 'patch') {
                versionParts[2] = newVersion;
            }

            packageJson.version = versionParts.join('.');
            await fs.promises.writeFile(fullPath, JSON.stringify(packageJson, null, 2));

            vscode.window.showInformationMessage(`[jtAlium] Updated ${packageJson.name} to version ${packageJson.version}`);
        } catch (error) {
            vscode.window.showErrorMessage(`[jtAlium] Failed to update package version: ${error}`);
        }
    }

    private async openPackageFile(packagePath: string) {
        try {
            const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
            if (!workspaceFolder) {
                return;
            }

            const fullPath = vscode.Uri.joinPath(workspaceFolder.uri, packagePath);
            const document = await vscode.workspace.openTextDocument(fullPath);
            await vscode.window.showTextDocument(document);
        } catch (error) {
            vscode.window.showErrorMessage(`[jtAlium] Failed to open package.json file: ${error}`);
        }
    }
}