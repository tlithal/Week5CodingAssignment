//Creates the class to hold the units that will be placed in the teams

class Unit {
    constructor(uName, uClass, uElement)
    {
        this.name = uName;
        this.class = uClass;
        this.element = uElement;
    }

    describe() {
        return `${this.name} is a ${this.class} class with the element of ${this.element}`;
    }
}

//Creates the class that will hold the teams

class Team {
    constructor(name)
    {
        this.name = name;
        this.units = [];
    }

    //Method to add units to the teams
    addUnits(unit)
    {
        if (unit instanceof Unit)
        {
            this.units.push(unit);
        }
        else
        {
            throw new Error(`${unit} is not an instance of Units`);
        }
    }

    describe()
    {
        return `${this.name} has ${this.units.length} units in their team`;
    }
}

//Creates the class for the menu object
class Menu {
    constructor()
    {
        this.teams = [];
        this.selectedTeam = null;
    }

    //Start method that gives the prompts for the user to use
    start() {
        let selection = this.showMainMenuOptions();

        while(selection != 0) {
            switch(selection) {
                case '1':
                    this.createTeam();
                    break;
                case '2':
                    this.viewTeam();
                    break;
                case '3':
                    this.deleteTeam();
                    break;
                case '4':
                    this.showTeams();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }

        //Alert to signal the end of the prompt when the user exits
        alert('Thank you for using Team Creator!');
    }

    //The menu options that the user will use to navigate the menu
    showMainMenuOptions() {
        return prompt(`
            1) Create New Team
            2) View Team
            3) Delete Team
            4) Display All Teams
            0) Exit
            `)
    }

    //The menu options once inside the "View Team" option
    showTeamMenuOptions(teamInfo) {
        return prompt(`
            1) Create Unit
            2) Delete Unit
            0) Back
            -----------------------------
            ${teamInfo}
            `);
    }

    //Method to show all the teams currently in the array
    showTeams() {
        let teamString = '';
        if (this.teams.length > 0)
        {
            for(let i = 0; i < this.teams.length; i++) {
                teamString += i + ') ' + this.teams[i].name + '\n';
            }
    
            alert(teamString);
        }
        else
        {
            alert("There are no teams currently");
        }
    }

    //Method to create a new team
    createTeam() {
        let name = prompt('Enter name for new team:');
        this.teams.push(new Team(name));
    }

    //Method to view a selected team as well as prompt the user to edit the team by adding/deleting units
    viewTeam() {
        let index = prompt("Enter the index of the team you wish to view:");
        if(index > -1 && index < this.teams.length) {
            this.selectedTeam = this.teams[index];
            let description = 'Team Name: ' + this.selectedTeam.name + '\n';

            for(let i = 0; i < this.selectedTeam.units.length; i++) {
                description += i + ') ' + this.selectedTeam.units[i].name + ' - ' 
                + this.selectedTeam.units[i].class + ' - ' + this.selectedTeam.units[i].element + '\n';
            }

            let selection = this.showTeamMenuOptions(description);
            
            switch(selection) {
                case '1':
                    this.createUnit();
                    break;
                case '2':
                    this.deleteUnit();
            }
        }
    }

    //Method to delete teams from the array
    deleteTeam() {
        let index = prompt('Enter the index of the team you wish to delete:');
        if(index > -1 && index < this.teams.length) {
            this.teams.splice(index, 1);
        }
    }

    //Method to create a unit inside a selected team
    createUnit() {
        let name = prompt('Enter name of new unit:');
        let uClass = prompt('Enter class for new unit:');
        let uElement = prompt('Enter element for new unit:')
        this.selectedTeam.units.push(new Unit(name, uClass, uElement));
    }

    //Method to delete a unit inside a selected team
    deleteUnit() {
        let index = prompt('Enter the index of the unit you wish to delete:');
        if (index > -1 && index < this.selectedTeam.units.length) {
            this.selectedTeam.units.splice(index, 1);
        }
    }
}

let menu1 = new Menu();
menu1.start();