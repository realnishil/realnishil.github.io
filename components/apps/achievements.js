import React, { Component } from 'react';
import certificates from './certificates_data';

const CATEGORY_COLOR = {
    "Cloud & Security": "bg-ub-orange",
    "Coursera": "bg-ubt-blue",
    "Events & Workshops": "bg-ubt-green",
};

export class Achievements extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: "All",
            selected: null,
        };
    }

    categories() {
        const set = new Set(certificates.map((c) => c.category));
        return ["All", ...Array.from(set)];
    }

    filtered() {
        if (this.state.filter === "All") return certificates;
        return certificates.filter((c) => c.category === this.state.filter);
    }

    render() {
        if (this.state.selected) {
            const cert = this.state.selected;
            return (
                <div className="h-full w-full flex flex-col bg-ub-cool-grey">
                    <div className="flex items-center justify-between bg-ub-grey px-3 py-1.5 text-white text-sm border-b border-black border-opacity-40">
                        <button
                            onClick={() => this.setState({ selected: null })}
                            className="hover:bg-white hover:bg-opacity-10 px-2 py-1 rounded"
                        >
                            ← Back to all achievements
                        </button>
                        <span className="font-medium truncate ml-2">{cert.title}</span>
                        <a
                            href={cert.file}
                            download
                            className="hover:bg-white hover:bg-opacity-10 px-2 py-1 rounded ml-2"
                        >
                            Download
                        </a>
                    </div>
                    <iframe className="flex-grow w-full bg-white" src={cert.file} title={cert.title} frameBorder="0"></iframe>
                </div>
            );
        }

        return (
            <div className="h-full w-full flex flex-col bg-ub-cool-grey text-white select-none">
                <div className="px-4 pt-3 pb-2 border-b border-black border-opacity-40">
                    <div className="text-lg font-bold">Achievements & Certifications</div>
                    <div className="text-xs text-ubt-warm-grey mt-0.5">{certificates.length} certificates earned</div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                        {this.categories().map((cat) => (
                            <button
                                key={cat}
                                onClick={() => this.setState({ filter: cat })}
                                className={`text-xs px-2.5 py-1 rounded-full border border-white border-opacity-20 ${this.state.filter === cat ? "bg-ubb-orange" : "bg-black bg-opacity-20 hover:bg-opacity-40"}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex-grow overflow-y-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 content-start">
                    {this.filtered().map((cert, i) => (
                        <div
                            key={i}
                            onClick={() => this.setState({ selected: cert })}
                            className="cursor-pointer bg-ub-grey bg-opacity-60 hover:bg-opacity-90 rounded p-3 flex flex-col gap-1 border border-white border-opacity-10 transition"
                        >
                            <div className="flex items-start justify-between gap-2">
                                <span className="font-medium text-sm leading-snug">{cert.title}</span>
                                <span className={`flex-shrink-0 text-[10px] px-1.5 py-0.5 rounded ${CATEGORY_COLOR[cert.category] || "bg-ubt-cool-grey"}`}>
                                    {cert.category}
                                </span>
                            </div>
                            <div className="text-xs text-ubt-warm-grey">{cert.issuer}</div>
                            {cert.date && <div className="text-xs text-ubt-warm-grey opacity-70">{cert.date}</div>}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Achievements;

export const displayAchievements = () => {
    return <Achievements> </Achievements>;
}
