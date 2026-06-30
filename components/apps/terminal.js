import React, { Component } from 'react'
import $ from 'jquery';
import ReactGA from 'react-ga4';

export class Terminal extends Component {
    constructor() {
        super();
        this.cursor = "";
        this.terminal_rows = 1;
        this.current_directory = "~";
        this.curr_dir_name = "root";
        this.prev_commands = [];
        this.commands_index = -1;
        this.child_directories = {
            root: ["books", "projects", "personal-documents", "skills", "languages", "GEU", "interests"],
            GEU: ["Sem-4"],
            books: [],
            skills: ["Cybersecurity", "OSINT", "Penetration Testing", "CLI Tooling", "Neovim", "Bash"],
            projects: ["realnishil.github.io", "notafish", "netch"],
            interests: ["Security Research", "OSINT", "Ethical Penetration Testing", "Terminal Customization", "Competitive Programming"],
            languages: ["Python", "C", "Bash", "Javascript"],
        };
        this.state = {
            terminal: [],
        }
    }

    componentDidMount() {
        this.reStartTerminal();
    }

    componentDidUpdate() {
        clearInterval(this.cursor);
        this.startCursor(this.terminal_rows - 2);
    }

    componentWillUnmount() {
        clearInterval(this.cursor);
    }

    reStartTerminal = () => {
        clearInterval(this.cursor);
        $('#terminal-body').empty();
        this.appendTerminalRow();
    }

    appendTerminalRow = () => {
        let terminal = this.state.terminal;
        terminal.push(this.terminalRow(this.terminal_rows));
        this.setState({ terminal });
        this.terminal_rows += 2;
    }

    terminalRow = (id) => {
        return (
            <React.Fragment key={id}>
                <div className="flex w-full h-5">
                    <div className="flex">
                        <div className=" text-ubt-green">nishil@arch</div>
                        <div className="text-white mx-px font-medium">:</div>
                        <div className=" text-ubt-blue">{this.current_directory}</div>
                        <div className="text-white mx-px font-medium mr-1">$</div>
                    </div>
                    <div id="cmd" onClick={this.focusCursor} className=" bg-transperent relative flex-1 overflow-hidden">
                        <span id={`show-${id}`} className=" float-left whitespace-pre pb-1 opacity-100 font-normal tracking-wider"></span>
                        <div id={`cursor-${id}`} className=" float-left mt-1 w-1.5 h-3.5 bg-white"></div>
                        <input id={`terminal-input-${id}`} data-row-id={id} onKeyDown={this.checkKey} onBlur={this.unFocusCursor} className=" absolute top-0 left-0 w-full opacity-0 outline-none bg-transparent" spellCheck={false} autoFocus={true} autoComplete="off" type="text" />
                    </div>
                </div>
                <div id={`row-result-${id}`} className={"my-2 font-normal"}></div>
            </React.Fragment>
        );

    }

    focusCursor = (e) => {
        clearInterval(this.cursor);
        this.startCursor($(e.target).data("row-id"));
    }

    unFocusCursor = (e) => {
        this.stopCursor($(e.target).data("row-id"));
    }

    startCursor = (id) => {
        clearInterval(this.cursor);
        $(`input#terminal-input-${id}`).trigger("focus");
        // On input change, set current text in span
        $(`input#terminal-input-${id}`).on("input", function () {
            $(`#cmd span#show-${id}`).text($(this).val());
        });
        this.cursor = window.setInterval(function () {
            if ($(`#cursor-${id}`).css('visibility') === 'visible') {
                $(`#cursor-${id}`).css({ visibility: 'hidden' });
            } else {
                $(`#cursor-${id}`).css({ visibility: 'visible' });
            }
        }, 500);
    }

    stopCursor = (id) => {
        clearInterval(this.cursor);
        $(`#cursor-${id}`).css({ visibility: 'visible' });
    }

    removeCursor = (id) => {
        this.stopCursor(id);
        $(`#cursor-${id}`).css({ display: 'none' });
    }

    clearInput = (id) => {
        $(`input#terminal-input-${id}`).trigger("blur");
    }

