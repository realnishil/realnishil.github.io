import React, { Component } from 'react';

const PROCS = [
    { cmd: "nvim", user: "nishil" },
    { cmd: "tmux", user: "nishil" },
    { cmd: "claude-code", user: "nishil" },
    { cmd: "coffee --watch", user: "nishil" },
    { cmd: "wezterm-gui", user: "nishil" },
    { cmd: "node next-dev", user: "nishil" },
    { cmd: "jan-server", user: "nishil" },
    { cmd: "VBoxHeadless (kali)", user: "nishil" },
    { cmd: "VBoxHeadless (nixos)", user: "nishil" },
    { cmd: "spotify", user: "nishil" },
    { cmd: "burpsuite", user: "nishil" },
    { cmd: "chrome --tabs=47", user: "nishil" },
];

function rand(min, max) {
    return Math.random() * (max - min) + min;
}

function bar(pct, width = 10) {
    const filled = Math.round((pct / 100) * width);
    return "[" + "|".repeat(filled) + " ".repeat(Math.max(0, width - filled)) + "]";
}

export class Htop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: PROCS.map((p, i) => ({
                pid: 1000 + i * 37,
                ...p,
                cpu: rand(0, 35),
                mem: rand(0.5, 12),
            })),
            cpuCores: Array.from({ length: 8 }, () => rand(5, 90)),
        };
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState((s) => ({
                rows: s.rows
                    .map((r) => ({ ...r, cpu: rand(0, 35), mem: rand(0.5, 12) }))
                    .sort((a, b) => b.cpu - a.cpu),
                cpuCores: s.cpuCores.map(() => rand(5, 90)),
            }));
        }, 1500);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        return (
            <div className="h-full w-full bg-black text-white text-xs sm:text-sm overflow-y-auto p-2" style={{ fontFamily: "'JetBrains Mono', 'DejaVu Sans Mono', monospace" }}>
                <div className="grid grid-cols-2 gap-x-4 mb-2">
                    {this.state.cpuCores.map((c, i) => (
                        <div key={i} className="flex">
                            <span className="text-ubt-blue mr-1">{i}</span>
                            <span className={c > 70 ? "text-red-500" : c > 40 ? "text-yellow-400" : "text-ubt-green"}>
                                {bar(c, 20)} {c.toFixed(0)}%
                            </span>
                        </div>
                    ))}
                </div>
                <div className="flex font-bold text-black bg-ubt-green px-1">
                    <span className="w-16">PID</span>
                    <span className="w-24">USER</span>
                    <span className="w-16 text-right">CPU%</span>
                    <span className="w-16 text-right">MEM%</span>
                    <span className="flex-1 ml-2">COMMAND</span>
                </div>
                {this.state.rows.map((r) => (
                    <div key={r.pid} className="flex hover:bg-ub-cool-grey">
                        <span className="w-16">{r.pid}</span>
                        <span className="w-24 text-ubt-blue">{r.user}</span>
                        <span className="w-16 text-right">{r.cpu.toFixed(1)}</span>
                        <span className="w-16 text-right">{r.mem.toFixed(1)}</span>
                        <span className="flex-1 ml-2 text-ubt-green">{r.cmd}</span>
                    </div>
                ))}
                <div className="mt-2 text-ubt-warm-grey">F1Help  F2Setup  F3Search  F6SortBy  F9Kill  F10Quit (purely cosmetic, this is a portfolio 😉)</div>
            </div>
        );
    }
}

export default Htop;

export const displayHtop = () => {
    return <Htop> </Htop>;
}
