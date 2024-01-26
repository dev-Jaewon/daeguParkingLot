import { MdLocalParking } from "react-icons/md";

import styles from '../../styles/Marker.module.scss';
import { renderToString } from "react-dom/server";

export const Marker = (content: string): string => {
    return `
        <div class=${styles.container}>
            <div class=${styles.circle}>
                ${renderToString(<MdLocalParking color="#7c7ce4" />)}
            </div>
            <p>${content}</p>
            <div class=${styles.after_arrow}></div>
            <div class=${styles.before_arrow}></div>
        </div>`;
}

export const FocusMarker = (content: string): string => {
    return `
        <div class=${styles.container_focus}>
            <div class=${styles.circle_focus}>
                ${renderToString(<MdLocalParking color="#7c7ce4" />)}
            </div>
            <p>${content}</p>
            <div class=${styles.after_arrow}></div>
            <div class=${styles.before_arrow_focus}></div>
        </div>`;
}