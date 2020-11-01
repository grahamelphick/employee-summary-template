const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeesArray = [];


function getEmployees() {

    inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "What is your role?",
            choices: [
                "Manager",
                "Engineer",
                "Intern"
            ]
        },
        {
            type: "input",
            name: "name",
            message: "What is your name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is your id?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your email?"
        },

        {
            type: "input",
            name: "officeNumber",
            message: "What is your office number?",
            when: function (answers) {
                return answers.role === "Manager"
            }
        },
        {
            type: "input",
            name: "school",
            message: "What school do you attend?",
            when: function (answers) {
                return answers.role === "Intern"
            }
        },
        {
            type: "input",
            name: "github",
            message: "What is your github profile?",
            when: function (answers) {
                return answers.role === "Engineer"
            }
        },
        {
            type: "list",
            name: "another",
            message: "Do you want to add another employee?",
            choices: [
                "Yes",
                "No"
            ]
        }
    ]).then((answers) => {
        // const newEmployee = new Employee(answers.name, answers.id, answers.email);
        // employeesArray.push(newEmployee);

        const newManager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        employeesArray.push(newManager);

        const newEngineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
        employeesArray.push(newEngineer);

        const newIntern = new Intern(answers.name, answers.id, answers.email, answers.school);
        employeesArray.push(newIntern);


        console.log(employeesArray);
        if (answers.another === "Yes") {
            getEmployees()
        } else {
            console.log(render(employeesArray));
            fs.writeFile(outputPath, render(employeesArray), err => {
                if (err) {
                    console.log(err);
                }
                console.log("Done!")
            });
        }
    });
};

getEmployees();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee! 

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
