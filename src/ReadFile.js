import fs from 'fs';
import Student from './Student.js';

class ReadFile {
    readAttendances() {
        const DATA = fs.readFileSync('public/attendances.csv', 'utf-8');

        return DATA;
    }

    dataCleansing() {
        const DATA = this.readAttendances();
        let ROW_DATA = DATA.split("\r\n");
        ROW_DATA.shift()
        ROW_DATA.pop()

        const STUDENTS = ROW_DATA.map(line => new Student(...line.split(/,/)))
        
        return STUDENTS
    }

}

export default ReadFile;