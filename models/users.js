// import db from '../util/database.js';

import config  from './../config/DBconnect.js';
import mysql from 'mysql2';

export class auth {

    static dbConnect() {
        // if (config.DBcreated.database != "socialaudience") {
        //     config.DBcreated.database = "tesafollowers";
        // }

        const pool = mysql.createPool({
            host: config.DBcreated.host,
            port: config.DBcreated.port,
            user: config.DBcreated.user,
            database: config.DBcreated.database,
            password: config.DBcreated.password
        });

        return pool.promise();
    };

    constructor() {}

    static findEmail(email) {
        const db = this.dbConnect();

        return db.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
    };

    static findUsername(username) {
        const db = this.dbConnect();

        return db.execute(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );
    };

    static find(usernameEmail) {
        const db = this.dbConnect();

        return db.execute(
            'SELECT * FROM users WHERE username = ? OR email = ?',
            [usernameEmail, usernameEmail]
        );
    };

    static findByID(userID) {
        const db = this.dbConnect();

        return db.execute(
            'SELECT * FROM users WHERE userID = ?',
            [`${userID}`]
        );
    };

    static findByApiKey(apiKey) {
        const db = this.dbConnect();

        return db.execute(
            'SELECT * FROM users WHERE apiKey = ?',
            [`${apiKey}`]
        );
    };


    static save(user) {
        const db = this.dbConnect();

        return db.execute(
            'INSERT INTO users (userID, name, username, email, phoneNumber, apiKey, ipHistory, country, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [ user.userID, user.name, user.username, user.email, user.phoneNumber, user.apiKey, user.ipHistory, user.country, user.password ]
        );
    };

    static updateUser(user, condition="AND") {
        const db = this.dbConnect();

        let sqlText = this.multipleUpdate(user, "users", condition);

        return db.execute(
            sqlText,
            user.NewColombNameValue
        );
    };





    static multipleUpdate(data, tableName, condition) {
        const db = this.dbConnect();

        let sqlText = `UPDATE ${tableName} SET `

        for (let i = 0; i < data.colombName.length; i++) {
            const element = data.colombName[i];

            if (i === 0) {
                sqlText += `${element} = ?`;
            } else {
                sqlText += `, ${element} = ?`;
            }
        }

        for (let i = 0; i < data.conditionColombName.length; i++) {
            const conditionName = data.conditionColombName[i];
            const elconditionValue = data.conditionColombValue[i];

            if (i === 0) {
                sqlText += ` WHERE ${tableName}.${conditionName} = '${elconditionValue}'`;
            } else {
                sqlText += ` ${condition} ${tableName}.${conditionName} =' ${elconditionValue}'`;
            }
        }

        return sqlText;
    }
}

export class user {
    
    static dbConnect() {
        const pool = mysql.createPool({
            host: config.DBcreated.host,
            port: config.DBcreated.port,
            user: config.DBcreated.user,
            database: config.DBcreated.database,
            password: config.DBcreated.password
        });

        return pool.promise();
    };

    constructor() {}

    static orderBalDeduction(data, condition="AND") {
        const db = this.dbConnect();

        let sqlText = this.multipleUpdate(data, "users", condition);

        return db.execute(
            sqlText,
            data.NewColombNameValue
        );
    };

    static getCurrentUser(user) {
        const db = this.dbConnect();

        return db.execute(
            'SELECT * FROM users WHERE userID = ?',
            [user.userID]
        );
    };

    static getUserOrders(user) {
        const db = this.dbConnect();

        return db.execute(
            'SELECT * FROM orders WHERE userID = ?',
            [user.userID]
        );
    };

    static getOrderById(order) {
        const db = this.dbConnect();

        return db.execute(
            'SELECT * FROM orders WHERE id = ?',
            [`${order}`]
        );
    };

    static getOrderByOrderID(orderID) {
        const db = this.dbConnect();

        return db.execute(
            'SELECT * FROM orders WHERE orderID = ?',
            [`${orderID}`]
        );
    };

    static getUserTickets(user) {
        const db = this.dbConnect();

        return db.execute(
            'SELECT * FROM tickets WHERE userID = ?',
            [user.userID]
        );
    };

    static getTicket(ticket) {
        const db = this.dbConnect();

        return db.execute(
            'SELECT * FROM tickets WHERE ticketID = ?',
            [ticket.ticketID]
        );
    };

    static getUserTicketMessage(data) {
        const db = this.dbConnect();

        return db.execute(
            'SELECT * FROM ticket_messages WHERE ticketID = ?',
            [data.ticketID]
        );
    };

    static getUserPayments(user) {
        const db = this.dbConnect();

        return db.execute(
            'SELECT * FROM payment_transactions WHERE userID = ?',
            [user.userID]
        );
    };

    static addFunds(funds) {
        const db = this.dbConnect();

        return db.execute(
            'INSERT INTO payment_transactions (transactionID, userID, currency, paymentMethod, extraData, amount, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [ funds.transactionID, funds.userID, funds.currency, funds.paymentMethod, funds.extraData, funds.amount, funds.status, ]
        );
    };

    static getAdminUsers() {
        const db = this.dbConnect();

        return db.execute(
            `SELECT email FROM users WHERE role != 'user'`,
        );
    };





    static multipleUpdate(data, tableName, condition) {
        const db = this.dbConnect();

        let sqlText = `UPDATE ${tableName} SET `

        for (let i = 0; i < data.colombName.length; i++) {
            const element = data.colombName[i];

            if (i === 0) {
                sqlText += `${element} = ?`;
            } else {
                sqlText += `, ${element} = ?`;
            }
        }

        for (let i = 0; i < data.conditionColombName.length; i++) {
            const conditionName = data.conditionColombName[i];
            const elconditionValue = data.conditionColombValue[i];

            if (i === 0) {
                sqlText += ` WHERE ${tableName}.${conditionName} = '${elconditionValue}'`;
            } else {
                sqlText += ` ${condition} ${tableName}.${conditionName} =' ${elconditionValue}'`;
            }
        }

        return sqlText;
    };
}