//module, lib
var db = require('./db');
var template = require('./template.js');
var qs = require('querystring');
var url = require('url');
var sanitizeHtml = require('sanitize-html');

//query for author page to topic & author table
exports.home = function (request, response) {
    db.query(`SELECT * FROM topic`, function (error, topics) {
        db.query(`SELECT * FROM author`, function (error2, authors) {
            var title = 'Author';
            var list = template.list(topics);
            var html = template.html(title, list,
                `                
                ${template.authorTable(authors)}                
                <style>
                    table{
                        border-collapse: collapse;
                    }
                    td{
                        border:1px solid black;
                    }
                </style>
                <form action="/author/create_process" method="post">
                    <p>
                        <input type="text" name="name" placeholder="name">
                    </p>
                    <p>
                        <textarea name="profile" placeholder="description"></textarea>                        
                    </p>
                    <p>
                        <input type="submit" value="create">
                    </p>
                </form>
                `,
                ``
            );
            response.writeHead(200);
            response.end(html);
        });
    });
}
//query for author create process to author table
exports.create_process = function (request, response) {
    var body = '';
    request.on('data', function (data) {
        body = body + data;
    });
    request.on('end', function () {
        var post = qs.parse(body);
        db.query(`
        INSERT INTO author (name, profile) VALUES(?, ?)`,
            [post.name, post.profile],
            function (error, result) {
                if (error) {
                    throw error;
                }
                response.writeHead(302, { Location: `/author` });
                response.end();
            }
        );
    });
}
//query for author update page to topic & author table
exports.update = function (request, response) {
    db.query(`SELECT * FROM topic`, function (error, topics) {
        db.query(`SELECT * FROM author`, function (error2, authors) {
            var _url = request.url;
            var queryData = url.parse(_url, true).query;
            db.query(`SELECT * FROM author WHERE id=?`,
                [queryData.id],
                function (error3, author) {
                    var title = 'Author';
                    var list = template.list(topics);
                    var html = template.html(title, list,
                        `                
                        ${template.authorTable(authors)}                
                        <style>
                            table{
                                border-collapse: collapse;
                            }
                            td{
                                border:1px solid black;
                            }
                        </style>
                        <form action="/author/update_process" method="post">
                            <p>
                                <input type="hidden" name="id" value="${queryData.id}">
                            </p>
                            <p>
                                <input type="text" name="name" value="${sanitizeHtml(author[0].name)}">
                            </p>
                            <p>
                                <textarea name="profile">${sanitizeHtml(author[0].profile)}</textarea>                        
                            </p>
                            <p>
                                <input type="submit" value="update">
                            </p>
                        </form>
                        `,
                        ``
                    );
                    response.writeHead(200);
                    response.end(html);
                }
            );
        });
    });
}
//query for author create process to author table
exports.update_process = function (request, response) {
    var body = '';
    request.on('data', function (data) {
        body = body + data;
    });
    request.on('end', function () {
        var post = qs.parse(body);
        db.query(`
            UPDATE author SET name=?, profile=? WHERE id=?`,
            [post.name, post.profile, post.id],
            function (error, result) {
                if (error) {
                    throw error;
                }
                response.writeHead(302, { Location: `/author` });
                response.end();
            }
        )
    });
}
//query for author delete process to topic & author table
exports.delete_process = function (request, response) {
    var body = '';
    request.on('data', function (data) {
        body = body + data;
    });
    request.on('end', function () {
        var post = qs.parse(body);
        db.query(
            `DELETE FROM topic WHERE author_id=?`,
            [post.id],
            function (error1, result) {
                if (error1) {
                    throw error1;
                }
                db.query(`
                DELETE FROM author WHERE id=?`,
                    [post.id],
                    function (error2, result) {
                        if (error2) {
                            throw error2;
                        }
                        response.writeHead(302, { Location: `/author` });
                        response.end();
                    }
                );
            }
        );
    });
}