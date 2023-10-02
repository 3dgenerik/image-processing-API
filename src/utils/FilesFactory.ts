import path from 'path'

export class FileFactory{
    private static fullImagesDirPath = path.join(__dirname, '../../public/images/full')
    private static thumbImagesDirPath = path.join(__dirname, '../../public/images/thumb')

    public static getFullImageDirsPath(): string{
        return FileFactory.fullImagesDirPath
    }

    public static getThumbImageDirsPath(): string{
        return FileFactory.thumbImagesDirPath
    }
}