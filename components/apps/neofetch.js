import React, { Component } from 'react';

const LAUNCH_DATE = new Date('2026-06-26T00:00:00Z'); // portfolio v2 deploy date

const ASCII_LOGO = [
    "    ███╗   ██╗ ██████╗ ",
    "    ████╗  ██║██╔══██╗ ",
    "    ██╔██╗ ██║██████╔╝ ",
    "    ██║╚██╗██║██╔══██╗ ",
    "    ██║ ╚████║██████╔╝ ",
    "    ╚═╝  ╚═══╝╚═════╝  ",
];

function formatUptime(from) {
    const ms = Date.now() - from.getTime();
    const days = Math.floor(ms / 86400000);
    const hours = Math.floor((ms % 86400000) / 3600000);
    const mins = Math.floor((ms % 3600000) / 60000);
    return `${days}d ${hours}h ${mins}m`;
}

export class Neofetch extends Component {
    constructor(props) {
        super(props);
        this.state = { uptime: formatUptime(LAUNCH_DATE) };
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState({ uptime: formatUptime(LAUNCH_DATE) });
        }, 60000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    infoLine(label, value) {
        return (
            <div className="flex">
                <span className="text-ubt-blue font-bold w-28 flex-shrink-0">{label}</span>
                <span className="text-white">{value}</span>
            </div>
        );
    }

    render() {
        return (
            <div className="h-full w-full bg-ub-drk-abrgn text-white font-normal text-sm overflow-y-auto p-4" style={{ fontFamily: "'JetBrains Mono', 'DejaVu Sans Mono', monospace" }}>
                <div className="flex flex-wrap gap-6">
                    <pre className="text-ubt-green leading-tight text-xs sm:text-sm">
                        {ASCII_LOGO.join("\n")}
                    </pre>
                    <div className="flex flex-col gap-1 min-w-[260px]">
                        <div className="font-bold text-ubt-green">nishil@realnishil.github.io</div>
                        <div className="text-ubt-warm-grey">-------------------------</div>
                        {this.infoLine("OS:", "macOS (Apple Silicon)")}
                        {this.infoLine("Host:", "MacBook Air M3")}
                        {this.infoLine("VMs:", "NixOS, Kali Linux, Ubuntu (VirtualBox)")}
                        {this.infoLine("Kernel:", "Darwin 24.x")}
                        {this.infoLine("Uptime:", `${this.state.uptime} (since v2 deploy)`)}
                        {this.infoLine("Shell:", "zsh")}
                        {this.infoLine("Terminal:", "WezTerm / Ghostty / Kitty")}
                        {this.infoLine("Editor:", "Neovim")}
                        {this.infoLine("Local LLM:", "Jan AI")}
                        {this.infoLine("CPU:", "Apple M3")}
                        {this.infoLine("Colorscheme:", "0x96f")}
                        {this.infoLine("Focus:", "Cybersecurity / OSINT")}
                        <div className="mt-2 text-ubt-warm-grey">
                            Powered by{' '}
                            <a className="text-ubt-blue underline" href="https://github.com/realnishil/netch" target="_blank" rel="noreferrer">
                                netch
                            </a>
                            {' '}— my own neofetch-style network info tool.
                        </div>
                        <div className="flex mt-3 gap-1">
                            {["bg-ub-orange", "bg-ub-lite-abrgn", "bg-ub-med-abrgn", "bg-ub-drk-abrgn", "bg-ubt-blue", "bg-ubt-green", "bg-ubt-cool-grey", "bg-white"].map((c, i) => (
                                <div key={i} className={`${c} w-6 h-4 border border-black border-opacity-20`}></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Neofetch;

export const displayNeofetch = () => {
    return <Neofetch> </Neofetch>;
}
