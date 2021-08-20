const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

// parse application/json
app.use(bodyParser.json());
var corsOptions = {
	origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(express.json());
//Create Database Connection
const conn = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "new",
	//charset: 'utf8mb4'
});

// connect to database
conn.connect((err) => {
	if (err) throw err;
	console.log("MySQL connected");
});
// fgshow all countries
app.get("/api/view", (req, res) => {
	let sql = "SELECT * FROM countries";
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ response: result }));
	});
});
/*fgshow all states
app.get("/api/viewstate", (req, res) => {
	//let sql = " select states.sid as sid,states.cid as cid states.statename as statename from states join countries on states.cid = countries.cid "
 // +"where countries.cid ="+req.params.cid ;
   let sql="select *from states";
  //let sql="SELECT * FROM countries JOIN states ON countries.cid = states.cid where countries.cid =" + req.params.cid; 
  //console.log(sql.data,req.params.cid);
let query = conn.query(sql,(err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ response: result }));
	});
});*/
// fgshow all states
app.get("/api/viewstate/:cid", (req, res) => {
	//let sql = " select states.sid as sid,states.cid as cid states.statename as statename from states join countries on states.cid = countries.cid "
 // +"where countries.cid ="+req.params.cid ;
   //let sql="select *from states";
   //const cid=req.params.cid;
  let sql="SELECT * FROM countries JOIN states ON countries.cid = states.cid where countries.cid ="+req.params.cid; 
  //console.log(sql.data,req.params.cid);
let query = conn.query(sql,(err, result) => {
		if (err) throw err;
		res.send({ response: result });
	});
});
app.post("/api/create", (req, res) => {
	let data = { 
     countryname: req.body.countryname,
     capital: req.body.capital 
    };
     console.log(data);
	  let sql = "INSERT INTO countries SET ?";
	 //let sql = "INSERT INTO countries(countryname,capital)VALUES(?,?)";
	let query = conn.query(sql,data,(err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "New Record is Added successfully" }));
	
	});
});
//create state
app.post("/api/createstate", (req, res) => {
	let data = { 
     statename: req.body.statename,
     cid: req.body.cid 
    };
     console.log(data);
	  let sql = "INSERT INTO states SET ?";
	 //let sql = "INSERT INTO countries(countryname,capital)VALUES(?,?)";
	let query = conn.query(sql,data,(err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "New Record is Added successfully" }));
	
	});
});
/*
// update the state
app.put("/api/updatestate/", (req, res) => {
  let sql="UPDATE states SET statename='" + req.body.statename + "', cid='" + req.body.cid + "' WHERE sid=" + req.body.sid;
//	let sql1 = "UPDATE countries SET capital='" + req.body.capital + "' WHERE cid=" + req.body.cid;
 // let sql2 = "UPDATE countries SET countryname='" + req.body.countryname + "' WHERE cid=" + req.body.cid;
	let query = conn.query(sql, (err, result) => {
    console.log(req.body.statename);
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "Record updated SuccessFully" }));
	});
});*/
app.put("/api/updatestatesep/", (req, res) => {
  let sql="UPDATE states SET statename='" + req.body.statename + "' WHERE sid=" + req.body.sid;
//	let sql1 = "UPDATE countries SET capital='" + req.body.capital + "' WHERE cid=" + req.body.cid;
 // let sql2 = "UPDATE countries SET countryname='" + req.body.countryname + "' WHERE cid=" + req.body.cid;
	let query = conn.query(sql, (err, result) => {
    console.log(req.body.statename);
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "Record updated SuccessFully" }));
	});
});

// update the country
app.put("/api/update/", (req, res) => {
  let sql="UPDATE countries SET countryname='" + req.body.countryname + "', capital='" + req.body.capital + "' WHERE cid=" + req.body.cid;
//	let sql1 = "UPDATE countries SET capital='" + req.body.capital + "' WHERE cid=" + req.body.cid;
 // let sql2 = "UPDATE countries SET countryname='" + req.body.countryname + "' WHERE cid=" + req.body.cid;
	let query = conn.query(sql, (err, result) => {
    console.log(req.body.countryname);
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "Record updated SuccessFully" }));
	});
});

//view single state
app.get("/api/viewstate/:statename", (req, res) => {
  let sql = "SELECT * FROM states where statename=" +req.params.statename;
let query = conn.query(sql, (err, result) => {
    if (err) throw err;
    res.send(JSON.stringify({status: 200, error: null ,response: result }));
  });
});

