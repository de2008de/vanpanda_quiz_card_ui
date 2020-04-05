import readXlsxFile from 'read-excel-file'

export const parseExcel = file => {
    return readXlsxFile(file);
};
