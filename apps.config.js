import dynamic from 'next/dynamic';
import { displayTerminal } from './components/apps/terminal';
import { displayTerminalCalc } from './components/apps/calc';

// Lightweight loading placeholder shown briefly while a lazy-loaded app's
// bundle is fetched. Keeps the terminal aesthetic instead of a generic spinner.
const AppLoading = () => (
    <div className="h-full w-full bg-ub-drk-abrgn text-ubt-green flex items-center justify-center font-bold">
        loading...
    </div>
);

// Code-split every "heavy" app into its own chunk so opening one app
// doesn't pull the JS for every other app into the initial bundle.
const Spotify = dynamic(() => import('./components/apps/spotify'), { ssr: false, loading: AppLoading });
const VsCode = dynamic(() => import('./components/apps/vscode'), { ssr: false, loading: AppLoading });
const Settings = dynamic(() => import('./components/apps/settings'), { ssr: false, loading: AppLoading });
const Chrome = dynamic(() => import('./components/apps/chrome'), { ssr: false, loading: AppLoading });
const Trash = dynamic(() => import('./components/apps/trash'), { ssr: false, loading: AppLoading });
const Gedit = dynamic(() => import('./components/apps/gedit'), { ssr: false, loading: AppLoading });
const AboutNishil = dynamic(() => import('./components/apps/nishil'), { ssr: false, loading: AppLoading });
const Neofetch = dynamic(() => import('./components/apps/neofetch'), { ssr: false, loading: AppLoading });
const Htop = dynamic(() => import('./components/apps/htop'), { ssr: false, loading: AppLoading });
const ManPage = dynamic(() => import('./components/apps/manpage'), { ssr: false, loading: AppLoading });
const GithubStats = dynamic(() => import('./components/apps/githubstats'), { ssr: false, loading: AppLoading });
const Achievements = dynamic(() => import('./components/apps/achievements'), { ssr: false, loading: AppLoading });

const apps = [
    {
        id: "chrome",
        title: "Google Chrome",
        icon: './themes/Yaru/apps/chrome.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: true,
        screen: () => <Chrome> </Chrome>,
    },
    {
        id: "calc",
        title: "Calc",
        icon: './themes/Yaru/apps/calc.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: false,
        screen: displayTerminalCalc,
    },
    {
        id: "about-nishil",
        title: "About Nishil",
        icon: './themes/Yaru/system/user-home.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: true,
        screen: () => <AboutNishil> </AboutNishil>,
    },
    {
        id: "vscode",
        title: "Visual Studio Code",
        icon: './themes/Yaru/apps/vscode.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: false,
        screen: () => <VsCode> </VsCode>,
    },
    {
        id: "terminal",
        title: "Terminal",
        icon: './themes/Yaru/apps/bash.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: false,
        screen: displayTerminal,
    },
    {
        id: "spotify",
        title: "Spotify",
        icon: './themes/Yaru/apps/spotify.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: false,
        screen: () => <Spotify> </Spotify>, // India Top 50 Playlist 😅
    },
    {
        id: "settings",
        title: "Settings",
        icon: './themes/Yaru/apps/gnome-control-center.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: false,
        screen: () => <Settings> </Settings>,
    },
    {
        id: "trash",
        title: "Trash",
        icon: './themes/Yaru/system/user-trash-full.png',
        disabled: false,
        favourite: false,
        desktop_shortcut: true,
        screen: () => <Trash> </Trash>,
    },
    {
        id: "gedit",
        title: "Contact Me",
        icon: './themes/Yaru/apps/gedit.png',
        disabled: false,
        favourite: false,
        desktop_shortcut: true,
        screen: () => <Gedit> </Gedit>,
    },
    {
        id: "neofetch",
        title: "neofetch",
        icon: './themes/Yaru/apps/neofetch.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: false,
        screen: () => <Neofetch> </Neofetch>,
    },
    {
        id: "htop",
        title: "htop",
        icon: './themes/Yaru/apps/htop.png',
        disabled: false,
        favourite: false,
        desktop_shortcut: false,
        screen: () => <Htop> </Htop>,
    },
    {
        id: "man-nishil",
        title: "man nishil",
        icon: './themes/Yaru/apps/man.png',
        disabled: false,
        favourite: false,
        desktop_shortcut: false,
        screen: () => <ManPage> </ManPage>,
    },
    {
        id: "github-stats",
        title: "GitHub Stats",
        icon: './themes/Yaru/apps/github-stats.png',
        disabled: false,
        favourite: false,
        desktop_shortcut: true,
        screen: () => <GithubStats> </GithubStats>,
    },
    {
        id: "achievements",
        title: "Achievements",
        icon: './themes/Yaru/apps/achievements.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: true,
        screen: () => <Achievements> </Achievements>,
    },
    {
        id: "github",
        title: "GitHub",
        icon: './themes/Yaru/apps/github.png',
        disabled: false,
        favourite: false,
        desktop_shortcut: true,
        isExternalApp: true,
        url: "https://github.com/realnishil",
        screen: () => {},
    },
]

export default apps;