    checkKey = (e) => {
        if (e.key === "Enter") {
            let terminal_row_id = $(e.target).data("row-id");
            let command = $(`input#terminal-input-${terminal_row_id}`).val().trim();
            if (command.length !== 0) {
                this.removeCursor(terminal_row_id);
                this.handleCommands(command, terminal_row_id);
            }
            else return;
            // push to history
            this.prev_commands.push(command);
            this.commands_index = this.prev_commands.length - 1;

            this.clearInput(terminal_row_id);
        }
        else if (e.key === "ArrowUp") {
            let prev_command;

            if (this.commands_index <= -1) prev_command = "";
            else prev_command = this.prev_commands[this.commands_index];

            let terminal_row_id = $(e.target).data("row-id");

            $(`input#terminal-input-${terminal_row_id}`).val(prev_command);
            $(`#show-${terminal_row_id}`).text(prev_command);

            this.commands_index--;
        }
        else if (e.key === "ArrowDown") {
            let prev_command;

            if (this.commands_index >= this.prev_commands.length) return;
            if (this.commands_index <= -1) this.commands_index = 0;

            if (this.commands_index === this.prev_commands.length) prev_command = "";
            else prev_command = this.prev_commands[this.commands_index];

            let terminal_row_id = $(e.target).data("row-id");

            $(`input#terminal-input-${terminal_row_id}`).val(prev_command);
            $(`#show-${terminal_row_id}`).text(prev_command);

            this.commands_index++;
        }
    }

    childDirectories = (parent) => {
        let files = [];
        files.push(`<div class="flex justify-start flex-wrap">`)
        this.child_directories[parent].forEach(file => {
            files.push(
                `<span class="font-bold mr-2 text-ubt-blue">'${file}'</span>`
            )
        });
        files.push(`</div>`)
        return files;
    }

    closeTerminal = () => {
        $("#close-terminal").trigger('click');
    }

    AVAILABLE_COMMANDS = "[ cd, ls, pwd, echo, clear, exit, mkdir, code, spotify, chrome, about-nishil, todoist, trash, settings, sendmsg, whoami, neofetch, htop, man, gh-stats, achievements, cat, ssh, --help ]";

    notFoundMsg = (main) => `Command '${main}' not found, or not yet implemented.<br>Available Commands: ${this.AVAILABLE_COMMANDS}`;