app.get("/api/view/:cid", (req, res) => {
  let sql = "SELECT * FROM countries where cid=" +req.params.cid;
let query = conn.query(sql, (err, result) => {
    if (err) throw err;
    res.send(JSON.stringify({status: 200, error: null ,response: result }));
  });
});

// delete the country
app.delete("/api/delete/:cid", (req, res) => {
	//let sql = "DELETE FROM countries WHERE cid=" + req.params.cid + "";
  let sql="DELETE states,countries FROM states JOIN countries ON countries.cid = states.cid WHERE countries.cid ="+req.params.cid+"";
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "Record deleted successfully" }));
	});
});

// delete the state
app.delete("/api/deletestate/:sid", (req, res) => {
	let sql = "DELETE FROM states WHERE sid=" + req.params.sid + "";
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "Record deleted successfully" }));
	});
});
// creat a new Record
app.post("/api/createuser", (req, res) => {
	

	let data = {name: req.body.name, email: req.body.email,area: req.body.area,password:req.body.password };
	console.log(data);
	let sql = "INSERT INTO register SET ?";
	let query = conn.query(sql, data, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "New Record is Registr successfully" }));
	
	});
});

//Login user
app.post("/api/validlogin",(req,res)=>
{
var email=req.body.email;
    var password=req.body.password;
    conn.query('SELECT * FROM register WHERE email = ?',[email], function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            })
      }
      else{
        if(results.length >0){
            if(password==results[0].password){
                res.json({
                    status:true,
                    message:'successfully authenticated'
                })
            }
            else{
                res.json({
                  status:false,
                  message:"Email and password does not match"
                 });
            }
         
        }
        else{
          res.json({
              status:false,    
            message:"Email does not exits"
          });
        }
     
}
    })
});

/*
exports.deleteCountries = (req, res, next) => {
  const id = +req.body.id;
  let sql = "delete from country where country_id = ? ";
  db.execute(sql, [id]).then(() => {
    res.status(201).json({ status: "Country deleted successfully" });
  });
};
*/
/*
exports.getCountries = (req, res, next) => {
  let SQL =
    "select country.country_id, country_name , country_capital ,  " +
    "from country left outer join state on country.country_id = state.country_id group by country_name " +
    "order by country_id";
  db.execute(SQL).then(([rows, data]) => {
    res.status(200).json({ post: rows });
  });
};*/
/*
exports.updateCountries = (req, res, next) => {
  const id = +req.body.id;
  const name = req.body.name;
  const capital = req.body.capital;

  let SQL =
    "update country set country_name = ? , country_capital = ? where country_id = ?";
  db.execute(SQL, [name, capital, id]).then(() => {
    res.status(201).json({ status: "Country updated successfully" });
  });
};
*/
exports.getAllStates = (req, res, next) => {
  const id = +req.body.id;
  let SQL =
    "select state_id, state.country_id, country_name , state_name, state_capital from country , state where country.country_id = state.country_id and country.country_id = ?";
  db.execute(SQL, [id]).then(([rows, data]) => {
    res.status(200).json({ post: rows });
  });
};
exports.insertStates = (req, res, next) => {
  const name = req.body.name;
  const capital = req.body.capital;
  const country_id = req.body.country_id;
  let SQL =
    "insert into state(state_name, state_capital,state.country_id) values(?,?,?) ";
  db.execute(SQL, [name, capital, country_id]).then(() => {
    res.status(201).json({ status: "Created successfully" });
  });
};

exports.deleteState = (req, res, next) => {
  const id = +req.body.id;
  let sql = "DELETE FROM state where state_id=?";
  db.execute(sql, [id]).then(() => {
    res.status(201).json({ status: "Deleted successfully" });
  });
};
exports.updateState = (req, res, next) => {
  const id = +req.body.id;
  const name = req.body.name;
  const capital = req.body.capital;
  const country_id = +req.body.country_id;

  let SQL =
    "UPDATE state SET state_name=? , state_capital =? , state.country_id=? where state_id =?";
  db.execute(SQL, [name, capital, country_id, id]).then(() => {
    res.status(201).json({ status: "Updated successfully" });
  });
};
/*
exports.login = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  let SQL =
    "select count(*) as count  from user where user_name = ? and password = ?";
  db.execute(SQL, [username, password]).then(([rows, data]) => {
    console.log(rows[0].count);
    if (rows[0].count == 1) {
      res.status(200).json({ status: true });
    } else {
      res.status(200).json({ status: false });
    }
  });
};*/

app.listen(8080, () => {
	console.log("server started on port 8080...");
});