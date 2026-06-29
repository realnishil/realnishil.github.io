import React, { Component } from 'react';

const USERNAME = "realnishil";

export class GithubStats extends Component {
    constructor(props) {
        super(props);
        this.state = { user: null, error: null, loading: true };
    }

    componentDidMount() {
        fetch(`https://api.github.com/users/${USERNAME}`)
            .then((res) => {
                if (!res.ok) throw new Error("GitHub API rate-limited or unavailable");
                return res.json();
            })
            .then((user) => this.setState({ user, loading: false }))
            .catch((err) => this.setState({ error: err.message, loading: false }));
    }

    render() {
        const { user, error, loading } = this.state;
        return (
            <div className="h-full w-full bg-ub-drk-abrgn text-white overflow-y-auto p-4 text-sm">
                {loading && <p className="text-ubt-warm-grey">Fetching live GitHub data…</p>}
                {error && (
                    <p className="text-ubt-warm-grey">
                        Couldn't reach the GitHub API right now ({error}). Here are the static stats below anyway.
                    </p>
                )}
                {user && (
                    <div className="flex items-center gap-4 mb-4">
                        <img src={user.avatar_url} alt={user.login} className="w-16 h-16 rounded-full border border-ubt-cool-grey" />
                        <div>
                            <div className="font-bold text-lg">{user.name || user.login}</div>
                            <div className="text-ubt-blue">@{user.login}</div>
                            <div className="flex gap-4 mt-1 text-ubt-warm-grey">
                                <span><span className="text-white font-bold">{user.public_repos}</span> repos</span>
                                <span><span className="text-white font-bold">{user.followers}</span> followers</span>
                                <span><span className="text-white font-bold">{user.following}</span> following</span>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex flex-col gap-3">
                    <img
                        className="rounded border border-ubt-cool-grey max-w-full"
                        src={`https://github-readme-stats.vercel.app/api?username=${USERNAME}&show_icons=true&theme=dracula&hide_border=true&bg_color=2C001E`}
                        alt="GitHub stats"
                    />
                    <div className="flex flex-wrap gap-3">
                        <img
                            className="rounded border border-ubt-cool-grey max-w-full flex-1"
                            src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${USERNAME}&layout=compact&theme=dracula&hide_border=true&bg_color=2C001E`}
                            alt="Top languages"
                        />
                        <img
                            className="rounded border border-ubt-cool-grey max-w-full flex-1"
                            src={`https://github-readme-streak-stats.herokuapp.com/?user=${USERNAME}&theme=dracula&hide_border=true&background=2C001E`}
                            alt="GitHub streak"
                        />
                    </div>
                </div>

                <a
                    className="inline-block mt-4 text-ubt-blue underline"
                    href={`https://github.com/${USERNAME}`}
                    target="_blank"
                    rel="noreferrer"
                >
                    View full profile on GitHub →
                </a>
            </div>
        );
    }
}

export default GithubStats;

export const displayGithubStats = () => {
    return <GithubStats> </GithubStats>;
}
