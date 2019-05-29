import { Injectable } from '@angular/core';
import { Clipboard, SetDataType } from '../logger.interfaces';

@Injectable()
export class ClipboardFactory implements Clipboard {
    private readonly DEFAULT_DEPTH: number = 4;
    public get clipboardSetData(): SetDataType {
        const dataTransfer: DataTransfer = (window as any).clipboardData;
        return dataTransfer && dataTransfer.setData;
    }

    public get queryCommandCopy(): boolean {
        return document.queryCommandSupported && document.queryCommandSupported('copy');
    }

    public copyOnBuffer(data: any): boolean {
        const text: string = typeof data !== 'string' ? JSON.stringify(data, null, this.DEFAULT_DEPTH) : data;
        let isExec: boolean = false;

        if (this.clipboardSetData) {
            isExec = this.clipboardSetData('Text', text) as boolean;
        } else if (this.queryCommandCopy) {
            isExec = this.textAreaSelectData(text);
        }

        return isExec;
    }

    public textAreaSelectData(value: string): boolean {
        const textarea: HTMLTextAreaElement = document.createElement('textarea');
        textarea.textContent = value;
        textarea.style.position = 'fixed';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand('copy');
        } catch (ex) {
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }
}
