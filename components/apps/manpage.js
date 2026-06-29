import React, { Component } from 'react';

export class ManPage extends Component {
    render() {
        return (
            <div className="h-full w-full bg-black text-white text-sm overflow-y-auto px-4 py-2" style={{ fontFamily: "'JetBrains Mono', 'DejaVu Sans Mono', monospace" }}>
                <div className="flex justify-between text-ubt-warm-grey border-b border-ubt-cool-grey pb-1 mb-3">
                    <span>NISHIL(1)</span>
                    <span>User Commands</span>
                    <span>NISHIL(1)</span>
                </div>

                <p className="font-bold text-ubt-green mt-3">NAME</p>
                <p className="ml-4">nishil — cybersecurity engineering student, OSINT &amp; CLI tooling enthusiast</p>

                <p className="font-bold text-ubt-green mt-3">SYNOPSIS</p>
                <p className="ml-4"><span className="text-ubt-blue">nishil</span> [--terminal] [--neovim] [--osint] [--coffee]</p>

                <p className="font-bold text-ubt-green mt-3">DESCRIPTION</p>
                <p className="ml-4">
                    B.Tech Computer Science Engineering undergraduate (2024–2028) at Graphic Era Deemed
                    to be University, focused on cybersecurity, OSINT, and security research. Daily driver
                    is macOS on a MacBook Air M3, with NixOS, Kali Linux, and Ubuntu running in VirtualBox
                    for security tooling work. Lives in the terminal — Neovim, WezTerm/Ghostty/Kitty, and
                    a terminal-first workflow for pretty much everything.
                </p>

                <p className="font-bold text-ubt-green mt-3">OPTIONS</p>
                <div className="ml-4">
                    <p><span className="text-ubt-blue">--skills</span>         Python, C, Bash, JavaScript, Penetration Testing, OSINT</p>
                    <p><span className="text-ubt-blue">--projects</span>       NotAFish (phishing URL heuristics), netch (neofetch-style net info)</p>
                    <p><span className="text-ubt-blue">--interests</span>      Mechanical keyboards, local AI tooling (Jan AI), competitive programming</p>
                </div>

                <p className="font-bold text-ubt-green mt-3">EXAMPLES</p>
                <div className="ml-4">
                    <p><span className="text-ubt-blue">$ ssh</span> recruiter@nishil.dev    <span className="text-ubt-warm-grey"># try it in the terminal app 👀</span></p>
                    <p><span className="text-ubt-blue">$ sudo</span> hire-me                <span className="text-ubt-warm-grey"># also try this one</span></p>
                </div>

                <p className="font-bold text-ubt-green mt-3">SEE ALSO</p>
                <p className="ml-4">
                    <a className="text-ubt-blue underline" href="https://github.com/realnishil" target="_blank" rel="noreferrer">github.com/realnishil</a>{', '}
                    <a className="text-ubt-blue underline" href="https://www.linkedin.com/in/nishilbhimani" target="_blank" rel="noreferrer">linkedin.com/in/nishilbhimani</a>{', '}
                    <a className="text-ubt-blue underline" href="https://x.com/notnishil" target="_blank" rel="noreferrer">x.com/notnishil</a>
                </p>

                <p className="font-bold text-ubt-green mt-3">AUTHOR</p>
                <p className="ml-4">Written by Nishil Bhimani, obviously.</p>

                <div className="text-ubt-warm-grey mt-4 border-t border-ubt-cool-grey pt-1">Manual page nishil(1) line 1/1 (END)</div>
            </div>
        );
    }
}

export default ManPage;

export const displayManPage = () => {
    return <ManPage> </ManPage>;
}