    handleCommands = (command, rowId) => {
        let words = command.split(' ').filter(Boolean);
        let main = words[0];
        words.shift()
        let result = "";
        let rest = words.join(" ");
        rest = rest.trim();
        switch (main) {
            case "cd":
                if (words.length === 0 || rest === "") {
                    this.current_directory = "~";
                    this.curr_dir_name = "root"
                    break;
                }
                if (words.length > 1) {
                    result = "too many arguments, arguments must be <1.";
                    break;
                }

                if (rest === "personal-documents") {
                    result = `bash /${this.curr_dir_name} : Permission denied 😏`;
                    break;
                }

                if (this.child_directories[this.curr_dir_name].includes(rest)) {
                    this.current_directory += "/" + rest;
                    this.curr_dir_name = rest;
                }
                else if (rest === "." || rest === ".." || rest === "../") {
                    result = "Type 'cd' to go back 😅";
                    break;
                }
                else {
                    result = `bash: cd: ${words}: No such file or directory`;
                }
                break;
            case "ls":
                let target = words[0];
                if (target === "" || target === undefined || target === null) target = this.curr_dir_name;

                if (words.length > 1) {
                    result = "too many arguments, arguments must be <1.";
                    break;
                }
                if (target in this.child_directories) {
                    result = this.childDirectories(target).join("");
                }
                else if (target === "personal-documents") {
                    result = "Nope! 🙃";
                    break;
                }
                else {
                    result = `ls: cannot access '${words}': No such file or directory                    `;
                }
                break;
            case "mkdir":
                if (words[0] !== undefined && words[0] !== "") {
                    this.props.addFolder(words[0]);
                    result = "";
                } else {
                    result = "mkdir: missing operand";
                }
                break;
            case "pwd":
                let str = this.current_directory;
                result = str.replace("~", "/home/nishil")
                break;
            case "code":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("vscode");
                } else {
                    result = this.notFoundMsg(main);
                }
                break;
            case "echo":
                result = this.xss(words.join(" "));
                break;
            case "spotify":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("spotify");
                } else {
                    result = this.notFoundMsg(main);
                }
                break;
            case "chrome":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("chrome");
                } else {
                    result = this.notFoundMsg(main);
                }
                break;
            case "todoist":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("todo-ist");
                } else {
                    result = this.notFoundMsg(main);
                }
                break;
            case "trash":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("trash");
                } else {
                    result = this.notFoundMsg(main);
                }
                break;
            case "about-nishil":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("about-nishil");
                } else {
                    result = this.notFoundMsg(main);
                }
                break;
            case "terminal":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("terminal");
                } else {
                    result = this.notFoundMsg(main);
                }
                break;
            case "settings":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("settings");
                } else {
                    result = this.notFoundMsg(main);
                }
                break;
            case "sendmsg":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("gedit");
                } else {
                    result = this.notFoundMsg(main);
                }
                break;
            case "clear":
                this.reStartTerminal();
                return;
            case "exit":
                this.closeTerminal();
                return;
            case "sudo":
                if (rest === "hire-me") {
                    ReactGA.event({
                        category: "Easter Egg",
                        action: "sudo hire-me",
                    });
                    result = "[sudo] password for nishil: ********<br>Permission granted. ✅<br>Initiating hiring sequence... <a class='text-ubt-blue underline' href='./files/Nishil-Bhimani-Resume.pdf' target='_blank'>opening resume</a>, drafting offer letter, clearing my calendar. 🚀<br>(in all seriousness — try the <span class='text-ubt-green'>gedit .</span> or <span class='text-ubt-green'>sendmsg</span> command to actually reach me)";
                    break;
                }

                ReactGA.event({
                    category: "Sudo Access",
                    action: "lol",
                });

                result = "<img class=' w-2/5' src='./images/memes/used-sudo-command.webp' />";
                break;
            case "whoami":
                result = "nishil — B.Tech CSE undergrad, cybersecurity & OSINT enthusiast. Permissions: guest (you), root (me).";
                break;
            case "cat":
                if (rest === "resume.pdf" || rest === "Nishil-Bhimani-Resume.pdf") {
                    result = "Opening resume... <a class='text-ubt-blue underline' href='./files/Nishil-Bhimani-Resume.pdf' target='_blank' download>./files/Nishil-Bhimani-Resume.pdf</a>";
                    window.open("./files/Nishil-Bhimani-Resume.pdf", "_blank");
                } else if (rest === "secrets.txt") {
                    result = "cat: secrets.txt: nice try 😏 — the only secret here is that I genuinely enjoy debugging build pipelines.";
                } else if (rest === "" ) {
                    result = "cat: missing file operand";
                } else {
                    result = `cat: ${rest}: No such file or directory`;
                }
                break;
            case "ssh":
                if (rest === "recruiter@nishil.dev") {
                    result = "Connecting to recruiter@nishil.dev...<br>Connection established. 🤝<br>Welcome — my inbox (and resume) are open. Try <span class='text-ubt-green'>sendmsg</span> to reach out directly.";
                } else if (rest === "") {
                    result = "usage: ssh [user@host]";
                } else {
                    result = `ssh: connect to host ${rest.split('@')[1] || rest} port 22: Connection refused`;
                }
                break;
            case "neofetch":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("neofetch");
                } else {
                    result = this.notFoundMsg(main);
                }
                break;
            case "htop":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("htop");
                } else {
                    result = this.notFoundMsg(main);
                }
                break;
            case "man":
                if (rest === "nishil" || words.length === 0) {
                    this.props.openApp("man-nishil");
                } else {
                    result = `No manual entry for ${rest}`;
                }
                break;
            case "achievements":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("achievements");
                } else {
                    result = this.notFoundMsg(main);
                }
                break;
            case "gh-stats":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("github-stats");
                } else {
                    result = this.notFoundMsg(main);
                }
                break;
            case "--help":
                result = "Available Commands:<br>" + this.AVAILABLE_COMMANDS + "<br><br>Try: <span class='text-ubt-green'>neofetch</span>, <span class='text-ubt-green'>man nishil</span>, <span class='text-ubt-green'>cat resume.pdf</span>, or poke around for easter eggs. 👀";
                break;
            default:
                result = this.notFoundMsg(main);
        }
        document.getElementById(`row-result-${rowId}`).innerHTML = result;
        this.appendTerminalRow();
    }

    xss(str) {
        if (!str) return;
        return str.split('').map(char => {
            switch (char) {
                case '&':
                    return '&amp';
                case '<':
                    return '&lt';
                case '>':
                    return '&gt';
                case '"':
                    return '&quot';
                case "'":
                    return '&#x27';
                case '/':
                    return '&#x2F';
                default:
                    return char;
            }
        }).join('');
    }

    render() {
        return (
            <div className="h-full w-full bg-ub-drk-abrgn text-white text-sm font-bold" id="terminal-body">
                {
                    this.state.terminal
                }
            </div>
        )
    }
}

export default Terminal

export const displayTerminal = (addFolder, openApp) => {
    return <Terminal addFolder={addFolder} openApp={openApp}> </Terminal>;
}
