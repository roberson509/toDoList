var app = require("express")();
var mysql = require("mysql");
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'projects'
});

app.get("/", (req, res) => {
    connection.query("select * from todolist", (err, row) => {
        if (err) {
            console.log(err);
        } else {
            var text = "";
            var x;
            for (x in row) {
                text +=
                    ` <tr>
                    <td> ${row[x].task} </td>
                    <td class="del"> <a href="/del/${row[x].id}"> &times </a> </td >
                    </tr>`

            }
            res.send(`
            <!DOCTYPE html>
        <html>
        
        <head>
            <title>HTML, CSS and JavaScript demo</title>
        </head>
        
        <body>
            <!-- Start your code here  -->
            <style>
                * {
                    background-color: #F5F5F5;
                }
        
                table,
                th,
                td {
                    border: 1px solid black;
                    border-collapse: collapse;
                    border-top: none;
                    border-left: none;
                    border-right: none;
        
                }
        
                th,
                td {
                    padding: 5px;
                    text-align: left;
                }
        
                .add {
                    margin: 3% 0 0 25%;
                    width: 50%;
                    height: 8mm;
                    border-radius: 10px;
                    border: 1px solid;
                    background-color: #FFEBCD;
                }
        
                .btn {
                    height: 8mm;
                    width: 10%;
                    border: 1px solid;
                    border-radius: 10px;
                    margin: 2mm 0 0 45%;
                    background-color: #7FFFD4;
                }
        
                .del {
                    font-size: 8mm;
                    text-align: center;
                    font-weight: 900px;
                }
        
                a:hover {
                    color: #FF0000;
                    cursor: pointer;
                }
                a{
                    text-decoration: none;
                    color: black;
                  }
            </style>
            <h1 style="text-align:center; margin: 15mm 0 0 0"> To DO List </h1>
        
            <form action="/insert" method="get">
            <input name="task" placeholder="     Add a Task" type="text" class="add" /> <br />
            <input type="submit" class="btn" value="Submit" />
            </form>
            <table style="margin: 3% 0 0 25%; width:50%">
                <tr>
                    <th style="width: 70%"> Tasks </th>
                    <th></th>
                </tr>
               ${text}
            </table>
        
            <!-- End your code here  -->
        </body>
        
        </html>
            `)
        }
    })
});

app.get('/insert', (req, res) => {
    var task = req.query.task;
    connection.query("INSERT INTO todolist (task) VALUES(?)", task, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect("/")
        }
    })
});

app.get("/del/:id", (req, res) => {
    var id_ = req.params.id;
    connection.query("DELETE FROM todolist WHERE id = ?", id_, (err, rows) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect("/");
        }
    })
})
connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

app.listen(3000, (req, res) => {
    console.log("app on 3000");
})