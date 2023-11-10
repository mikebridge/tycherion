import {timeAgoInWords} from "./utils";
import {metaData, summary} from "./filmData";
import React from "react";
import packageInfo from "../../package.json";


export const Footer = () => (
    <footer>
        <div className="container">
            <div>Last updated:&nbsp;
                <span className="font-weight-bold">{timeAgoInWords(metaData.date)}
                            </span>
            </div>
            <div>Movies Indexed:&nbsp;
                <span className="font-weight-bold">{summary.count}
                            </span>
            </div>
            <hr/>
            <div className="text-muted">Powered by <a href="https://github.com/mikebridge/scrapeterion"
                                                      rel="noreferrer"
                                                      target="_blank">scrapeterion {metaData.scrapeterion}</a> / <a href="https://github.com/mikebridge/tycherion"
                                                                                                                    rel="noreferrer"
                                                                                                                    target="_blank">tycherion {packageInfo.version}</a>.
            </div>
            <div className="text-muted font-italic"><sup>*</sup> This site is not affiliated with Criterion
                Channel.
            </div>
        </div>
    </footer>
);