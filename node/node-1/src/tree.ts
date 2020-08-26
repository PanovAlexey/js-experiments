'use strict';

import ErrnoException = NodeJS.ErrnoException;

const fs = require('fs');
const Emitter = require('events');

class FileSystemTreeResolver {
    readonly SECTION_AND_FILES_WAS_BUILT_EVENT_NAME = 'sectionAndFilesWasBuild';

    private emitter = new Emitter();
    private depthMeter: number = 0;
    private rootPath: string = '';
    private sectionAndFiles: any = {
        'files': [],
        'dirs': []
    };

    public constructor(rootPath: string) {
        this.initEventHandlers();
        this.setRootPath(rootPath);
    }

    public resolve(): void {
        this.readFileSystemStructureByPath(this.rootPath);
    }

    private setRootPath(path: string): void {
        if (this.isPathValid(path)) {
            this.rootPath = path;
        } else {
            if (!path) {
                throw 'Path incorrect.';
            }
        }
    }

    private isPathValid(path: string): boolean {
        return !!path;
    }

    private initEventHandlers(): void {
        this.emitter.on(this.SECTION_AND_FILES_WAS_BUILT_EVENT_NAME, (sectionAndFiles: Array<string>) => {
            console.log(sectionAndFiles);
        });
    }

    private readFileSystemStructureByPath(path: string): void {
        this.depthMeter++;

        fs.readdir(
            path,
            {withFileTypes: true},
            (error: ErrnoException | null, fileSystemStructure: Array<any> = []) => {
                for (let fileName in fileSystemStructure) {
                    const fullFileName = path + '/' + fileSystemStructure[fileName].name;

                    fileSystemStructure[fileName].isDirectory()
                        ? this.addSubSectionToMapAndInitStructureForIt(fullFileName)
                        : this.addFileToMap(fullFileName);
                }

                this.depthMeter--;

                if (this.depthMeter <= 0) {
                    this.emitter.emit(this.SECTION_AND_FILES_WAS_BUILT_EVENT_NAME, this.sectionAndFiles);
                }
            });
    }

    private addSubSectionToMapAndInitStructureForIt(fullSectionName: string) {
        this.sectionAndFiles['dirs'].push(fullSectionName);
        this.readFileSystemStructureByPath(fullSectionName);
    }

    private addFileToMap(fullFileName: string) {
        this.sectionAndFiles['files'].push(fullFileName);
    }
}

new FileSystemTreeResolver((process.argv[3] || '').trim()).resolve();
