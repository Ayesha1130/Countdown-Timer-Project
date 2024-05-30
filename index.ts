#! /usr/bin/env node
import inquirer from "inquirer";
import {differenceInSeconds} from 'date-fns';
import chalk from "chalk";

console.log(chalk.green("*".repeat(27)));
console.log(chalk.magenta.bold("Welcome to Countdown Timer "));
console.log(chalk.green("*".repeat(27)));


const res = await inquirer.prompt([
    {
        name: "userInput",
        type: "number",
        message: "Enter your amount of seconds",
        validate: (input)=>{
            if (isNaN(input)){
                return "Please Enter a valid number"
        }else if (input > 60){
            return " Seconds must be in 60"
        }else{
            return true;
        }
     },
}]);

let input = res.userInput;

function startTime(val: number) {
    const intTime = new Date() .setSeconds(new Date().getSeconds() + val);
    const intervalTime = new Date(intTime);
    setInterval((()=>{
        const currentTime = new Date()
        const timeDiff = differenceInSeconds(intervalTime,currentTime)
        if (timeDiff <= 0) {
            console.log(chalk.yellow.bold("Timer Has expired"));
            console.log(chalk.green("*".repeat(19)));
            process.exit()
        }
        const min = Math.floor((timeDiff%(3600*24))/3600)
        const sec = Math.floor(timeDiff%60)
        console.log(chalk.green(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`));
        
    }),1000)
    
}
startTime(input)