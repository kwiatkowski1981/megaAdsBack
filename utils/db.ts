import {createPool} from "mysql2/promise";

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    database: 'mega_adds',
    password: 'MariaDB1981@',
    decimalNumbers: true,
    namedPlaceholders: true,
});