export interface IQueryImage {
    [key: string]: string | number;
    filename: string;
    width: number;
    height: number;
}

export interface IProcessImage{
    sourceFile: string, 
    targetFile: string,
    width: number,
    height: number
}
