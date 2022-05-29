const connection = require("./db/connection");
const inquirer = require("inquirer");

const updateEmRole = () => {
  let sql = "SELECT * FROM employees";
  let employeesID = 0;
  connection.query(sql, (err, employees) => {
    if (err) throw err;
    connection.query("SELECT * FROM roles", (err, roles) => {
      inquirer
        .prompt([
          {
            name: "employee",
            type: "list",
            message: "What employee do you want to update?",
            choices() {
              const choiceArray = [];
              employees.forEach(({ id, first_name, last_name }) => {
                choiceArray.push(id + " " + first_name + " " + last_name);
              });
              return choiceArray;
            },
          },
          {
            name: "newRole",
            type: "list",
            message: "What new role do you want to assign?",
            choices() {
              const choiceArray = [];
              roles.forEach(({ id, title }) => {
                choiceArray.push(id + " " + title);
              });
              return choiceArray;
            },
          },
        ])
        .then((answer) => {
          console.log(answer);
          connection.query(
            "UPDATE employees set ? WHERE ?",
            [
              {
                role_id: answer.newRole.split(" ")[0],
              },
              {
                id: answer.employees.split(" ")[0],
              },
            ],
            (err) => {
              if (err) throw err;
              console.log("Employee updated");
              runCRM();
            }
          );
        });
    });
  });
};

const addEmployees = () => {
  inquirer
    .prompt([
      {
        name: "first",
        type: "input",
        message: "Enter the employees first name.",
      },
      {
        name: "last",
        type: "input",
        message: "Enter the employees last name.",
      },
      {
        name: "role",
        type: "input",
        message: "Enter their role ID.",
      },
      {
        name: "manager",
        type: "input",
        message: "Enter their manager ID.",
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO employees SET ?",
        {
          first_name: answer.first,
          last_name: answer.last,
          role_id: answer.role,
          manager_id: answer.manager,
        },
        (err) => {
          if (err) throw err;
          console.log("New employee added to the database.");
          runCRM();
        }
      );
    });
};

const allEmployees = () => {
  connection.query(
    "SELECT employees.id, employees.first_name, employees.last_name, employees.role_id, department.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employees LEFT JOIN roles on employees.role_id = roles.id LEFT JOIN department on roles.dept_id = department.id LEFT JOIN employees manager on manager.id = employees.manager_id;",
    (err, res) => {
      if (err) throw err;
      console.table(res);
      runCRM();
    }
  );
};

const runCRM = () => {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "Add Employee",
        "Update Emplyee Role",
        "Exit",
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case "View All Employees":
          allEmployees();
          break;
        case "Add Employee":
          addEmployees();
          break;
        case "Update Emplyee Role":
          updateEmRole();
          break;
        case "Exit":
          connection.end();
      }
    });
};

runCRM();
